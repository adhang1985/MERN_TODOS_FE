import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Todos.css'
import { Link } from 'react-router-dom'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { removeTask } from '../Services/lists';
import AuthContext from '../Context/Authcontext';
import dateFormat from '../Services/utils';

const Todo = (props) => {

  const {_id,title,body,eventDate} = props.data;

  // const token = localStorage.getItem('token');
  const email = sessionStorage.getItem('email');
  const eventDateNew = new Date(eventDate);
  const issueDate = dateFormat(eventDateNew);
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
    const today = new Date();
    const todayDate = dateFormat(today);
    console.log(todayDate);
    if(issueDate > todayDate){
      setStatus('future');
    }
    else if(issueDate < todayDate){
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
                (status !== 'past') ? <p>Event Date : <span>{issueDate}</span></p>
                :
                <p>Expired on <span>{issueDate}</span></p>
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