import React, { useContext } from 'react'
import { DataContext } from '../../../contexts/dataContext'
import { AuthContext } from '../../../contexts/authContext'

export function About(): JSX.Element {
  const { authState } = useContext(AuthContext)

  const {
    data: { users },
  } = useContext(DataContext)

  if (!users.length || !authState) {
    return <div></div>
  }

  return (
    <section id="about" className="about col-sm-12 col-md-12">
      <p className="about-p">{users[0].bio}</p>
    </section>
  )
}
