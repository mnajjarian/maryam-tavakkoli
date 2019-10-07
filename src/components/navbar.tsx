import React, { useEffect } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Nav = () => {
  const [toggle, setToggle] = React.useState(false);
  return (
    <div className="navbar">
      <div
        className={classNames({
          navbar__menu: true,
          navbar__menu__change: toggle
        })}
        onClick={() => setToggle(!toggle)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav
        id="nav"
        className={classNames({
          show: !toggle
        })}
      >
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
