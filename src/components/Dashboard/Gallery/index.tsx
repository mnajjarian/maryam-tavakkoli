import React, { useContext, useState } from 'react'
import Button from '../../Button'
import Picture from '../PctureChoice'
import { DataContext } from '../../../contexts/dataContext'
import { GalleryInterface } from '../../../reducers/dataReducer'

interface Props {
  withCb: boolean
  cb: (publicId: string) => void
}

function Gallery(props: Props): JSX.Element {
  const {
    data: { gallery },
    dataDispatch,
    dataService,
  } = useContext(DataContext)

  const images = gallery.reduce((acc: any, curr: GalleryInterface) => {
    acc[curr.public_id] = false
    return acc
  }, [])

  const [checkState, setCheckState] = useState(images)

  const openWidget = (): void => {
    ;(window as any).cloudinary.openUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_PRESET,
        tags: ['xmas'],
      },
      (error: Error, result: any) => {
        if (result.event === 'success') {
          dataDispatch({
            type: 'ADD_GALLERY',
            payload: result.info,
          })
        }
      },
    )
  }

  const handleClick = (publicId: string) => (): void => {
    if (props.withCb) {
      props.cb(publicId)
    }
    setCheckState({
      ...checkState,
      [publicId]: !checkState[publicId],
    })
  }

  const checkList = gallery.reduce((acc: string[], curr: GalleryInterface) => {
    if (checkState[curr.public_id]) {
      acc.push(curr.public_id)
    }
    return acc
  }, [])
  const handleDelete = (): void => {
    dataService.removeImage(checkList[0])
  }

  return (
    <div className="gallery">
      {!gallery.length ? (
        <div className="gallery__empty">
          The gallery is empty! <Button text="Add picture" handleClick={openWidget} />{' '}
        </div>
      ) : (
        <>
          <div>
            <Button text="Add" handleClick={openWidget} />
            {checkList[0] && (
              <Button text={checkList.length > 1 ? 'Delete all' : 'Delete'} handleClick={handleDelete} />
            )}
          </div>
          <div className="gallery__contents">
            {gallery.map((data: GalleryInterface) => (
              <Picture
                checked={checkState[data.public_id]}
                handleClick={handleClick}
                key={data.public_id}
                publicId={data.public_id}
                imgUrl={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/${data.public_id}.jpg`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Gallery
