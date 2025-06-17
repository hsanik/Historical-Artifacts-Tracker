import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import AuthContext from '../context/AuthContext'
import { getArtifactById, likeArtifact, getLikedArtifacts } from '../services/artifactApi.js'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'

const ArtifactDetails = () => {
    const { id } = useParams()
    const { loading: authLoading, user } = useContext(AuthContext)

    const [artifact, setArtifact] = useState(null)
    const [likeUpdating, setLikeUpdating] = useState(false)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        const fetchDetails = async () => {
            const data = await getArtifactById(id)
                setArtifact(data)
            if(user){
               const likes = await getLikedArtifacts(user.email)
               setLiked(likes.some(a=>a._id===id))
            }
        }
        fetchDetails()
    }, [id])

    const handleLike = async () => {
        if (!artifact || likeUpdating) return
        setLikeUpdating(true)
        const prev = artifact.likeCount
        const newLiked = !liked
        const newCount = newLiked ? prev + 1 : prev - 1
        setArtifact({ ...artifact, likeCount: newCount })
        setLiked(newLiked)

        try {
            const res = await likeArtifact(id, user?.email)
            setLiked(res.liked)
            setArtifact(a=>({...a, likeCount: res.likeCount}))
        } catch {
            toast.error('You already liked this artifact')
            setArtifact({ ...artifact, likeCount: prev })
            setLiked(liked)
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
                            className="btn btn-sm"
                            disabled={likeUpdating}
                        >
                            {likeUpdating ? '...' : (
                                <FontAwesomeIcon icon={ liked ? solidHeart : regularHeart } className={ liked ? 'text-red-500' : 'text-gray-400' } size="lg" />
                            )}
                        </button>
                        <span>{artifact.likeCount} {artifact.likeCount===1?'Like':'Likes'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtifactDetails 