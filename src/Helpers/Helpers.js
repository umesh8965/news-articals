export function ApiHelper(url, method = 'POST', data = {}, headers) {
    /*let bearer = 'Bearer ' + localStorage.getItem('user_token');*/
    if (method === 'POST' || method === 'PUT') {
        return fetch(url, {
            method: method,
            withCredentials: true,
            body: JSON.stringify(data),
            headers: headers,
            redirect: 'follow'
        })
            .then(res => res.json())
            .then((result) => {
                return result;
            }, (error) => {
                console.log('error', error);
            })
    } else {
        return fetch(url, {
            method: method,
            headers: headers,
        })
            .then(res => {
                if (res.status === 401) {
                    console.log('Move to Login');
                }
                return res.json();
            })
            .then((result) => {
                return result;
            }, (error) => {
                console.error("There was a problem with the fetch operation:", error)
            })
    }
}

