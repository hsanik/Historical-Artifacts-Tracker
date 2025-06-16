import React, { useContext } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-400"></span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children ? children : <Outlet />
}

export default PrivateRoute 