import React, { useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
  toggleModal: () => void
}

const modalRoot = document.createElement('portal')

export function Modal(props: Props): React.ReactElement | null {
  const { toggleModal, children } = props
  useEffect(() => {
    document.body.appendChild(modalRoot)

    return (): void => {
      document.body.removeChild(modalRoot)
    }
  }, [])

  return createPortal(
    <div className="modal">
      <div className="modal__overlay" onClick={toggleModal} />
      <div className="modal__body">{children}</div>
    </div>,
    modalRoot as HTMLElement,
  )
}
