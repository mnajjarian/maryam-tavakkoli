import React, { useState, FormEvent, useContext } from "react";
import Button from "../Button";
import { DataContext } from "../../contexts/dataContext";

interface InitialState {
  firstName: string;
  lastName: string;
  username: string;
  imageUrl?: string;
  title: string;
  bio: string;
}

const Profile = () => {
  const {
    data: { users },
    dataDispatch,
    dataService
  } = useContext(DataContext);

  //const user = users.filter((user: any) => user._id === authState.id)[0];
  const user = users[0];

  const initialState: InitialState = {
    username: user ? user.username : "",
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    title: user ? user.title : "",
    bio: user ? user.bio : "",
    imageUrl: user ? user.imageUrl : ""
  };
  const [state, setState] = useState<InitialState>(initialState);

  const handleChange = (e: FormEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value
    });
  };

  const { firstName, lastName, username, title, bio, imageUrl } = state;
  const imageId = imageUrl ? imageUrl.split("/") : "";
  const publicId = imageId.length ? imageId[imageId.length - 1].split(".")[0] : '';

  const openWidget = () => {
    (window as any).cloudinary.openUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_PRESET,
        tags: ["profile"]
      },
      (error: Error, result: any) => {
        if (result.event === "success") {
          dataDispatch({
            type: "UPDATE_USER_IMAGE",
            payload: { userId: user._id, obj: { imageUrl: result.info.secure_url } }
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
            <label className="form__label" htmlFor="firstName">
              First Name
            </label>
            <input
              className="form__input"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder="First name"
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="form__input"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="username">
              Email
            </label>
            <input
              className="form__input"
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="title">
              Title
            </label>
            <input
              className="form__input"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="title"
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
