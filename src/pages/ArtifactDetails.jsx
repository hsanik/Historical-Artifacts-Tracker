import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import AuthContext from '../context/AuthContext'

const ArtifactDetails = () => {
  const { id } = useParams()
  const { loading: authLoading } = useContext(AuthContext)

  const [artifact, setArtifact] = useState(null)
  const [likeUpdating, setLikeUpdating] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // TODO: use real API from backend
        const data = {
          _id: id,
          artifactName: 'Placeholder Artifact',
          imageUrl: 'https://i.ibb.co/SD6y0QVj/drawing.png',
          artifactType: 'Tools',
          historicalContext: '',
          shortDescription: 'Short desc',
          createdAt: '100 BC',
          discoveredAt: '1799',
          discoveredBy: 'Sajid Hassan',
          presentLocation: 'Bangladesh National Museum',
          likeCount: 0,
        }
        setArtifact(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchDetails()
  }, [id])

  const handleLike = async () => {
    if (!artifact || likeUpdating) return
    setLikeUpdating(true)
    const prev = artifact.likeCount
    setArtifact({ ...artifact, likeCount: prev + 1 })

    try {
        // TODO: use real API from backend
        } 
    catch (err) {
      console.error(err)
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