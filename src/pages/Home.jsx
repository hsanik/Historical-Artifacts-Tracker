import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getTopArtifacts } from '../services/artifactApi.js'
import bg1 from '../assets/slide1.png'
import bg2 from '../assets/slide2.png'
import bg3 from '../assets/slide3.png'
import bg4 from '../assets/slide4.png'
import bg5 from '../assets/slide5.png'

const Home = () => {
    const [featured, setFeatured] = useState([])
    const slides = [
        {
            img: bg1,
            title: 'Explore Ancient Wonders',
            desc: 'Uncover relics from the cradle of civilisation and feel the pulse of history beneath your fingertips.'
        },
        {
            img: bg2,
            title: 'Share Your Discovery',
            desc: "Have an artifact at home or in your field notes? Upload it and help expand the world's digital museum."
        },
        {
            img: bg3,
            title: 'Learn From Legends',
            desc: "Every inscription, carving and tool tells a story—dive in and let the past be your teacher."
        },
        {
            img: bg4,
            title: 'Connect With Collectors',
            desc: 'Join a global community of explorers, historians and hobbyists who celebrate human ingenuity.'
        },
        {
            img: bg5,
            title: 'Preserve The Past',
            desc: "Digitising fragile artifacts today ensures future generations can experience them tomorrow."
        },
    ]
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const fetchTop = async () => {
            const data = await getTopArtifacts()
            setFeatured(data)
        }
        fetchTop()
    }, [])

    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 4500)
        return () => clearInterval(id)
    }, [slides.length])

    return (
        <>
            <div className="relative w-full h-[60vh] mb-16 overflow-hidden">
                {slides.map((s, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${idx === current ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img src={s.img} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow">{s.title}</h2>
                            <p className="max-w-xl mb-6">{s.desc}</p>
                            <Link to="/artifacts" className="btn bg-emerald-500 hover:bg-emerald-600 border-none text-white">Browse All</Link>
                        </div>
                    </div>
                ))}

            </div>

            <section className="max-w-6xl mx-auto px-4 mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Top Artifacts</h3>
                    <Link to="/artifacts" className="btn btn-sm bg-emerald-400 hover:bg-emerald-500 text-white">See All</Link>
                </div>

                {featured.length === 0 ? (
                    <p className="text-center text-gray-500">No artifacts to display.</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {featured.map(a => (
                            <div key={a._id} className="card bg-white shadow hover:shadow-lg transition-shadow">
                                <figure className="h-40 overflow-hidden"><img src={a.imageUrl} alt={a.artifactName} className="w-full h-full object-cover" /></figure>
                                <div className="p-4 space-y-2">
                                    <h2 className="font-semibold text-lg line-clamp-1">{a.artifactName}</h2>
                                    <p className="text-sm text-gray-500 line-clamp-2">{a.shortDescription}</p>
                                    <p className="text-sm text-gray-500">❤️ {a.likeCount}</p>
                                    <Link to={`/artifacts/${a._id}`} className="btn btn-xs bg-emerald-400 hover:bg-emerald-500 text-white">View Detail</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="bg-emerald-50 py-16">
                <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
                    <img src={bg2} alt="preserve" className="rounded-lg shadow" />
                    <div>
                        <h3 className="text-3xl font-bold mb-4">Preserving Heritage</h3>
                        <p className="text-gray-700 mb-4">Our mission is to digitize rare artifacts so everyone can explore history without boundaries. Join us in preserving humanity's legacy.</p>
                        <Link to="/artifacts/add" className="btn bg-emerald-400 hover:bg-emerald-500 text-white">Add Your Artifact</Link>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-6">Community Highlights</h3>
                    <p className="max-w-2xl mx-auto text-gray-700 mb-8">Each month we spotlight the most fascinating discoveries submitted by our members. Share your finds and inspire others.</p>
                    <Link to="/my" className="btn bg-emerald-400 hover:bg-emerald-500 text-white">View Your Submissions</Link>
                </div>
            </section>
        </>
    )
}

export default Home 