import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        isModelOpen : false
    },
    reducers: {
        onOpenModal: (state) => {
            state.isModelOpen = true;
        },
        onCloseModal: (state) => {
            state.isModelOpen = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal } = homeSlice.actions;