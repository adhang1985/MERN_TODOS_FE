import React, { useState } from 'react'
import '../Styles/Todos.css'
import { createTask } from '../Services/lists';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

const AddTodo = () => {

    const initialVals = {
        title:"",
        body:""
    }
    const navigateTo = useNavigate();
    const [inputs,setInputs] = useState(initialVals);
    const [isLoading,setIsloading] = useState(false);

    const email = sessionStorage.getItem('email');
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const {name,value} = e.target;
        setInputs({...inputs,[name]:value});
    }

    const createTodo = async() => {
        setIsloading(true);
        if(!inputs.title || !inputs.body){
            setIsloading(false);
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
            setIsloading(false);
            setTimeout(() => {
                navigateTo('/todos');
            }, 2000);
         } catch (error) {
            setIsloading(false);
              toast.error(error.message);
         }
        setInputs(initialVals);
    }

  return (
    <div className='new-todo d-flex justify-content-center align-items-center'>
        <ToastContainer/>
        {
            isLoading && 
            <div className='loader'>
                <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
            </div>
        }
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