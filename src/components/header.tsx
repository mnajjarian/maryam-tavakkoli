import React, { Fragment, useContext } from "react";
import Nav from "./Navbar";
import { DataContext } from "contexts/dataContext";
import { LastPost } from "./LatestPost";
import Footer from "./Footer";

const Header = () => {
  const { data } = useContext(DataContext);
  if (!data.users.length) {
    return <div></div>;
  }
  const fullName = data.users[0].firstName + " " + data.users[0].lastName;

  return (
    <Fragment>
      <div className="nav__wrapper">
        <Nav />
      </div>
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">{fullName}</h1>
          <span>{data.users[0].title}</span>
        </div>
      </header>
      <LastPost />
      <Footer />
    </Fragment>
  );
};

export default Header;
