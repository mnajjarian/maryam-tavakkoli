import React, { useState } from 'react'
import Modal from '../Modal'
import Subscription from '../Subscription'

function Footer(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const toggleModal = (): void => setIsOpen(!isOpen)
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
      <span className="footer__subscribe" role="button" onClick={toggleModal}>
        subscribe
      </span>

      {isOpen && (
        <Modal toggleModal={toggleModal}>
          <Subscription handleToggle={toggleModal} />
        </Modal>
      )}
    </div>
  )
}

export default Footer
