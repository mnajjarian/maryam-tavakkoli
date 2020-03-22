/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext } from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import LinkedinIcon from '../../assets/icons/linkedin-2.svg'

function Nav(): JSX.Element {
  const [toggle, setToggle] = React.useState<boolean>(false)
  const {
    authState: { isLoggedIn },
  } = useContext(AuthContext)
  return (
    <div className="navbar">
      <div
        className={classNames({
          navbar__menu: true,
          navbar__menu__change: toggle,
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
          navbar__items: true,
          show: !toggle,
        })}
      >
        <ul className="navbar__items__list">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
          <li className="navbar__social">
            <a
              className="navbar__social__link"
              href="https://www.linkedin.com/in/maryam-tavakoli/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className="navbar__social__icon" src={LinkedinIcon} alt="icon" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
