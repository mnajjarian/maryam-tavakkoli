import React, { ReactNode } from 'react'
import { Nav } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props): JSX.Element => (
  <div className="container--fluid">
    <Nav />
    {children}
    <Footer />
  </div>
)
