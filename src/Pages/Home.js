import React, { useContext } from 'react'
import '../Styles/Home.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../Context/Authcontext';

const Home = () => {

  const {isAuth} = useContext(AuthContext);
  const navigateTo = useNavigate();

  const redirectToHome = () => {
    navigateTo('/todos/add');
  }

  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className='container d-flex justify-content-center align-items-center flex-column'>
            <h1 className='text-center'>Organize your <br/> work and life, finally.</h1>
            <p>
                Become focused, organized, and calm with <br/> todo app. The World's #1 task manager app.
            </p>
            <p>Do you want to create new task?</p>
            {/* <button className='home-btn p-2'>Register now!</button> */}
           
            
            {
              isAuth ? 
              <button className="nav-link btn-nav p-2" onClick={redirectToHome}>Click here!</button>
              :
              <Link className="nav-link btn-nav p-2" to={'/signup'}>Register now!</Link>
            }
        </div>
    </div>
  )
}

export default Home