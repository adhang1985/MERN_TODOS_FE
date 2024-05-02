import React, { useState } from 'react'
import '../Styles/Register.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { signup } from '../Services/auth';

const Register = () => {

    const [inputs,setInputs] = useState({
        email:"",
        username:"",
        password:""
    })
    const navigateTo = useNavigate();

    const handleChange = (e) => {
        const {name,value} = e.target;
        setInputs({...inputs,[name]:value});
    }

    const register = async() => {
        try {
            console.log(inputs);
            await signup(inputs);
            navigateTo('/login');
        } catch (error) {
            toast(error.message);
        }
    }

  return (
    <div className='signup'>
        <ToastContainer/>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
                    <div className='d-flex flex-column w-100 p-5'>
                        <input type='text' name='email' placeholder='Enter your email' className='p-2 my-3' value={inputs.email} onChange={handleChange}/>
                        <input type='text' name='username' placeholder='Enter your username' className='p-2 my-3' value={inputs.username} onChange={handleChange}/>
                        <input type='password' name='password' placeholder='Enter your password' className='p-2 my-3' value={inputs.password} onChange={handleChange}/>
                        <button type='submit' className='btn-signup p-2' onClick={register}>Signup</button>
                    </div>
                </div>
                <div className='col-lg-4 column d-flex justify-content-center align-items-center'>
                    <h1 className='text-center sign-up-heading'>Sign <br/> Up</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register