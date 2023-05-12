import { fetchSinToken } from "../../helpers/fetch"
import { checkingCredentials, login, logout, register } from "./authSlice";



export const isRegister = (email, password, name) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const resp = await fetchSinToken('user', { email, password, name }, 'POST');
        const user = await resp.json();
        if (!user.Id) return dispatch(logout());
        dispatch(register(user));
        isLocalStorage(user.Token);
    }

}


export const islogin = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const user = await resp.json();
        if (!user.Id) return dispatch(logout());
        dispatch(login(user));
        isLocalStorage(user.Token);
    }
}


export const isLocalStorage = (user) => {
    localStorage.setItem('token', JSON.stringify(user));
}
