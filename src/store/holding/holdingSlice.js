import { createSlice } from '@reduxjs/toolkit';

export const holdingSlice = createSlice({
    name: 'holding',
    initialState: {
        holdings: [],
        holdingsSelect: []
    },
    reducers: {
        holdingAll: (state, { payload }) => {
            state.holdings = payload
        },
        holdingSelect: (state, { payload }) => {
            state.holdingsSelect = payload.id
        },
    }
});


// Action creators are generated for each case reducer function
export const { holdingAll, holdingSelect } = holdingSlice.actions;