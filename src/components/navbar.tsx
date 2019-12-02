import React, { useEffect, useContext } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Nav = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const { authState: { isLoggedIn } } = useContext(AuthContext);

  useEffect(() => {
    const nav = document.getElementById("nav");
    if (nav) {
      const sticky = nav.offsetTop;
      const scrollCallBack = window.addEventListener("scroll", () => {
        if (window.pageYOffset > sticky) {
          nav.classList.add("sticky");
        } else {
          nav.classList.remove("sticky");
        }
      }) as any;
       return () => 
        window.removeEventListener("scroll", scrollCallBack) as any;
   
    }
  }, []);
  return (
    <div id="nav" className="navbar">
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
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          {isLoggedIn &&
          <NavLink to="/dashboard">Dashboard</NavLink>
          }
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
