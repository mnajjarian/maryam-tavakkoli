import React, { ReactNode } from 'react'
import { Nav } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'
import { useScroll } from 'custom-hooks/useScroll'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props): JSX.Element => {
  const handleScroll = (): void => window.scrollTo(0, 0)

  const scroll = useScroll()
  return (
    <div
      className="container--fluid"
      style={{
        position: 'relative',
      }}
    >
      <Nav />
      {children}
      {scroll > 400 && (
        <div className="scroll" onClick={handleScroll}>
          <div></div>
          <div></div>
        </div>
      )}
      <Footer />
    </div>
  )
}
