import React, {
  useState,
  KeyboardEvent
} from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  DraftEditorCommand
} from "draft-js";
import { getBlockStyle } from './blockStyle';
import Toolbar from './Toolbar';

const RichEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

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
      <div className={className} >
        <Editor
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
/* 
export interface BlockType {
  label: string;
  style: DraftBlockType;
}

export type BlockTypes = BlockType[];

const BLOCK_TYPES: BlockTypes = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Code Block", style: "code-block" }
];

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


export interface StyleControlsProps {
    editorState: EditorState;
    onToggle: (style: DraftBlockType) => void;
}

const InlineStyleControls: SFC<StyleControlsProps> = ({
  editorState,
  onToggle
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const BlockStyleControls: SFC<StyleControlsProps> = ({
  editorState,
  onToggle
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};*/

/* const getBlockStyle = (block: ContentBlock): string => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return "";
  }
}; 

export interface StyleButtonProps {
    active: boolean;
    style: DraftBlockType | DraftInlineStyleType;
    onToggle: (style: DraftBlockType | DraftInlineStyleType) => void;
    label: string;
}

const StyleButton = (props: StyleButtonProps) => {
  const { active, style, onToggle, label } = props;
  const handleToggle = (e: MouseEvent) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <span
      className={classNames("RichEditor-styleButton", {
        "RichEditor-activeButton": active
      })}
      onMouseDown={handleToggle}
    >
      {label}
    </span>
  );
};

const RichEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const editor = createRef<Editor>();
  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };

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

  const toggleBlockType = (blockType: DraftBlockType) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineSryle: string) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, inlineSryle));
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
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className={className} onClick={focusEditor}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          ref={editor}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={handleChange}
          spellCheck={true}
          placeholder="Tell a story..."
        />
      </div>
    </div>
  );
};*/


export default RichEditor;
