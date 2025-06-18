import React, { useContext, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router'
import AuthContext from '../context/AuthContext'
import bgForm from '../assets/bg-form.png'
import signupImg from '../assets/signup-form.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import useTitle from '../hooks/useTitle.jsx'

const Signin = () => {
  const { signIn, signInWithGoogle, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  useTitle('Sign In')

  const handleSignin = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    await signIn(email, password)
    navigate(from, { replace: true })
  }

  const handleGoogleSignin = async () => {
    await signInWithGoogle()
    navigate(from, { replace: true })
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-400">Signin</h2>
          <p className="text-sm md:text-base text-gray-700 mt-2 mb-6">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSignin} className="space-y-4">
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="divider text-xs opacity-60">or sign in with</div>

          <div className="flex justify-center">
            <button onClick={handleGoogleSignin} className="btn btn-circle btn-ghost shadow">
              <FontAwesomeIcon icon={faGoogle} className="text-[#DB4437]" size="lg" />
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/register" className="font-medium text-emerald-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin 