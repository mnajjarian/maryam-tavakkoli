/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react'
import { EditorState, DraftBlockType, RichUtils } from 'draft-js'
import classNames from 'classnames'
import { Button } from '../../Button/Button'
import { StyleTypes } from '../StyleTypes/StyleTypes'
import { Modal } from '../../Modal/Modal'
import { Gallery } from '../Gallery/Gallery'
import SaveIcon from '../../../assets/icons/save.svg'

interface ToolbarProps {
  variant: string
  onAddImage: (publicId: string) => void
  editorState: EditorState
  handleChange: (editorState: EditorState) => void
  handleSave: (type: string) => () => void
}
export function Toolbar(props: ToolbarProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [toggle, setToggle] = useState(false)
  const { editorState, handleChange, onAddImage, handleSave, variant } = props

  const toggleModal = (): void => setIsOpen(!isOpen)
  const handleCb = (publicId: string): void => {
    onAddImage(publicId)
    setIsOpen(false)
  }
  const handleToggle = (): void => setToggle(!toggle)
  const toggleBlockType = (blockType: DraftBlockType): void => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  const toggleInlineStyle = (style: DraftBlockType): void => {
    if (style === 'image') {
      setIsOpen(!isOpen)
    }
    handleChange(RichUtils.toggleInlineStyle(editorState, style))
  }

  return (
    <div className="toolbar">
      <div className="RichEditor-controls">
        <StyleTypes editorState={editorState} onToggleBlock={toggleBlockType} onToggleInline={toggleInlineStyle} />
      </div>
      <div className="toolbar__toggle" onClick={handleToggle}>
        <img src={SaveIcon} alt="menu" />
      </div>
      <div
        className={classNames({
          toolbar__buttons: true,
          'toolbar__buttons-hide': !toggle,
        })}
      >
        <Button text={variant} handleClick={handleSave(variant)} />
      </div>

      {isOpen && (
        <Modal toggleModal={toggleModal}>
          <Gallery withCb={true} cb={handleCb} />
        </Modal>
      )}
    </div>
  )
}
