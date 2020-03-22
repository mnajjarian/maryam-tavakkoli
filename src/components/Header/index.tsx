import React, { useContext } from 'react'
import { DataContext } from 'contexts/dataContext'

function Header(): JSX.Element {
  const { data } = useContext(DataContext)
  if (!data.users.length) {
    return <div></div>
  }
  const fullName = data.users[0].firstName + ' ' + data.users[0].lastName
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">{fullName}</h1>
        <span>{data.users[0].title}</span>
      </div>
    </header>
  )
}

export default Header
