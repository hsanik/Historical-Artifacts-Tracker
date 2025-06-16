import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router'
import AuthContext from '../context/AuthContext'
import bgForm from '../assets/bg-form.png'
import signupImg from '../assets/signup-form.png'

const Signup = () => {
  const { signUp, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    document.title = 'Register'
  }, [])

  const validatePassword = (password) => {
    if (password.length < 6) {
      console.log('Password must be at least 6 characters long')
      return false
    }
    if (!/[A-Z]/.test(password)) {
      console.log('Password must contain at least one uppercase letter')
      return false
    }
    if (!/[a-z]/.test(password)) {
      console.log('Password must contain at least one lowercase letter')
      return false
    }
    return true
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const form = e.target
    const displayName = form.name.value
    const photoURL = form.photoURL.value
    const email = form.email.value
    const password = form.password.value

    if (!validatePassword(password)) {
      return
    }

    try {
      await signUp(email, password, displayName, photoURL)
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      console.log(err.message)
    }
  }


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-100 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bgForm})` }}
    >
      <div className="relative w-11/12 md:w-4/5 lg:w-3/5 glass rounded-lg shadow-xl overflow-hidden">
        <img
          src={signupImg}
          alt="Kids having fun illustration"
          className="absolute inset-0 w-full h-full object-contain md:object-cover md:object-left pointer-events-none select-none"
        />

        <div className="relative z-10 md:ml-auto md:w-1/2 p-8 md:p-12 bg-white/70 backdrop-blur-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-400">Signup</h2>
          <p className="text-sm md:text-base text-gray-700 mt-2 mb-6">
            Create a new account to get started with Artifact.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="full name"
              className="input input-bordered w-full bg-white/60"
              required
            />
            <input
              name="photoURL"
              type="url"
              placeholder="photo URL"
              className="input input-bordered w-full bg-white/60"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered w-full bg-white/60"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input input-bordered w-full bg-white/60"
              required
            />

            <button type="submit" disabled={loading} className="btn w-full bg-emerald-300 hover:bg-emerald-400 border-none text-white">
              {loading ? 'Creating...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-emerald-500 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
