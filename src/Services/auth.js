import axios from 'axios';

const URL = "https://mern-todos-be-p203.onrender.com/api/auth";

export const signup = async(obj) => {
    const response = await axios.post(`${URL}/signup`,obj);
    return response.data;
}

export const login = async(obj) => {
    const response = await axios.post(`${URL}/login`,obj);
    return response.data;
}