import React, { Fragment } from "react";
import Nav from "./navbar";

const Header = () => {
  return (
    <Fragment>
      <header>
        <div>
          <h1>
            <a href="/">maryam tavakkoli</a>
          </h1>
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
