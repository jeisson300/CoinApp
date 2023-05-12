import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        name: null,
        email: null,
        id: null,
        token: null
    },
    reducers: {
        register: (state, { payload }) => {
            state.status = 'authenticate';
            state.name = payload.Name;
            state.email = payload.Email;
            state.id = payload.Id;
            state.token = payload.Token;
        },
        login: (state, { payload }) => {
            state.status = 'authenticate';
            state.token = payload.Token;
            state.email = payload.Email;
            state.id = payload.Id;
            state.name = payload.Name;
        },
        logout: (state) => {
            state.status = 'no-authenticate';
            state.token = null;
            state.name = null;
            state.email = null;
            state.id = null
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});


// Action creators are generated for each case reducer function
export const { register, login, logout, checkingCredentials } = authSlice.actions;