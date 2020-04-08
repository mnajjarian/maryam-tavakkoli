import React, { ReactNode } from 'react'
import classNames from 'classnames'

type Props = {
  isOpen: boolean
  handleClose?: () => void
  children: ReactNode
}
function Modal(props: Props): JSX.Element {
  const { handleClose, isOpen, children } = props
  return (
    <div
      className={classNames({
        modal: true,
        'modal-isOpen': isOpen,
      })}
    >
      <div className="modal__content" style={{ height: '60%', width: '70%', background: 'lightblue' }}>
        <div className="modal__close" onClick={handleClose}>
          &times;
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
