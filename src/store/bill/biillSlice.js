import { createSlice } from '@reduxjs/toolkit';

export const billSlice = createSlice({
    name: 'bill',
    initialState: {
        bills: [],
        billsSelect: []
    },
    reducers: {
        billAll: (state, { payload }) => {
            state.bills = payload
        },
        billSelect: (state, { payload }) => {
            state.billsSelect = payload.id
        },

    }
});


// Action creators are generated for each case reducer function
export const { billAll, billSelect } = billSlice.actions;