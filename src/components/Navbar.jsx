import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import AuthContext from '../context/AuthContext'
import logoImg from '../assets/logo.png'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="navbar bg-white text-gray-800 sticky top-0 z-50 px-6 py-2">

      <div className="flex items-center gap-2">
        <img src={logoImg} alt="Artifact logo" className="w-8 h-8" />
        <Link to="/" className="font-bold text-xl text-emerald-600">ArtifactVault</Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-10 font-medium">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'hover:text-black'}>Home</NavLink></li>
          <li><NavLink to="/artifacts" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'hover:text-black'}>All Artifacts</NavLink></li>
          <li><NavLink to="/artifacts/add" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'hover:text-black'}>Add Artifact</NavLink></li>
        </ul>
      </div>

      <div className="md:flex items-center gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-square avatar">
              <div className="w-8 h-8 rounded-full ring ring-emerald-400 ring-offset-white">
                <img src={user.photoURL || logoImg} alt="user avatar" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 dropdown-content bg-white text-gray-800 rounded w-52 shadow-lg border border-gray-200">
              <li className="font-semibold text-center pointer-events-none py-2 border-b border-gray-200">{user.displayName || 'Unnamed User'}</li>
              <li><NavLink to="/my">My Artifacts</NavLink></li>
              <li><NavLink to="/liked">Liked Artifacts</NavLink></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/auth/login" className="rounded-full px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors">
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
