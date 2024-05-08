import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Todos.css'
import { Link } from 'react-router-dom'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { removeTask } from '../Services/lists';
import AuthContext from '../Context/Authcontext';

const Todo = (props) => {

  const {_id,title,body,eventDate} = props.data;

  // const token = localStorage.getItem('token');
  const email = sessionStorage.getItem('email');
  const eventDateNew = new Date(eventDate).toLocaleDateString();
  const {setIsDel} = useContext(AuthContext);
  const [status,setStatus] = useState("red");

  const options = {
    params : _id,
    data:email
 }

 const remove = async() => {
  
    try {
      const response = await removeTask(options);
      console.log(response);
      if(response.success){
        setIsDel(true);
      }
    } catch (error) {
      console.log(error.message);
    }
 }

 const getDateStatus = () => {
    const today = new Date().toLocaleDateString();
    console.log(today);
    console.log(eventDateNew);
    if(eventDateNew > today){
      setStatus('future');
    }
    else if(eventDateNew < today){
      setStatus('past');
    }
    else{
      setStatus('present');
    }
 }

 useEffect(() => {
    getDateStatus();
 },[])

  return (
    <div className={`card ${status}`}>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
            <div className='card-actions d-flex align-items-center'>
              {
                (status !== 'past') ? <p>Event Date : <span>{eventDateNew}</span></p>
                :
                <p>Expired on <span>{eventDateNew}</span></p>
              }
              
              <div>
                {
                  (status !== 'past') && <Link to={`/todos/edit/${_id}`} className="card-link"><MdOutlineModeEdit/></Link>
                }
                
                <button className="card-link" type='button' onClick={remove}><MdDeleteForever/></button>
              </div>  
            </div>
        </div>
    </div>
  )
}

export default Todo