import React from "react";
import { EditorState, DraftBlockType, RichUtils } from "draft-js";
import BlockStyle from './blockStyle';
import InineStyle from "./inlineStyle";

interface ToolbarProps {
  editorState: EditorState;
  handleChange: (editorState: EditorState) => void;
}
const Toolbar = (props: ToolbarProps) => {
  const { editorState, handleChange } = props;

  const toggleBlockType = (blockType: DraftBlockType) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (style: DraftBlockType) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className="RichEditor-controls">
      <BlockStyle editorState={editorState} onToggle={toggleBlockType} />
      <InineStyle editorState={editorState} onToggle={toggleInlineStyle} />
    </div>
  );
};

export default Toolbar;
