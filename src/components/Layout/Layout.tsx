import React, { ReactNode } from 'react'
import { Nav } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props): JSX.Element => (
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
