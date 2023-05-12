import { fetchToken } from "./fetch"

export const verifySession = async (token) => {
    const resp = await fetchToken(`auth`, {}, 'GET', token.replace(/['"]+/g, ''));
    const data = await resp.json();
    return data;
}