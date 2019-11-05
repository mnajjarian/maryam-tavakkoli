import React, { useState } from "react";
import classNames from "classnames";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);

  return (
    <div className="nav">
      <ul className="nav__list">
        <div className="nav__list__group">
          <li className="nav__list__item">Profile</li>
        </div>
        <div className="nav__list__group">
          <li className="nav__list__item">Posts</li>
        </div>
        <div className="nav__list__group">
          <li className="nav__list__item">Create new</li>
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
