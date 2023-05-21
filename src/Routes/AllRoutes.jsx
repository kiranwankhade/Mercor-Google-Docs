import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import SignUp from '../Pages/SignUp';
import Reset from '../Pages/Reset';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import TextEditor from '../Components/TextEditor';

const AllRoutes = () => {
  return (
    <div>                          
            <Routes>                     
                <Route path="/" element={<Login/>}/> 
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/reset" element={<Reset/>}/>   
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/textEditor/:id" element={<TextEditor/>}/>
                
            </Routes>  
      </div>
  )
}

export default AllRoutes