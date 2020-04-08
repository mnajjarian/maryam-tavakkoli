import React from 'react'

type Props = {
  checked: boolean
  imgUrl: string
  publicId: string
  handleClick: (publicId: string) => () => void
}

export function Picture(props: Props): JSX.Element {
  const { imgUrl, publicId, handleClick, checked } = props
  return (
    <div className="picture" key={publicId} onClick={handleClick(publicId)}>
      <img className="picture__image" src={imgUrl} alt="pic" />
      <input type="checkbox" readOnly checked={checked} className="picture__checked" />
    </div>
  )
}

export default Picture
