import React, { Fragment } from "react";
import StyleButton from "./StyleButton";
import { EditorState, DraftInlineStyleType, DraftBlockType } from "draft-js";

export interface InlineStyle {
  label: string;
  style: DraftInlineStyleType;
}
export type InlineStyles = InlineStyle[];

const INLINE_STYLES: InlineStyles = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

interface InlineStyleProps {
  editorState: EditorState;
  onToggle: (style: DraftBlockType) => void;
}

const InineStyle = (props: InlineStyleProps) => {
    const { editorState, onToggle } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <Fragment>
      {INLINE_STYLES.map(type => (
        <StyleButton
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          key={type.label}
        />
      ))}
    </Fragment>
  );
};

export default InineStyle;
