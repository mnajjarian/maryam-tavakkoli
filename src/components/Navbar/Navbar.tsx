/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext, useEffect } from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

export function Nav(): JSX.Element {
  const [toggle, setToggle] = React.useState<boolean>(false)
  const handleToggle = (): void => setToggle(!toggle)
  const {
    authState: { isLoggedIn },
  } = useContext(AuthContext)
  useEffect(() => {
    const el = document.getElementById('navbar')
    const scrollFunc = (): void => {
      if (window.scrollY >= 50 && el) {
        el.classList.add('sticky')
      } else if (el) {
        el.classList.remove('sticky')
      }
    }
    document.addEventListener('scroll', scrollFunc)
    return (): void => {
      document.removeEventListener('scroll', scrollFunc)
    }
  }, [])
  return (
    <div id="navbar" className="navbar">
      <div
        className={classNames({
          navbar__menu: true,
          navbar__menu__change: toggle,
        })}
        onClick={handleToggle}
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
          <a href="/#home">home</a>
          <a href="/#about">about</a>
          <a href="/#contact">contact</a>
          <NavLink to="/blog">blog</NavLink>
          {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
        </ul>
      </nav>
    </div>
  )
}
