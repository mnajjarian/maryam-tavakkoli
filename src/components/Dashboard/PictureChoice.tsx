import React from 'react'

interface PicProps {
    imgUrl: string;
    publicId: string;
    handleClick: (publicId: string) => any;
  }
  
  export const Picture = (props: PicProps) => {
    const { imgUrl, publicId, handleClick } = props;

    return(
      <div
      key={publicId}
      onClick={handleClick(publicId)}
      >
         <img
            className='picture'
            src={imgUrl}
            alt="pic"
          />
      </div>
         
    )
  }

  export default Picture;