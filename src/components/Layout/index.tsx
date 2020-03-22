import React, { ReactNode } from 'react'
import Nav from '../Navbar'
import Footer from '../Footer'

type Props = {
  children: ReactNode
}
const Layout = ({ children }: Props): JSX.Element => (
  <div
    style={{
      position: 'relative',
      height: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Nav />
    {children}
    <Footer />
  </div>
)

export default Layout
