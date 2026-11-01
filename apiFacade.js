import { config } from "./config.js";

async function login(username, password){
    const response = await fetch(config.API_URL+config.AUTH_LOGIN, {
        method: 'POST',
        body: JSON.stringify({username, password})
    });
    const data = await response.json();
    console.log(data);
    localStorage.setItem("jwtToken", data.token);
    // getData();
}

function getToken(){
    return localStorage.getItem("jwtToken");
}

function loggedIn(){
    return getToken() !== null;
}

function logout(){
    localStorage.removeItem("jwtToken");
}

async function getData(){
    const response = await fetch(config.API_URL+config.USERPROTECTED, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });
    const data = await response.json();
    return data;
}

export { login, loggedIn, getData, logout };