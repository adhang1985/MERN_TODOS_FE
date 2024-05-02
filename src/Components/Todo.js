import React, { useContext } from 'react'
import '../Styles/Todos.css'
import { Link } from 'react-router-dom'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { removeTask } from '../Services/lists';
import AuthContext from '../Context/Authcontext';

const Todo = (props) => {

  const {_id,title,body} = props.data;

  // const token = localStorage.getItem('token');
  const email = sessionStorage.getItem('email');
  const {setIsDel} = useContext(AuthContext);

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

  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
            <div className='card-actions d-flex align-items-center justify-content-end'>
                <Link to={`/todos/edit/${_id}`} className="card-link"><MdOutlineModeEdit/></Link>
                <button className="card-link" type='button' onClick={remove}><MdDeleteForever/></button>
            </div>
        </div>
    </div>
  )
}

export default Todo