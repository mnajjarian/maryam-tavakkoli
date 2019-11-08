import React, { useState, FormEvent } from "react";
import Button from "../Button";

const Profile = () => {
    const[state, setState] = useState({
        fullname: '',
        email: '',
        bio: ''
    })
    const handleChange = (e: FormEvent): void => {
        const{name, value} = e.target as HTMLInputElement
        setState({
            ...state,
            [name]: value
        })
    }
    const handleSubmit = () => {}
    const{fullname, email, bio } = state;
  return (
    <div className="profile">
      <form className="profile__form" onSubmit={handleSubmit} >
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
          <label className="profile__form__label" htmlFor="bio">Biography</label>
          <textarea
          className="profile__form__textarea"
            cols={12}
            rows={10}
            name="bio"
            value={bio}
            onChange={handleChange}
            placeholder="Biography"
          ></textarea>
        </div>
        <Button text="Save" handleClick={() => {}} />
      </form>
    </div>
  );
};

export default Profile;
