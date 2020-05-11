import React from 'react'

type ButtonProps = {
  text: string
  handleClick?: () => void
}
export function Button({ text, handleClick }: ButtonProps): JSX.Element {
  return (
    <button type="submit" className="button" onClick={handleClick}>
      {text}
    </button>
  )
}
