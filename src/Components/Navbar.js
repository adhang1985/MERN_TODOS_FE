import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PiNotebookBold } from "react-icons/pi";
import "../Styles/Navbar.css"
import AuthContext from '../Context/Authcontext';

const Navbar = () => {

     const {isAuth,setIsAuth} = useContext(AuthContext);
     const navigateTo = useNavigate();

     const user = sessionStorage.getItem('user');

     const logout = () => {
          localStorage.removeItem('token');
          sessionStorage.removeItem('id');
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('user');
          setIsAuth(false);
          navigateTo('/login');
     }

  return (
    <div>
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" href="#"><b><PiNotebookBold/> task-maker</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item mx-2">
                         <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                    </li>
                    <li className="nav-item mx-2">
                         <Link className="nav-link" to={'/aboutUs'}>AboutUs</Link>
                    </li>
                    {
                         isAuth && 
                         <>
                              <li className="nav-item mx-2">
                                   <Link className="nav-link" to={'/todos'}>Todos</Link>
                              </li>
                              <li className="nav-item mx-2">
                                   <button type='submit' className='nav-link' onClick={logout}>Logout</button>
                              </li>
                              <li className="nav-item mx-2 user-info">
                                   <p>Hi&nbsp;<span>{user}</span></p>
                              </li>
                         </>
                    }
                    {/* <li className="nav-item mx-2">
                         <Link className="nav-link btn-nav" to={'/signup'}>SignUp</Link>
                    </li> */}
                    {
                         !isAuth && 
                         <li className="nav-item mx-2">
                              <Link className="nav-link" to={'/login'}>SignIn</Link>
                         </li>
                    }
                    
                    {/* <li className="nav-item">
                         <Link className="nav-link">
                            <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt='user_icon' className='img-fluid user-png'/>
                         </Link>
                    </li> */}
                </ul>
                </div>
            </div>
            </nav>
    </div>
  )
}

export default Navbar