import { fetchToken } from "../../helpers/fetch"
import Swal from 'sweetalert2'
import { incomeAll } from "./incomeSlice";


export const isSaveIncomes = ({ name, value, userId, token }) => {
    return async (dispatch) => {
        const resp = await fetchToken('income', { name, userId, value }, 'POST', token);
        const { status } = await resp.json();
        if (status) Swal.fire('success', 'Register successfull', 'success')
        else Swal.fire('error', 'Error register', 'error')

    }
}



export const isIncomesAll = ({ token }) => {
    return async (dispatch) => {
        const res = await fetchToken('income', {}, 'GET', token);
        const data = await res.json();
        dispatch(incomeAll(data))
    }
}

export const isIncomeUpdate = ({ name, value, id, date, userId, token }) => {
    return async () => {
        const res = await fetchToken(`income/${id}`, { name, id, userId, date, value, token }, 'PUT', token)
        const data = await res.json();
        if (data.id) Swal.fire('success', 'Update successfull', 'success');
        else Swal.fire('error', 'Error update', 'error')
    }
}


export const isIncomeDelete = ({ incomesSelect: id, token }) => {
    return async () => {
        const res = await fetchToken(`income/${id}`, {}, 'DELETE', token)
        const data = await res.json();
        if (data.status) { Swal.fire('success', 'Delete successfull', 'success'); }
        else {
            Swal.fire('error', 'Error delete', 'error')
        }
    }
}