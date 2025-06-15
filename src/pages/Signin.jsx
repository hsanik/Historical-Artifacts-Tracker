import React from 'react'
import bgForm from '../assets/bg-form.png'
import signupImg from '../assets/signup-form.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const Signin = () => {
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

          <form className="space-y-4">
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
            <button type="submit" className="btn w-full bg-emerald-300 hover:bg-emerald-400 border-none text-white">
              Sign in
            </button>
          </form>

          <div className="divider text-xs opacity-60">or sign in with</div>

          <div className="flex justify-center">
            <button className="btn btn-circle btn-ghost shadow">
              <FontAwesomeIcon icon={faGoogle} className="text-[#DB4437]" size="lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin 