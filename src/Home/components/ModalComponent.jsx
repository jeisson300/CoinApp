import React, { useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../hooks/useModal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
  },
}

Modal.setAppElement('#root')
export const ModalComponent = ({children}) => {
const {isModelOpen, closeModal} =useModal();
const dispatch = useDispatch();

  const onCloseModal = () => {
    closeModal()
  }

  return (
    <Modal
      isOpen={isModelOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      {children}
    </Modal>
  )
}
