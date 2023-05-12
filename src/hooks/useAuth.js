import React from 'react'
import { useDispatch } from 'react-redux'
import { verifySession } from '../helpers/verifySession';
import { login, logout } from '../store/auth/authSlice';

export const useAuth = () => {

    const dispatch = useDispatch();

    const handleSessionValidation = async () => {

        const session = localStorage.getItem('token')
        if (!session) {
            return dispatch(logout())
        }
        try {
            const data = await verifySession(session)
            localStorage.setItem("token", data.Token);
            return dispatch(login(data));
        } catch (error) {
            dispatch(logout())
        }

    }

    return { handleSessionValidation }
}
