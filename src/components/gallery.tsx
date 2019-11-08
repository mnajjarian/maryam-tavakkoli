import React, { useState, useEffect } from "react";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import axios from "axios";
import Button from "./button";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  console.log(gallery);
  useEffect(() => {
    axios
      .get("https://res.cloudinary.com/dfjemz4f7/image/list/xmas.json")
      .then(res => {
        console.log(res.data.resources);
        setGallery(res.data.resources);
      });
  }, []);
  const openWidget = () => {
    (window as any).cloudinary.openUploadWidget(
      {
        cloudName: "dfjemz4f7",
        uploadPreset: "no2bkme1",
        tags: ["xmas"]
      },
      (error: Error, result: any) => {
        if (result.event === "success") {
          //console.log(result);
          //const url = result.info.secure_url;
          setGallery(gallery.concat(result.info));
        }
      }
    );
  };
  return (
    <div className="gallery">
      <div>
        <Button text="Add" handleClick={openWidget} />
      </div>
      <div className="gallery__contents">
        <CloudinaryContext cloudName="dfjemz4f7">
          {gallery.map((data: any) => {
            return (
              <div className="gallery__card">
                <a
                  target="_blank"
                  href={`https://res.cloudinary.com/dfjemz4f7/image/upload/${data.public_id}.jpg`}
                >
                  <Image publicId={data.public_id}>
                    <Transformation
                      crop="scale"
                      width="300"
                      height="200"
                      dpr="auto"
                      responsive_placeholder="blank"
                    />
                  </Image>
                </a>
              </div>
            );
          })}
        </CloudinaryContext>
      </div>
    </div>
  );
};

export default Gallery;
