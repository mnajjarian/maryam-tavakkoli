import React from "react";

const Nav = () => {
  return (
    <div className="nav">
      <ul className="nav__list">
        <li className="nav__list__item">Posts</li>
        <li className="nav__list__item">Create new</li>
        <div className="nav__icon">
          <img
            className="nav__icon__image"
            src={require(`../../assets/images/bio-image.jpg`)}
            alt="admin"
          />
        </div>
      </ul>
  
    </div>
  );
};

export default Nav;
