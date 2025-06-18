import React from 'react'
import { Link } from 'react-router'
import useTitle from '../hooks/useTitle.jsx'

const NotFound = () => {
  useTitle('Not Found')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-emerald-500 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn bg-emerald-400 hover:bg-emerald-500 text-white">Go Home</Link>
    </div>
  )
}

export default NotFound 