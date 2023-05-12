import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        wallets: []
    },
    reducers: {
        walletAll: (state, { payload }) => {
            state.wallets = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { walletAll } = walletSlice.actions;