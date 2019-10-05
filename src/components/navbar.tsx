import React, { useEffect } from "react";
import classNames from "classnames";

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
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
