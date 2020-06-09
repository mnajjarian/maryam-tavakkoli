import React, { ReactNode } from 'react'
import { Nav } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'
import { ScrollToTop } from './ScrollToTop'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="container--fluid">
      <Nav />
      {children}
      <ScrollToTop />
      <Footer />
    </div>
  )
}
