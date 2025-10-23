import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import AuthContext from '../context/AuthContext'
import { getArtifactById, likeArtifact, getLikedArtifacts, getArtifactComments, addArtifactComment, deleteArtifactComment } from '../services/artifactApi.js'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import useTitle from '../hooks/useTitle.jsx'
import Loader from '../components/Loader.jsx'

const ArtifactDetails = () => {
    const { id } = useParams()
    const { loading: authLoading, user } = useContext(AuthContext)

    const [artifact, setArtifact] = useState(null)
    const [likeUpdating, setLikeUpdating] = useState(false)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [commentLoading, setCommentLoading] = useState(true)
    const [commentText, setCommentText] = useState('')
    const [commentSubmitting, setCommentSubmitting] = useState(false)
    const [deletingIds, setDeletingIds] = useState([])

    const userEmailLower = user?.email?.toLowerCase() || null

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

    const handleDeleteComment = async (commentId) => {
        if (deletingIds.includes(commentId)) return
        setDeletingIds(prev => [...prev, commentId])
        try {
            await deleteArtifactComment(id, commentId)
            setComments(prev => prev.filter(c => c._id !== commentId))
            toast.success('Comment deleted')
        } catch (err) {
            console.error(err)
            toast.error(err.message || 'Failed to delete comment')
        } finally {
            setDeletingIds(prev => prev.filter(val => val !== commentId))
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            setCommentLoading(true)
            try {
                const data = await getArtifactComments(id)
                setComments(data)
            } catch (err) {
                console.error(err)
                toast.error('Failed to load comments')
            } finally {
                setCommentLoading(false)
            }
        }
        fetchComments()
    }, [id])

    useTitle(artifact?artifact.artifactName:'Artifact Details')

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

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        if (!commentText.trim()) {
            toast.warn('Please write a comment before submitting')
            return
        }
        setCommentSubmitting(true)
        try {
            const payload = {
                content: commentText.trim(),
                authorName: user?.displayName || user?.email?.split('@')[0] || 'Anonymous',
                authorEmail: user?.email || null,
            }
            const result = await addArtifactComment(id, payload)
            setComments(prev => [result, ...prev])
            setCommentText('')
            toast.success('Comment added')
        } catch (err) {
            console.error(err)
            toast.error(err.message || 'Failed to add comment')
        } finally {
            setCommentSubmitting(false)
        }
    }

    if (authLoading || !artifact) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size={150} />
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

                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                        {commentLoading ? (
                            <p>Loading comments...</p>
                        ) : comments.length === 0 ? (
                            <p className="text-gray-500">No comments yet. Be the first to share your thoughts.</p>
                        ) : (
                            <ul className="space-y-4">
                                {comments.map((c) => {
                                    const canDelete = !!userEmailLower && c.authorEmail === userEmailLower
                                    return (
                                        <li key={c._id} className="border rounded-lg p-4 bg-gray-50">
                                            <div className="flex justify-between items-center mb-2">
                                                <div>
                                                    <span className="font-semibold mr-2">{c.authorName || 'Anonymous'}</span>
                                                    <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</span>
                                                </div>
                                                {canDelete && (
                                                    <button
                                                        onClick={() => handleDeleteComment(c._id)}
                                                        className="btn btn-xs btn-error"
                                                        disabled={deletingIds.includes(c._id)}
                                                    >
                                                        {deletingIds.includes(c._id) ? 'Deleting...' : 'Delete'}
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.content}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}

                        {user ? (
                            <form onSubmit={handleCommentSubmit} className="mt-6 space-y-3">
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    rows={3}
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Share your thoughts about this artifact"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="btn bg-emerald-400 hover:bg-emerald-500 text-white"
                                    disabled={commentSubmitting}
                                >
                                    {commentSubmitting ? 'Posting...' : 'Post Comment'}
                                </button>
                            </form>
                        ) : (
                            <p className="mt-6 text-sm text-gray-600">Please sign in to add a comment.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ArtifactDetails 