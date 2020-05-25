import React, { useContext } from 'react'
import { DataContext } from 'contexts/dataContext'

export function Notification(): JSX.Element {
  const {
    data: { message },
  } = useContext(DataContext)

  if (message) {
    return (
      <div style={{ position: 'absolute', top: '2em', left: 0, right: 0, padding: '1em', background: 'red' }}>
        <h1>{message}</h1>
      </div>
    )
  }
  return <div />
}
