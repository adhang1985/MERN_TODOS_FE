import React, { useEffect, useState } from 'react'
import '../Styles/Todos.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getTask, updateTask } from '../Services/lists';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTodo = () => {

  const {id} = useParams();
  const navigateTo = useNavigate();
  const [task,setTask] = useState({});

  const token = localStorage.getItem('token');

  const options = {
    params : id,
    headers : {
     Authorization: `Bearer ${token}`
    }
 }

 const getTaskById = async() => {
  try {
     const response = await getTask(options);
     setTask(response.data);
  } catch (error) {
     console.log(error.message);
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
   try {
      const obj = {
        title:task.title,
        body:task.body
      }
      await updateTask(options,obj);
      toast.success('Task has been updated');
      setTimeout(() => {
        navigateTo('/todos');
      }, 2000);
      
   } catch (error) {
        console.log(error.message);
   }
}


  return (
    <div className='new-todo d-flex justify-content-center align-items-center'>
      <ToastContainer/>
        <div className='container'>
            <h1>Update Todo</h1>
            <div className='d-flex flex-column w-50 todo-input-wrap'>
                <input type='text' name='title' placeholder='Enter title' className='my-2 p-2 todo-inputs' value={task.title} onChange={handleChange}/>
                <textarea name='body' placeholder='Enter details' className='p-2 my-2 todo-inputs' value={task.body} onChange={handleChange}/>
            </div>
            <button type='submit' className='p-2 my-2 add-btn' onClick={update}>Save</button>
        </div>
    </div>
  )
}

export default EditTodo