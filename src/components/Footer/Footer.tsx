import React from 'react'
import LinkedinIcon from '../../assets/icons/linkedin-2.svg'
import { Subscription } from './Subscription/Subscription'

export function Footer(): JSX.Element {
  return (
    <section id="contact" className="footer col-sm-12 col-md-6">
      <h1>let's get in touch!</h1>
      <div className="footer__social">
        <a
          className="navbar__social__link"
          href="https://www.linkedin.com/in/maryam-tavakoli/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img className="navbar__social__icon" src={LinkedinIcon} alt="icon" />
        </a>
      </div>
      <Subscription />
    </section>
  )
}
