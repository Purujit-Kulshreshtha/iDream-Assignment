import axios from 'axios';

const API = axios.create({baseURL: "https://idream-api.herokuapp.com/"})

export const getUsers = () => API.get(`/users`);
export const getUser = (id) => API.get(`/users/${id}`);

export const signinRequest = (formData) => API.post('/users/signin', formData)
export const signupRequest = (formData) => API.post('/users/signup', formData)

export const updateUser = (formData, id) => API.patch(`/users/${id}`, formData)
