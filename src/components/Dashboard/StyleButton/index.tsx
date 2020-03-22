import React, { MouseEvent } from 'react'
import classNames from 'classnames'
import { DraftBlockType, DraftInlineStyleType } from 'draft-js'

export interface StyleButtonProps {
  active: boolean
  style: DraftBlockType | DraftInlineStyleType
  onToggle: (style: DraftBlockType | DraftInlineStyleType) => void
  label: string
}

function StyleButton(props: StyleButtonProps): JSX.Element {
  const { active, style, onToggle, label } = props
  const handleToggle = (e: MouseEvent): void => {
    e.preventDefault()
    onToggle(style)
  }

  return (
    <span
      className={classNames('RichEditor-styleButton', {
        [`RichEditor-styleButton-${label}`]: true,
        'RichEditor-activeButton': active,
      })}
      onMouseDown={handleToggle}
    >
      <img className="RichEditor-styleButton-icon" src={require(`../../../assets/icons/${label}.svg`)} alt="icon" />
    </span>
  )
}

export default StyleButton
