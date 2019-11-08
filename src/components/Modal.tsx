import React, { ReactNode } from "react";
import classNames from 'classnames';

interface Props {
    isOpen: boolean;
    children: ReactNode;
}
const Modal = (props: Props) => {
  return (
    <div className={classNames({
        modal: true,
        'modal-isOpen': props.isOpen
    })}>
      <div className="modal__content">{props.children}</div>
    </div>
  );
};

export default Modal;
