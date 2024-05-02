import React, { useState } from 'react'
import '../Styles/Todos.css'
import { createTask } from '../Services/lists';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodo = () => {

    const initialVals = {
        title:"",
        body:""
    }
    const navigateTo = useNavigate();
    const [inputs,setInputs] = useState(initialVals);

    const email = sessionStorage.getItem('email');
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const {name,value} = e.target;
        setInputs({...inputs,[name]:value});
    }

    const createTodo = async() => {
        if(!inputs.title || !inputs.body){
            return toast.error("Please fill the details");
        }
        try {
            const obj = {
              title:inputs.title,
              body:inputs.body,
              email
            }
            const header = {
                Authorization: `Bearer ${token}`
            }
            
            const response = await createTask(header,obj);
            toast.success(response.message);
            setTimeout(() => {
                navigateTo('/todos');
            }, 2000);
         } catch (error) {
              toast.error(error.message);
         }
        setInputs(initialVals);
    }

  return (
    <div className='new-todo d-flex justify-content-center align-items-center'>
        <ToastContainer/>
        <div className='container'>
            <h1>Create Todo</h1>
            <div className='d-flex flex-column w-50 todo-input-wrap'>
                <input type='text' name='title' placeholder='Enter title' className='my-2 p-2 todo-inputs' value={inputs.title} onChange={handleChange}/>
                <textarea name='body' placeholder='Enter details' className='p-2 my-2 todo-inputs' value={inputs.body} onChange={handleChange}/>
            </div>
            <button type='submit' className='p-2 my-2 add-btn' onClick={createTodo}>Add</button>
        </div>
    </div>
  )
}

export default AddTodo