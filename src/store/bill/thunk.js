import { fetchToken } from "../../helpers/fetch"
import Swal from 'sweetalert2'
import { billAll } from "./biillSlice";
export const isSaveBills = ({ name, newDate, userId, value, token }) => {
    return async (dispatch) => {
        const resp = await fetchToken('bill', { name, userId, value }, 'POST', token);
        const { status } = await resp.json();
        if (status) Swal.fire('success', 'Registrado exitosamente!', 'success')
        else Swal.fire('error', 'Error en el proceso', 'error')

    }
}


export const isBillsAll = ({ token }) => {
    return async (dispatch) => {
        const res = await fetchToken('bill', {}, 'GET', token);
        const data = await res.json();
        dispatch(billAll(data))
    }
}


export const isBillUpdate = ({ name, value, userId, date, id, token }) => {
    return async () => {
        const res = await fetchToken(`bill/${id}`, { name, id, userId, date, value, token }, 'PUT', token)
        const data = await res.json();
        if (data.id) Swal.fire('success', 'Update successfull', 'success');
        else Swal.fire('error', 'Error update', 'error')
    }
}


export const isBillDelete = ({ billsSelect: id, token }) => {
    return async () => {
        const res = await fetchToken(`bill/${id}`, {}, 'DELETE', token)
        const data = await res.json();
        if (data.status) { Swal.fire('success', 'Delete successfull', 'success'); }
        else {
            Swal.fire('error', 'Error delete', 'error')
        }
    }
}