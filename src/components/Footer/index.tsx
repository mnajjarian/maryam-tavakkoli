import React, { useState } from 'react'
import Modal from '../Modal'
import Subscription from '../Subscription'

function Footer(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = (): void => setIsOpen(!isOpen)
  return (
    <div className="footer">
      <div className="footer__subtitle">
        site by{' '}
        <a
          className="footer__subtitle__link"
          href="https://github.com/mnajjarian"
          rel="noopener noreferrer"
          target="_blank"
        >
          mahdi najjarian
        </a>
      </div>
      <span className="footer__subscribe" role="button" onClick={toggle}>
        subscribe
      </span>

      <Modal isOpen={isOpen} handleClose={toggle}>
        <Subscription handleToggle={toggle} />
      </Modal>
    </div>
  )
}

export default Footer
