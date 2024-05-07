import React, { useContext, useState } from 'react'
import '../Styles/Register.css'
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../Context/Authcontext';
import { ThreeDots } from 'react-loader-spinner';

const Login = () => {

 const [inputs,setInputs] = useState({
     email:"",
     password:""
 });

 const [isLoading,setIsloading] = useState(false);

 const navigateTo = useNavigate();

 const {setIsAuth} = useContext(AuthContext);

 const handleChange = (e) => {
    const {name,value} = e.target;
    setInputs({...inputs,[name]:value});
 }

 const signin = async() => {
    setIsloading(true);
    if(!inputs.email || !inputs.password){
        setIsloading(false);
        return toast.error("Please fill your credentials!");
    }
    try {
        const response = await login(inputs);
        toast.success("You are successfully logged in");
        localStorage.setItem("token",response.accessToken);
        sessionStorage.setItem('id',response.data._id);
        sessionStorage.setItem('email',response.data.email);
        setIsAuth(true);
        setIsloading(false);
        navigateTo('/');
        
    } catch (error) {
        toast(error.message);
        setIsloading(false);
    }
 }


  return (
    <div className='signup'>
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
            <div className='row'>
                <div className='col-lg-4 column d-flex justify-content-center align-items-center'>
                    <h1 className='text-center sign-up-heading'>Sign <br/> In</h1>
                </div>
                <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
                    <div className='d-flex flex-column w-100 p-5'>
                        <input type='text' name='email' placeholder='Enter your email' className='p-2 my-3' value={inputs.email} onChange={handleChange}/>
                        <input type='password' name='password' placeholder='Enter your password' className='p-2 my-3' value={inputs.password} onChange={handleChange}/>
                        <button type='submit' className='btn-signup p-2' onClick={signin}>Signin</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login