import { config } from "./config.js";

/** 
 * Creates fetch options for a request.
 * @param {*} method The HTTP method to use.
 * @param {*} addToken Whether to include an authorization token.
 * @param {*} body The request body.
 * @returns The fetch options.
 */
const makeOptions = (method, addToken, body) => {
  const opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      ...(addToken ? { "Authorization": `Bearer ${getToken()}` } : {})
    },
  };


  if (body !== undefined && body !== null) {
    opts.body = JSON.stringify(body);
  }

  return opts;
};

/**
 * Handles HTTP errors.
 * @param {*} res The response object.
 * @returns The parsed JSON data or null.
 */
const handleHttpErrors = async (res) => {
  if (!res.ok) {
    let errorBody = {};

    try {
      errorBody = await res.json();
      errorBody = errorBody.title || errorBody.message || errorBody.error || errorBody;
    } catch {
      errorBody = { message: res.statusText || "Request failed" };
    }

    throw { status: res.status, error: errorBody };
  }

  if (res.status === 204) { // No Content
    return null;
  }

  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : null;
};


/**
 * Makes a request to the specified endpoint.
 * @param {*} endpoint The API endpoint.
 * @param {*} method The HTTP method.
 * @param {*} body The request body.
 * @param {*} requiresAuth Whether the request requires authentication.
 * @returns The parsed JSON data or null.
 */
const request = async (endpoint, method = "GET", body = null, requiresAuth = true) => {
  const options = makeOptions(method, requiresAuth, body);
  const res = await fetch(`${config.API_URL}${endpoint}`, options);
  return handleHttpErrors(res);
};

async function login(username, password){
    const response = await fetch(config.API_URL+config.AUTH_LOGIN, {
        method: 'POST',
        body: JSON.stringify({username, password})
    });
    const data = await response.json();
    console.log(data);
    localStorage.setItem("jwtToken", data.token);
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


export { login, loggedIn, getData, logout, request};