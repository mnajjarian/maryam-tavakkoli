import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

export function Nav(): JSX.Element {
  const {
    authState: { isLoggedIn },
  } = useContext(AuthContext)

  const [path, setPath] = useState('')

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

  const {
    location: { pathname },
  } = useHistory()

  const scrollTo = (pathName: string) => (): void => setPath(pathName)
  const element = document.getElementById(path)

  useEffect(() => {
    if (element) {
      return element.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [path, element])

  return (
    <div id="navbar" className="navbar sticky">
      <nav id="nav" className="navbar__items">
        <ul className="navbar__items__list">
          <NavLink to={{ pathname: '/' }}>home</NavLink>
          <NavLink onClick={scrollTo('about')} to={{ pathname: '/', state: { fromBlog: pathname === '/blog' } }}>
            about
          </NavLink>
          <NavLink onClick={scrollTo('contact')} to={{ pathname: pathname }}>
            contact
          </NavLink>
          <NavLink to="/blog">blog</NavLink>
          {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
        </ul>
      </nav>
    </div>
  )
}
