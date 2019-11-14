import React, { useState, FormEvent, useContext } from "react";
import Button from "../Button";
import { DataContext } from "../../contexts/dataContext";

interface InitialState {
  fullname: string;
  email: string;
  bio: string;
}

const Profile = () => {
  const { data: { profile} } = useContext(DataContext);

  const initialState: InitialState = {
    email: '',
    fullname: profile ? profile[0].name : '',
    bio: profile ? profile[0].biography : ''
  };

  const [state, setState] = useState<InitialState>(initialState);

  const handleChange = (e: FormEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value
    });
  };
  const handleSubmit = () => {};
  const { fullname, email, bio } = state;
  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__photo" >
          <img className="profile__img" src={require(`../../assets/images/bio-image.jpg`)} height="200px" alt="avatar"/>
          <div className="profile__photo__overlay">
            <button className="profile__photo__edit" >
              Change
            </button>
          </div>
        </div>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__form__group">
            <label className="profile__form__label" htmlFor="fullname">
              Name
            </label>
            <input
              className="profile__form__input"
              type="text"
              name="fullname"
              value={fullname}
              onChange={handleChange}
              placeholder="First name and Last Name"
            />
          </div>
          <div className="profile__form__group">
            <label className="profile__form__label" htmlFor="email">
              Email
            </label>
            <input
              className="profile__form__input"
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="profile__form__group">
            <label className="profile__form__label" htmlFor="bio">
              Biography
            </label>
            <textarea
              className="profile__form__textarea"
              cols={12}
              rows={8}
              name="bio"
              value={bio}
              onChange={handleChange}
              placeholder="Biography"
            ></textarea>
          </div>
          <div className="profile__form__button">
            <Button text="Save" handleClick={() => {}} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
