import { createSlice } from '@reduxjs/toolkit';

export const incomeSlice = createSlice({
    name: 'income',
    initialState: {
        incomes: [],
        incomesSelect: []
    },
    reducers: {
        incomeAll: (state, { payload }) => {
            //! https://react-redux.js.org/tutorials/quick-start
            state.incomes = payload
        },
        incomeSelect: (state, { payload }) => {
            state.incomesSelect = payload.id
        },

    }
});


// Action creators are generated for each case reducer function
export const { incomeAll, incomeSelect } = incomeSlice.actions;