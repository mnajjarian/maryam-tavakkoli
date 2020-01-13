import React, { useState, KeyboardEvent, createRef, useContext } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  DraftEditorCommand,
  convertToRaw,
  AtomicBlockUtils,
  convertFromRaw
} from "draft-js";
import { getBlockStyle } from "./getBlockStyle";
import Toolbar from "./Toolbar";
import { DataContext } from "../../contexts/dataContext";
import { mediaBlockRenderer } from "./MediaBlockRenderer";
import { AuthContext } from "../../contexts/authContext";

interface EditorProps {
  blogId?: any;
}
const RichEditor = (props: EditorProps) => {
  const { data, dataService } = useContext(DataContext);
  const blogPost = props.blogId
    ? data.blogs.filter((b: any) => b.id === props.blogId.id)[0]
    : null;
  const blogState: EditorState = blogPost
    ? EditorState.createWithContent(
        convertFromRaw(JSON.parse(blogPost.content))
      )
    : EditorState.createEmpty();

  const [editorState, setEditorState] = useState<EditorState>(blogState);
  const content = editorState.getCurrentContent();

  const [editorContent, setEditorContent] = useState<string>(
    JSON.stringify(convertToRaw(content))
  );

  const { authState } = useContext(AuthContext);

  let editor = createRef<Editor>();
  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };
  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setEditorContent(JSON.stringify(convertToRaw(content)));
  };

  const handleSave = (type: string) => () => {
    if(type === 'Publish') {
      dataService.createNewPost({
        content: editorContent,
        author: authState.user
      });
    } else {
      dataService.updatePost(props.blogId.id, editorContent);
    }
  };

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return "handled";
    } else {
      return "not-handled";
    }
  };
  const mapKeyToEditorCommand = (e: KeyboardEvent) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if (newEditorState !== editorState) {
        handleChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const onAddImage = (publicId: string) => {
    const urlValue = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/${publicId}.jpg`;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntitiy = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntitiy.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntitiy
    });
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
    setTimeout(() => focusEditor(), 0);
  };

  let contentState = editorState.getCurrentContent();
  let className = "RichEditor-editor";
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== "unstyled"
    ) {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="editor">
      <div className="RichEditor">
        <Toolbar
          variant={props.blogId ? 'Save' : 'Publish'}
          onAddImage={onAddImage}
          editorState={editorState}
          handleChange={handleChange}
          handleSave={handleSave}
        />
        <div className={className} onClick={focusEditor}>
          <Editor
            ref={editor}
            blockStyleFn={getBlockStyle}
            blockRendererFn={mediaBlockRenderer}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={handleChange}
            placeholder="Tell a story..."
          />
        </div>
      </div>
    </div>
  );
};

export default RichEditor;
