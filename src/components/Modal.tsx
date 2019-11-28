import React, { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  isOpen: boolean;
  handleClose?: () => void;
  children: ReactNode;
}
const Modal = (props: Props) => {
  const { handleClose, isOpen, children } = props;
  return (
    <div
      className={classNames({
        modal: true,
        "modal-isOpen": isOpen
      })}
    >
      <div className="modal__content">
        <div className="modal__close" onClick={handleClose}>
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
