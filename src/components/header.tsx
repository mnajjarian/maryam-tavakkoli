import React, { Fragment, useContext } from "react";
import Nav from "./Navbar";
import { DataContext } from "contexts/dataContext";

const Header = () => {
  const { data } = useContext(DataContext);
  console.log(data);
  const fullName = data.users[0].firstName + " " + data.users[0].lastName;
  return (
    <Fragment>
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">{fullName}</h1>
          <span>{data.users[0].title}</span>
        </div>
      </header>
      <div className="nav__wrapper">
        <Nav />
      </div>
    </Fragment>
  );
};

export default Header;
