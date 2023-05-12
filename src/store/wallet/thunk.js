import { fetchToken } from "../../helpers/fetch";
import { walletAll } from "./walletSlice";

export const iswalletAll = ({ token, id, date }) => {
    return async (dispatch) => {
        const res = await fetchToken(`wallet`, { id, date }, 'POST', token);
        const data = await res.json();
        dispatch(walletAll(data))
    }
}


export const iswalletHistory = ({ token, id }) => {
    return async (dispatch) => {
        const res = await fetchToken(`wallet/${id}`, {}, 'GET', token);
        const data = await res.json();
        dispatch(walletAll(data))
    }
}