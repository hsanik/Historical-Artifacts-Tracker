import React, { useContext } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router'
import AuthContext from '../context/AuthContext'
import Loader from '../components/Loader.jsx'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={150} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children ? children : <Outlet />
}

export default PrivateRoute 