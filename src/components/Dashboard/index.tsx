import React, { ReactNode } from 'react'
import Nav from './Nav'

function Dashboard({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="dashboard">
      <Nav />
      {children}
    </div>
  )
}

export default Dashboard
