import React, { useState } from 'react'
import '../Styles/Todos.css'
import { createTask } from '../Services/lists';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';
import DatePicker from 'react-datepicker';  
   
import "react-datepicker/dist/react-datepicker.css";  

const AddTodo = () => {

    const initialVals = {
        title:"",
        body:""
    }
    const navigateTo = useNavigate();
    const [inputs,setInputs] = useState(initialVals);
    const [isLoading,setIsloading] = useState(false);
    const [eventDate, setEventDate] = useState("");

    const email = sessionStorage.getItem('email');
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const {name,value} = e.target;
        setInputs({...inputs,[name]:value});
    }

    const createTodo = async() => {
        setIsloading(true);
        if(!inputs.title || !inputs.body || !eventDate){
            setIsloading(false);
            return toast.error("Please fill the details");
        }
        try {
            const obj = {
              title:inputs.title,
              body:inputs.body,
              eventDate,
              email
            }
            console.log(obj);
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
            <h1>Create Task</h1>
            <div className='d-flex flex-column w-50 todo-input-wrap'>
            <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} dateFormat="dd/MM/yyyy"  minDate={new Date()} placeholderText="Select date here"/>
                <input type='text' name='title' placeholder='Enter title' className='my-2 p-2 todo-inputs' value={inputs.title} onChange={handleChange}/>
                <textarea name='body' placeholder='Enter details' className='p-2 my-2 todo-inputs' value={inputs.body} onChange={handleChange}/>
                
            </div>
            <button type='submit' className='p-2 my-2 add-btn' onClick={createTodo}>Add</button>
            <button type='submit' className='p-2 my-4 btn btn-secondary' onClick={() => navigateTo('/todos')}>Cancel</button>
        </div>
    </div>
  )
}

export default AddTodo