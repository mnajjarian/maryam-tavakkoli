import React from "react";
import { EditorState, DraftBlockType, RichUtils } from "draft-js";
import StyleTypes from "./StyleTypes";

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
      <StyleTypes
        editorState={editorState}
        onToggleBlock={toggleBlockType}
        onToggleInline={toggleInlineStyle}
      />
    </div>
  );
};

export default Toolbar;
