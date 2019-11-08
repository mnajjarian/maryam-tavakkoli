import React, { useState } from "react";
import { EditorState, DraftBlockType, RichUtils } from "draft-js";
import classNames from 'classnames';
import Button from '../Button';
import StyleTypes from "./StyleTypes";

interface ToolbarProps {
  editorState: EditorState;
  onAddImage: any;
  handleChange: (editorState: EditorState) => void;
  handleSave: (type: string) => any;
}
const Toolbar = (props: ToolbarProps) => {
    const[toggle, setToggle] = useState(false);
  const { editorState, onAddImage, handleChange, handleSave } = props;

  const handleToggle = () => setToggle(!toggle);

  const toggleBlockType = (blockType: DraftBlockType) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (style: DraftBlockType) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className="toolbar">
    <div className="RichEditor-controls">
      <StyleTypes
        editorState={editorState}
        onAddImage={onAddImage}
        onToggleBlock={toggleBlockType}
        onToggleInline={toggleInlineStyle}
      />
    </div>
    <div className="toolbar__toggle" onClick={handleToggle} >
        <img src={require('../../assets/icons/save.svg')} alt="menu"/>
    </div>
    <div className={classNames({
        toolbar__buttons: true,
        "toolbar__buttons-hide": !toggle
    })}>
    <Button text="Save" handleClick={handleSave('draft')} />
    <Button text="Publish" handleClick={handleSave('publish')} />
    </div>
    </div>
  );
};

export default Toolbar;
