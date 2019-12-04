import React from 'react'

interface PicProps {
    checked: boolean
    imgUrl: string;
    publicId: string;
    handleClick: (publicId: string) => any;
  }
  
  export const Picture = (props: PicProps) => {
    const { imgUrl, publicId, handleClick, checked } = props;
    return(
      <div
      className="picture"
      key={publicId}
      onClick={handleClick(publicId)}
      >
         <img
            className='picture__image'
            src={imgUrl}
            alt="pic"
          />
           <input type="checkbox" checked={checked} className="picture__checked" />
      </div>
         
    )
  }

  export default Picture;