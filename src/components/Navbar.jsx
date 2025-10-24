import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import logoImg from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)
  const [term, setTerm] = useState('')

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-white text-gray-800 sticky top-0 z-50 shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4">

        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Artifact logo" className="w-8 h-8" />
            <Link to="/" className="font-bold text-xl text-emerald-600">ArtifactVault</Link>
          </div>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="flex items-center gap-8 font-medium">
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-600'}>Home</NavLink></li>
            <li><NavLink to="/artifacts" className={({ isActive }) => isActive ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-600'}>All Artifacts</NavLink></li>
            {user && <li><NavLink to="/artifacts/add" className={({ isActive }) => isActive ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-600'}>Add Artifact</NavLink></li>}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-3">
          {/* search icon */}
          <div className="relative">
            <button onClick={() => setShowSearch(prev => !prev)} className="btn btn-ghost btn-square">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            {showSearch && (
              <form onSubmit={(e) => { e.preventDefault(); if (term.trim()) { navigate(`/artifacts?search=${encodeURIComponent(term.trim())}`); setShowSearch(false); setTerm(''); } }} className="absolute right-0 mt-2 z-50">
                <input value={term} onChange={e => setTerm(e.target.value)} type="text" placeholder="Search..." className="input input-bordered w-48" autoFocus />
              </form>
            )}
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-square avatar">
                <div className="w-8 h-8 rounded-full ring ring-emerald-400 ring-offset-white ring-offset-2">
                  <img src={user.photoURL || logoImg} alt="user avatar" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 dropdown-content bg-white text-gray-800 rounded-lg w-52 shadow-lg border border-gray-200">
                <li className="font-semibold text-center pointer-events-none py-2 border-b border-gray-200">{user.displayName || 'Unnamed User'}</li>
                <li><NavLink to="/profile" className={({ isActive }) => isActive ? "block w-full text-left px-4 py-2 text-emerald-600 bg-emerald-50" : "block w-full text-left px-4 py-2 hover:bg-gray-100"}>Profile</NavLink></li>
                <li><NavLink to="/my" className={({ isActive }) => isActive ? "block w-full text-left px-4 py-2 text-emerald-600 bg-emerald-50" : "block w-full text-left px-4 py-2 hover:bg-gray-100"}>My Artifacts</NavLink></li>
                <li><NavLink to="/liked" className={({ isActive }) => isActive ? "block w-full text-left px-4 py-2 text-emerald-600 bg-emerald-50" : "block w-full text-left px-4 py-2 hover:bg-gray-100"}>Liked Artifacts</NavLink></li>
                <li><button onClick={handleLogout} className="block w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100">Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/auth/login" className="btn bg-emerald-500 hover:bg-emerald-600 border-none text-white ml-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
