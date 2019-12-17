import React, { useState, FormEvent, useContext } from "react";
import Button from "../Button";
import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";

interface InitialState {
  fullname: string;
  email: string;
  imageUrl?: string;
  bio: string;
}

const Profile = () => {
  const {
    data: { users },
    dataDispatch,
    dataService
  } = useContext(DataContext);
  const { authState } = useContext(AuthContext);
  //const [isOpen, setIsOpen] = useState(false);

  const user = users.filter((user: any) => user._id === authState.id)[0];

  const initialState: InitialState = {
    email: user ? user.email : "",
    fullname: user ? user.firstName + " " + user.lastName : "",
    bio: user ? user.bio : "",
    imageUrl: user ? user.imageUrl : ""
  };
  const [state, setState] = useState<InitialState>(initialState);

  if (!users.length || !authState) {
    return <div></div>;
  }

  const handleChange = (e: FormEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value
    });
  };

  const { fullname, email, bio, imageUrl } = state;
  const imageId = imageUrl ? imageUrl.split("/") : "";
  const publicId = imageId[imageId.length - 1].split(".")[0];
  console.log(imageId, imageUrl, publicId);
  const openWidget = () => {
    (window as any).cloudinary.openUploadWidget(
      {
        cloudName: "dfjemz4f7",
        uploadPreset: "no2bkme1",
        tags: ["profile"]
      },
      (error: Error, result: any) => {
        if (result.event === "success") {
          dataDispatch({
            type: "UPDATE_USER_IMAGE",
            payload: { userId: user._id, obj: { imageUrl: result.info.url } }
          });
          dataService.updateUser(
            user._id,
            {
              imageUrl: result.info.url
            },
            publicId
          );
        }
      }
    );
  };

  const handleSubmit = () => {
    dataService.updateUser(user._id, state);
  };

  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__photo">
          <img
            className="profile__img"
            src={
              imageUrl ? imageUrl : require(`../../assets/images/avatar.png`)
            }
            height="200px"
            alt="avatar"
          />
          <div className="profile__photo__overlay">
            <button className="profile__photo__edit" onClick={openWidget}>
              Change
            </button>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="fullname">
              Name
            </label>
            <input
              className="form__input"
              type="text"
              name="fullname"
              value={fullname}
              onChange={handleChange}
              placeholder="First name and Last Name"
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              className="form__input"
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="bio">
              About
            </label>
            <textarea
              className="form__textarea"
              cols={12}
              rows={9}
              name="bio"
              value={bio}
              onChange={handleChange}
              placeholder="Biography"
            ></textarea>
          </div>
          <div className="form__button">
            <Button text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
