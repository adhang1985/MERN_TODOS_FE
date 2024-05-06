import axios from 'axios';

const URL = "https://mern-todos-be-p203.onrender.com/api/list";

// create task
export const createTask = async(option,data) => {
    const response = await axios.post(`${URL}/addTask/`,data,{headers:option});
    return response.data;
}

// get all task by user id
export const getAllTasks = async(options) => {
    const response = await axios.get(`${URL}/getAllTasks/${options.params}`,{headers:options.headers});
    return response.data;
}

// get task by task id
export const getTask = async(options) => {
    const response = await axios.get(`${URL}/getTask/${options.params}`,{headers:options.headers});
    return response.data;
}

// update task
export const updateTask = async(options,data) => {
    const response = await axios.put(`${URL}/editTask/${options.params}`,data,{headers:options.headers});
    return response.data;
}

// delete task
export const removeTask = async(options) => {
    const response = await axios.delete(`${URL}/deleteTask/${options.params}`,{data:{"email":options.data}});
    return response.data;
}