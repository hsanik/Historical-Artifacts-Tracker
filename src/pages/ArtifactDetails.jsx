import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import AuthContext from '../context/AuthContext'
import { getArtifactById, likeArtifact } from '../services/artifactApi.js'
import { toast } from 'react-toastify'

const ArtifactDetails = () => {
    const { id } = useParams()
    const { loading: authLoading, user } = useContext(AuthContext)

    const [artifact, setArtifact] = useState(null)
    const [likeUpdating, setLikeUpdating] = useState(false)

    useEffect(() => {
        const fetchDetails = async () => {
            const data = await getArtifactById(id)
            setArtifact(data)
        }
        fetchDetails()
    }, [id])

    const handleLike = async () => {
        if (!artifact || likeUpdating) return
        setLikeUpdating(true)
        const prev = artifact.likeCount
        setArtifact({ ...artifact, likeCount: prev + 1 })

        try {
            await likeArtifact(id, user?.email)
        } catch {
            toast.error('You already liked this artifact')
            setArtifact({ ...artifact, likeCount: prev })
        } finally {
            setLikeUpdating(false)
        }
    }

    if (authLoading || !artifact) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-emerald-400"></span>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="card bg-white shadow">
                <figure>
                    <img src={artifact.imageUrl} alt={artifact.artifactName} className="w-full object-cover max-h-96" />
                </figure>
                <div className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold">{artifact.artifactName}</h1>
                    <p><span className="font-semibold">Type:</span> {artifact.artifactType}</p>
                    <p><span className="font-semibold">Created:</span> {artifact.createdAt}</p>
                    <p><span className="font-semibold">Discovered:</span> {artifact.discoveredAt} by {artifact.discoveredBy}</p>
                    <p><span className="font-semibold">Location:</span> {artifact.presentLocation}</p>
                    <p>{artifact.historicalContext}</p>

                    <div className="flex items-center gap-3 mt-6">
                        <button
                            onClick={handleLike}
                            className="btn btn-sm bg-emerald-400 hover:bg-emerald-500 text-white"
                            disabled={likeUpdating}
                        >
                            {likeUpdating ? 'Liking...' : 'Like'}
                        </button>
                        <span>{artifact.likeCount} Likes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtifactDetails 