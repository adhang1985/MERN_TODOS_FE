import React, { useEffect, useState } from 'react'
import '../Styles/Todos.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getTask, updateTask } from '../Services/lists';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from 'react-datepicker';  
import { ThreeDots } from 'react-loader-spinner';   
import "react-datepicker/dist/react-datepicker.css";  

const EditTodo = () => {

  const {id} = useParams();
  const navigateTo = useNavigate();
  const [task,setTask] = useState({});
  const [eventDate, setEventDate] = useState("");
  const [isLoading,setIsloading] = useState(false);

  const token = localStorage.getItem('token');

  const options = {
    params : id,
    headers : {
     Authorization: `Bearer ${token}`
    }
 }

 const getTaskById = async() => {
  setIsloading(true);
  try {
     const response = await getTask(options);
     setTask(response.data);
     setEventDate(response.data.eventDate);
     setIsloading(false);
  } catch (error) {
     console.log(error.message);
     setIsloading(false);
  }
}

useEffect(() => {
    getTaskById();
},[])


const handleChange = (e) => {
   const {name,value} = e.target;
   setTask({...task,[name]:value});
}

const update = async() => {
  setIsloading(true);
   try {
      const obj = {
        title:task.title,
        body:task.body,
        eventDate:eventDate
      }
      await updateTask(options,obj);
      toast.success('Task has been updated');
      setIsloading(false);
      setTimeout(() => {
        navigateTo('/todos');
      }, 2000);
      
   } catch (error) {
        console.log(error.message);
        setIsloading(false);
   }
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
            <h1>Update Task</h1>
            <div className='d-flex flex-column w-50 todo-input-wrap'>
                <input type='text' name='title' placeholder='Enter title' className='my-2 p-2 todo-inputs' value={task.title} onChange={handleChange}/>
                <textarea name='body' placeholder='Enter details' className='p-2 my-2 todo-inputs' value={task.body} onChange={handleChange}/>
                <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} dateFormat="dd/MM/yyyy"  minDate={new Date()} placeholderText="Select date here"/>
            </div>
            <button type='submit' className='p-2 my-4 add-btn' onClick={update}>Save</button>
            <button type='submit' className='p-2 my-4 btn btn-secondary' onClick={() => navigateTo('/todos')}>Cancel</button>
        </div>
    </div>
  )
}

export default EditTodo