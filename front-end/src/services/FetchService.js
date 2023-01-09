import { useLocalState } from "../util/useLocalStorage";

function ajax(url, method, jwt, body){

    const fetchData = {
        headers: {
            "Content-Type": "application/json",
        },
        method: method,
    }

    if(jwt){
        fetchData.headers.Authorization = `Bearer ${jwt}`
    }
    if(body){
        fetchData.body = JSON.stringify(body);
    }

    return fetch(url,fetchData)
    .then(response => {
        if(response.status === 200) return response.json();

    })
}

export default ajax;