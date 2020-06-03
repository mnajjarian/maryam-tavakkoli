import React, { useContext } from 'react'
import { DataContext } from '../../../contexts/dataContext'

export function Header(): JSX.Element {
  const { data } = useContext(DataContext)

  if (!data.users.length) {
    return <div></div>
  }
  const fullName = data.users[0].firstName + ' ' + data.users[0].lastName

  return (
    <section id="home" className="header col-sm-12 col-md-12">
      {data.users[0].imageUrl && <img src={data.users[0].imageUrl} alt="author" />}
      <h1>{fullName}</h1>
      <p>{data.users[0].title}</p>
      <a href="#about" className="header__scroll">
        <div className="header__scroll-down"></div>
      </a>
    </section>
  )
}
