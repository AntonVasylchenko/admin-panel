import React from 'react'
import "./style.css"
import { PropsModalType } from "./type"

const Modal: React.FC<PropsModalType> = ({ children, onClick, isActive }) => {
  const modalClass = isActive? "modal modal--active" : "modal"
  return (
    <div className={modalClass}>
      <div className="modal-overlay" onClick={onClick}></div>
      <div className="modal-content">{children}</div>
    </div>
  )
}

export default Modal