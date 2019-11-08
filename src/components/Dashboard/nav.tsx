import React, { useState } from "react";
import classNames from "classnames";
import { Link, Route } from "react-router-dom";
import Profile from "./profile";
import Gallery from "../gallery";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);

  return (
    <div className="nav">
      <ul className="nav__list">
        <div className="nav__list__group">
          <Link to="/dashboard/profile">Profile</Link>
        </div>
        <div className="nav__list__group">
          <Link to="/dashboard/gallery">Gallery</Link>
        </div>
        <div className="nav__list__group">
          <Link to="/dashboard/posts">Posts</Link>
        </div>
        <div className="nav__list__group">
          <Link to="/dashboard/create">Create new</Link>
        </div>
        <div className="nav__icon" onClick={handleToggle}>
          <img
            className="nav__icon__image"
            src={require(`../../assets/images/bio-image.jpg`)}
            alt="admin"
          />
          <ul
            className={classNames({
              nav__menu: true,
              "nav__menu-hide": !toggle
            })}
          >
            <li className="nav__menu__item">Logout</li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default Nav;
