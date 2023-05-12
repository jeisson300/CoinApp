import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../Auth/routes/AuthRoutes'
import { HomeRouter } from '../Home/routes/HomeRouter'
import { useAuth } from '../hooks/useAuth'
import { ChekingAuth } from '../ui/ChekingAuth'

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth)
  const { handleSessionValidation } = useAuth()

  useEffect(() => {
    handleSessionValidation()
  }, [])

  if (status === 'checking') {
    return <ChekingAuth />
  }

  return (
    <Routes>
      {status === 'authenticate' ? (
        <Route path="/*" element={<HomeRouter />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
