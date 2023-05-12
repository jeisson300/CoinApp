import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { Register } from '../pages/Register'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path ='login' element={<LoginPage/>} />
        <Route path ='register' element={<Register/>} />
        <Route path ='/*' element={<Navigate to='/auth/login'/>}/>        
    </Routes>
  )
}
