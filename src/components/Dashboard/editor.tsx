import React, {
  useState,
  KeyboardEvent,
  createRef
} from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  DraftEditorCommand
} from "draft-js";
import { getBlockStyle } from './getBlockStyle';
import Toolbar from './Toolbar';

const RichEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  console.log(editorState.getCurrentContent())
let editor = createRef<Editor>();

const focusEditor = () => {
  if(editor.current) {
    editor.current.focus()
  }
}
  const handleChange = (editorState: EditorState) => 
    setEditorState(editorState);
  

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
      const newEditorState = RichUtils.onTab(
          e, 
          editorState, 
          4,
        );
      if (newEditorState !== editorState) {
        handleChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
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
    <div className="RichEditor" >
        <Toolbar
           editorState={editorState}
           handleChange={handleChange}
        />
      <div className={className} onClick={focusEditor} >
        <Editor
          ref={editor}
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={handleChange}
          placeholder="Tell a story..."
        />
      </div>
    </div>
  );
};

export default RichEditor;
