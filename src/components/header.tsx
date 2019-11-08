import React, { Fragment } from "react";
import Nav from "./Navbar";

const Header = () => {
  return (
    <Fragment>
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">maryam tavakkoli</h1>
          <span>cloud engineer</span>
        </div>
      </header>
      <div className="nav__wrapper">
        <Nav />
      </div>
    </Fragment>
  );
};

export default Header;
