import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onCloseModal, onOpenModal } from '../store/home/homeSlice';

export const useModal = () => {
    const dispatch = useDispatch();

    const { isModelOpen } = useSelector(state => state.home);

    const openModal = () => {
        dispatch(onOpenModal());
    }

    const closeModal = () => {
        dispatch(onCloseModal());;
    }

    return {
        isModelOpen,
        openModal,
        closeModal
    }
}
