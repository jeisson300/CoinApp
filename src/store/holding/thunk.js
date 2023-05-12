import { fetchToken } from "../../helpers/fetch"
import Swal from 'sweetalert2'
import { holdingAll } from "./holdingSlice";
export const isSaveHolding = ({ name, rate, userId, value, token }) => {
    return async (dispatch) => {
        const resp = await fetchToken('holding', { name, rate, userId, value }, 'POST', token);
        const { status } = await resp.json();
        if (status) Swal.fire('success', 'Registrado exitosamente!', 'success')
        else Swal.fire('error', 'Error en el proceso', 'error')

    }
}




export const isHoldingsAll = ({ token }) => {
    return async (dispatch) => {
        const res = await fetchToken('holding', {}, 'GET', token);
        const data = await res.json();
        dispatch(holdingAll(data))
    }
}


export const isHoldingUpdate = ({ name, value, userId, date, rate, id, token }) => {
    return async () => {
        const res = await fetchToken(`holding/${id}`, { name, id, rate, date, userId, value, token }, 'PUT', token)
        const data = await res.json();
        if (data.id) Swal.fire('success', 'Update successfull', 'success');
        else Swal.fire('error', 'Error update', 'error')
    }
}


export const isHoldingDelete = ({ holdingsSelect: id, token }) => {
    return async () => {
        const res = await fetchToken(`holding/${id}`, {}, 'DELETE', token)
        const data = await res.json();
        if (data.status) { Swal.fire('success', 'Delete successfull', 'success'); }
        else {
            Swal.fire('error', 'Error delete', 'error')
        }
    }
}