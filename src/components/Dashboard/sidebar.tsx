import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__icon">
        <div>
          <img
            className="sidebar__icon__image"
            src={require(`../../assets/images/bio-image.jpg`)}
            alt="admin"
          />
        </div>
        <span>Maryam Tavakkoli</span>
      </div>
      <ul className="sidebar__list">
        <li className="sidebar__list__item">Posts</li>
        <li className="sidebar__list__item">Create</li>
      </ul>
    </div>
  );
};

export default Sidebar;
