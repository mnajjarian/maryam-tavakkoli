import React, { Fragment } from 'react';
import { EditorState, DraftBlockType, ContentBlock } from "draft-js";
import HeaderStyleDropdown from "./headerStyleDropdown";
import StyleButton from "./StyleButton";

export interface BlockType {
    label: string;
    style: DraftBlockType;
  }
  
  export type BlockTypes = BlockType[];
  
  const BLOCK_TYPES: BlockTypes = [
      { label: "Blockquote", style: "blockquote" },
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
      { label: "CodeBlock", style: "code-block" }
  ];

  const BLOCK_TYPES_HEADING: BlockTypes = [
    { label: "H1", style: "header-one" },
      { label: "H2", style: "header-two" },
      { label: "H3", style: "header-three" },
      { label: "H4", style: "header-four" },
      { label: "H5", style: "header-five" },
      { label: "H6", style: "header-six" },
  ]
  


  export const getBlockStyle = (block: ContentBlock): string => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

  interface BlockStyleProps {
    editorState: EditorState;
    onToggle: (style: DraftBlockType) => void;
  }
  const BlockStyle = (props: BlockStyleProps) => {
    const { editorState, onToggle } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

    return(
        <Fragment>
          <HeaderStyleDropdown
            headerOptions={BLOCK_TYPES_HEADING}
            active={blockType}
            onToggle={onToggle}
          />
          {BLOCK_TYPES.map(type => 
            <StyleButton
              active={type.style === blockType}
              label={type.label}
              onToggle={onToggle}
              style={type.style}
              key={type.label}
              //type={type}
            />
            )}
      </Fragment>
    )
  };

  export default BlockStyle;