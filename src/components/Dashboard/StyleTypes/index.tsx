import React, { Fragment } from 'react'
import { EditorState, DraftBlockType, DraftInlineStyleType } from 'draft-js'
import HeaderStyleDropdown from '../HeaderStyleDropdown'
import StyleButton from '../StyleButton'

export interface BlockType {
  label: string
  style: DraftBlockType
  type: string
}

export type BlockTypes = BlockType[]

const BLOCK_TYPES: BlockTypes = [
  { label: 'Bold', style: 'BOLD', type: 'INLINE_TYPE' },
  { label: 'Italic', style: 'ITALIC', type: 'INLINE_TYPE' },
  { label: 'Underline', style: 'UNDERLINE', type: 'INLINE_TYPE' },
  { label: 'UL', style: 'unordered-list-item', type: 'BLOCK_TYPE' },
  { label: 'OL', style: 'ordered-list-item', type: 'BLOCK_TYPE' },
  { label: 'Blockquote', style: 'blockquote', type: 'BLOCK_TYPE' },
  { label: 'CodeBlock', style: 'code-block', type: 'BLOCK_TYPE' },
  { label: 'Monospace', style: 'CODE', type: 'INLINE_TYPE' },
  { label: 'Strike', style: 'STRIKETHROUGH', type: 'INLINE_TYPE' },
  { label: 'Image', style: 'image', type: 'IMAGE' },
]

const BLOCK_TYPES_HEADING: BlockTypes = [
  { label: 'Heading 1', style: 'header-one', type: 'BLOCK_TYPE' },
  { label: 'Heading 2', style: 'header-two', type: 'BLOCK_TYPE' },
  { label: 'Heading 3', style: 'header-three', type: 'BLOCK_TYPE' },
  { label: 'Heading 4', style: 'header-four', type: 'BLOCK_TYPE' },
  { label: 'Heading 5', style: 'header-five', type: 'BLOCK_TYPE' },
  { label: 'Heading 6', style: 'header-six', type: 'BLOCK_TYPE' },
]

interface StyleTypesProps {
  editorState: EditorState
  onToggleBlock: (style: DraftBlockType) => void
  onToggleInline: (style: DraftBlockType | DraftInlineStyleType) => void
}
const StyleTypes = (props: StyleTypesProps) => {
  const { editorState, onToggleBlock, onToggleInline } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <>
      <HeaderStyleDropdown headerOptions={BLOCK_TYPES_HEADING} active={blockType} onToggle={onToggleBlock} />
      {BLOCK_TYPES.map(type => (
        <StyleButton
          active={type.type === 'BLOCK_TYPE' ? type.style === blockType : currentStyle.has(type.style)}
          label={type.label}
          onToggle={type.type === 'BLOCK_TYPE' ? onToggleBlock : onToggleInline}
          style={type.style}
          key={type.label}
        />
      ))}
    </>
  )
}

export default StyleTypes
