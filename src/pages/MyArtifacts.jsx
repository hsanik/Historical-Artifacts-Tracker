import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import AuthContext from '../context/AuthContext'

const MyArtifacts = () => {
    const { user, loading: authLoading } = useContext(AuthContext)
    const [artifacts, setArtifacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!user) return

        const fetchMine = async () => {
            try {
                // TODO: use real API from backend
                const data = []
                setArtifacts(data)
            }
            catch (err) {
                setError('Failed to fetch your artifacts')
            }
            finally {
                setLoading(false)
            }
        }
        fetchMine()
    }, [user])

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this artifact?')) return
        try {
            // TODO: use real API from backend
            setArtifacts(prev => prev.filter(a => a._id !== id))
        }
        catch (err) {
            console.error(err)
        }
    }

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-emerald-400"></span>
            </div>
        )
    }

    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>

    if (artifacts.length === 0) {
        return <p className="text-center mt-10 text-gray-600">You haven't added any artifacts yet.</p>
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8 text-center">My Artifacts</h1>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {artifacts.map((artifact) => (
                    <div key={artifact._id} className="card bg-white shadow hover:shadow-lg transition-shadow">
                        <figure className="h-40 overflow-hidden"><img src={artifact.imageUrl} alt={artifact.artifactName} className="w-full h-full object-cover" /></figure>
                        <div className="p-4 space-y-2">
                            <h2 className="font-semibold text-lg line-clamp-1">{artifact.artifactName}</h2>
                            <p className="text-sm text-gray-500">{artifact.artifactType}</p>
                            <div className="flex gap-2 mt-4">
                                <Link to={`/artifacts/${artifact._id}/edit`} className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white">Update</Link>
                                <button onClick={() => handleDelete(artifact._id)} className="btn btn-xs bg-red-500 hover:bg-red-600 text-white">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyArtifacts 