import React, { useContext, useState } from "react";
import Button from "../Button";
import Picture from "./PictureChoice";
import { DataContext } from "../../contexts/dataContext";
import { IGallery } from "../../reducers/dataReducer";

interface Props {
  withCb: boolean;
  cb: (publicId: string) => void;
}

const Gallery = (props: Props) => {
  const {
    data: { gallery },
    dataDispatch,
    dataService
  } = useContext(DataContext);

  const images = gallery.reduce((acc: any, curr: IGallery) => {
    acc[curr.public_id] = false;
    return acc;
  }, []);

  const [checkState, setCheckState] = useState(images);

  const openWidget = () => {
    (window as any).cloudinary.openUploadWidget(
      {
        cloudName: "dfjemz4f7",
        uploadPreset: "no2bkme1",
        tags: ["xmas"]
      },
      (error: Error, result: any) => {
        if (result.event === "success") {
          dataDispatch({
            type: "ADD_GALLERY",
            payload: result.info
          });
        }
      }
    );
  };

  const handleClick = (publicId: string) => () => {
    if (props.withCb) {
      props.cb(publicId);
    }
    setCheckState({
      ...checkState,
      [publicId]: !checkState[publicId]
    });
  };

  const checkList = gallery.reduce((acc: any, curr: IGallery) => {
    if (checkState[curr.public_id]) {
      acc.push(curr.public_id);
    }
    return acc;
  }, []);
  const handleDelete = () => {
    dataService.removeImage(checkList[0]);
  };
  return (
    <div className="gallery">
      {!gallery.length ? <div className="gallery__empty">The gallery is empty! you can  <Button text="Add" handleClick={openWidget} /> </div> :
      <>
      <div>
        <Button text="Add" handleClick={openWidget} />
        {checkList[0] && (
          <Button
            text={checkList.length > 1 ? "Delete all" : "Delete"}
            handleClick={handleDelete}
          />
        )}
      </div>
      
      <div className="gallery__contents">
        {gallery.map((data: IGallery) => (
          <Picture
            checked={checkState[data.public_id]}
            handleClick={handleClick}
            key={data.public_id}
            publicId={data.public_id}
            imgUrl={`https://res.cloudinary.com/dfjemz4f7/image/upload/${data.public_id}.jpg`}
          />
        ))}
      </div>
      </>
}
    </div>
  );
};

export default Gallery;
