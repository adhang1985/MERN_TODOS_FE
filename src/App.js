import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './Pages/About'
import Login from './Pages/Login'
import Register from './Pages/Register'
import TodoList from './Pages/TodoList'
import AddTodo from './Pages/AddTodo'
import EditTodo from './Pages/EditTodo'
import AuthContext from './Context/Authcontext'
import './App.css'

const App = () => {

  const [isAuth,setIsAuth] = useState(false);
  const [isDel,setIsDel] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token){
      setIsAuth(true);
    }
  },[])

  return (
        <AuthContext.Provider value={{isAuth,setIsAuth,isDel,setIsDel}}>
          <BrowserRouter>
           <Navbar/>
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path='/aboutUs' element={<About/>}/>
              <Route path='/todos' element={<TodoList/>}/>
              <Route path='/todos/add' element={<AddTodo/>}/>
              <Route path='/todos/edit/:id' element={<EditTodo/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Register/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
        </AuthContext.Provider>
  )
}

export default App