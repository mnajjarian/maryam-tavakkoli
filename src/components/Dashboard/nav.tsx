import React, { useState, useContext, useRef } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useOnClickOutside } from "../../custom-hooks/useOnClickOutside";
import { DataContext } from "../../contexts/dataContext";
import { User } from "../../reducers/dataReducer";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const { authService } = useContext(AuthContext);
  const {
    data: { users }
  } = useContext(DataContext);

  const user: User = users.filter(
    (user: User) =>
      user.firstName + " " + user.lastName === localStorage.getItem("user")
  )[0];
  const avatarUrl = user
    ? user.imageUrl
    : require("../../assets/images/avatar.png");

  const handleToggle = () => setToggle(!toggle);
  const handleLogout = () => {
    authService.logout();
  };

  let ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setToggle(false));
  const navList = () => (
    <>
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
      <div className="nav__list__logout">
        <li onClick={handleLogout} >Logout</li>
      </div>
      
    </>
  );
  return (
    <div className="nav">
      <ul className="nav__list">{navList()}</ul>
      <div ref={ref} className="nav__icon" onClick={handleToggle}>
        <img className="nav__icon__image" src={avatarUrl} alt="admin" />
          <ul className={classNames({
              nav__logout: true,
              "nav__logout-hide": !toggle
            })}>
            <li onClick={handleLogout} >Logout</li>
          </ul>
          <ul
            className={classNames({
              nav__menu: true,
              "nav__menu-hide": !toggle
            })}
          >
            {navList()}
          </ul>
      </div>
    </div>
  );
};

export default Nav;
