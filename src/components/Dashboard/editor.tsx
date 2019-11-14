import React, {
  useState,
  KeyboardEvent,
  createRef,
  useContext,
} from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  DraftEditorCommand,
  convertToRaw,
  AtomicBlockUtils
} from "draft-js";
import { getBlockStyle } from "./getBlockStyle";
import Toolbar from "./Toolbar";
import { DataContext } from "../../contexts/dataContext";
import { mediaBlockRenderer } from "./MediaBlockRenderer";

const RichEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const content = editorState.getCurrentContent();

  const [editorContent, setEditorContent] = useState<string>(
    JSON.stringify(convertToRaw(content))
  );

  const { dataService } = useContext(DataContext);

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
    dataService.createNewPost(editorContent);
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

/*   const openGallery = () => {
    console.log('clicked')
    setIsOpen(!isOpen);
  } */
  const onAddImage = (publicId: string) => {
    const urlValue = `https://res.cloudinary.com/dfjemz4f7/image/upload/${publicId}.jpg`;
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
