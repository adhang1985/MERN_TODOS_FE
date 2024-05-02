import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Todos.css'
import Todo from '../Components/Todo'
import { getAllTasks } from '../Services/lists';
import AuthContext from '../Context/Authcontext';

const TodoList = () => {

  const userId = sessionStorage.getItem('id');
  const token = localStorage.getItem('token');

  const [tasks,setTasks] = useState();
  const {isDel,setIsDel} = useContext(AuthContext);

  const options = {
     params : userId,
     headers : {
      Authorization: `Bearer ${token}`
     }
  }

  const getTasks = async() => {
    try {
       const response = await getAllTasks(options);
       if(response.success){
        setIsDel(false);
       }
       setTasks(response.data);
    } catch (error) {
       console.log(error.message);
    }
 }

  useEffect(() => {
      getTasks();
  },[isDel])

  return (
    <div className='todos'>
        <div className='container'>
            <h1>Todo List</h1>
            <div className='row'>
              {
                tasks ?
                tasks.map((task,id) => {
                  return (
                    <div className='col-md-4 my-2' key={id}><Todo data={task}/></div>
                  )
                })
                
                :
                <div className='col-md-12 my-2'>
                  <p>You don't have any task.</p>
                </div>
              }
                
            </div>
        </div>
    </div>
  )
}

export default TodoList