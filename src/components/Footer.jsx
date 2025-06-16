import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faGithub, faLinkedin, faSquarePinterest, faSquareInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer className="relative pt-24 bg-white text-gray-700 overflow-hidden">

            <div className="absolute top-0 inset-x-0 h-32 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% -20%, rgba(255,179,128,0.5), transparent 70%)' }} />

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10 divide-y md:divide-y-0 md:divide-x divide-gray-700">

                <div className="pt-0 md:pt-0 md:pr-10">
                    <h3 className="text-2xl font-semibold">Elevate your brand with us and experience the difference.</h3>
                </div>

                <div className="hidden md:flex items-center justify-center">
                    <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-orange-500 rotate-90 select-none">Artifact</h1>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-10 md:pt-0 md:pl-10">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Important</h4>
                        <ul className="space-y-2">
                            <li><a href="#services" className="hover:text-orange-500">Services</a></li>
                            <li><a href="#portfolio" className="hover:text-orange-500">Portfolio</a></li>
                            <li><a href="#pricing" className="hover:text-orange-500">Pricing</a></li>
                            <li><a href="#about" className="hover:text-orange-500">About</a></li>
                            <li><a href="#reviews" className="hover:text-orange-500">Reviews</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#terms" className="hover:text-orange-500">Terms & conditions</a></li>
                            <li><a href="#privacy" className="hover:text-orange-500">Privacy policy</a></li>
                            <li><a href="#contact" className="hover:text-orange-500">Contact us</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-8 pb-12 relative z-10">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                    <div className="flex gap-4">
                        <a href="#x" className="p-2 rounded-full bg-gray-100 hover:bg-orange-400 text-gray-600 hover:text-white transition-colors"><FontAwesomeIcon icon={faXTwitter} /></a>
                        <a href="#github" className="p-2 rounded-full bg-gray-100 hover:bg-orange-400 text-gray-600 hover:text-white transition-colors"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="#linkedin" className="p-2 rounded-full bg-gray-100 hover:bg-orange-400 text-gray-600 hover:text-white transition-colors"><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href="#pin" className="p-2 rounded-full bg-gray-100 hover:bg-orange-400 text-gray-600 hover:text-white transition-colors"><FontAwesomeIcon icon={faSquarePinterest} /></a>
                        <a href="#insta" className="p-2 rounded-full bg-gray-100 hover:bg-orange-400 text-gray-600 hover:text-white transition-colors"><FontAwesomeIcon icon={faSquareInstagram} /></a>
                    </div>

                    <p className="text-sm text-gray-500">Copyright © {new Date().getFullYear()} - All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer 