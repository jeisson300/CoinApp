const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `https://localhost:7163/api/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    }
    else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}



const fetchToken = (endpoint, data, method = 'GET', token) => {
    const url = `https://localhost:7163/api/${endpoint}`;
    // const token = localStorage.getItem('token') || '';
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    }
}



export {
    fetchSinToken,
    fetchToken
}