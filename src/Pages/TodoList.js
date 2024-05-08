import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Todos.css'
import Todo from '../Components/Todo'
import { getAllTasks } from '../Services/lists';
import AuthContext from '../Context/Authcontext';
import { ThreeDots } from 'react-loader-spinner';

const TodoList = () => {

  const userId = sessionStorage.getItem('id');
  const token = localStorage.getItem('token');

  const [tasks,setTasks] = useState();
  const {isDel,setIsDel} = useContext(AuthContext);
  const [isLoading,setIsloading] = useState(false);

  const options = {
     params : userId,
     headers : {
      Authorization: `Bearer ${token}`
     }
  }

  const getTasks = async() => {
    setIsloading(true);
    try {
       const response = await getAllTasks(options);
       if(response.success){
        setIsDel(false);
       }
       setIsloading(false);
       setTasks(response.data);
    } catch (error) {
      setIsloading(false);
       console.log(error.message);
    }
 }

  useEffect(() => {
      getTasks();
  },[isDel])

  return (
    <div className='todos'>
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