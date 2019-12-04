import React, { useState, useRef } from "react";
import { EditorState, DraftBlockType, RichUtils } from "draft-js";
import classNames from "classnames";
import { useOnClickOutside } from "../../custom-hooks/useOnClickOutside";
import Button from "../Button";
import StyleTypes from "./StyleTypes";
import Modal from "../Modal";
import Gallery from "./Gallery";

interface ToolbarProps {
  variant: string;
  onAddImage: (publicId: string) => void;
  editorState: EditorState;
  handleChange: (editorState: EditorState) => void;
  handleSave: (type: string) => any;
}
const Toolbar = (props: ToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { editorState, handleChange, onAddImage, handleSave, variant } = props;

  const handleCb = (publicId: string) => {
    onAddImage(publicId);
    setIsOpen(false);
  };
  const handleToggle = () => setToggle(!toggle);
  const toggleBlockType = (blockType: DraftBlockType) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (style: DraftBlockType) => {
    if (style === "image") {
      setIsOpen(!isOpen);
    }
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <div ref={ref} className="toolbar">
      <div className="RichEditor-controls">
        <StyleTypes
          editorState={editorState}
          onToggleBlock={toggleBlockType}
          onToggleInline={toggleInlineStyle}
        />
      </div>
      <div className="toolbar__toggle" onClick={handleToggle}>
        <img src={require("../../assets/icons/save.svg")} alt="menu" />
      </div>
      <div
        className={classNames({
          toolbar__buttons: true,
          "toolbar__buttons-hide": !toggle
        })}
      >
        <Button text={variant} handleClick={handleSave(variant)} />
      </div>
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <Gallery withCb={true} cb={handleCb} />
      </Modal>
    </div>
  );
};

export default Toolbar;
