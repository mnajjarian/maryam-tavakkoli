import React, { useContext } from "react";
import Button from "../Button";
import Picture from "./PictureChoice";
import { DataContext } from "../../contexts/dataContext";
import { IGallery } from "../../reducers/dataReducer";

interface Props {
  cb: (publicId: string) => void;
}
const Gallery = (props: Props) => {
  const {
    data: { gallery },
    dataDispatch
  } = useContext(DataContext);

  if (!gallery.length) {
    return <div>Loading...</div>;
  }

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
    props.cb(publicId);
  };
  return (
    <div className="gallery">
      <div>
        <Button text="Add" handleClick={openWidget} />
      </div>
      <div className="gallery__contents">
        {gallery.map((data: IGallery) => (
          <Picture
            handleClick={handleClick}
            key={data.public_id}
            publicId={data.public_id}
            imgUrl={`https://res.cloudinary.com/dfjemz4f7/image/upload/${data.public_id}.jpg`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
