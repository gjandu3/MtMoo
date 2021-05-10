import axios from 'axios';

const url = "http://localhost:5000/users"; 

export const register = (newUser) => axios.post(`${url}/register`, newUser);

export const login = (logData) => axios.post(`${url}/login`, logData); 

export const checkToken = (token) => axios.post(`${url}/tokenIsValid`, null, {headers: {"x-auth-token": token}});

export const getUser = (token) => axios.get(`${url}/`, {
    headers: { "x-auth-token": token },
  }); 

