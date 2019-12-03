import React, { useState, useContext, useRef } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useOnClickOutside } from "../../custom-hooks/useOnClickOutside";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const { authService } = useContext(AuthContext);
  const handleToggle = () => setToggle(!toggle);
  const handleLogout = () => {
    authService.logout();
  };
  let ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setToggle(false));
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
        <div ref={ref} className="nav__icon" onClick={handleToggle}>
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
            <li className="nav__menu__item" onClick={handleLogout}>
              Avatar
            </li>
            <li className="nav__menu__item" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default Nav;
