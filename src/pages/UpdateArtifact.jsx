import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

const UpdateArtifact = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [artifact, setArtifact] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchOne = async () => {
            try {
                // TODO: use real API from backend
                const data = {
                    artifactName: 'Placeholder',
                    imageUrl: '',
                    artifactType: 'Tools',
                    historicalContext: '',
                    createdAt: '',
                    discoveredAt: '',
                    discoveredBy: '',
                    presentLocation: '',
                }
                setArtifact(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchOne()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const formEl = e.target
            const updated = {
                artifactName: formEl.artifactName.value,
                imageUrl: formEl.imageUrl.value,
                artifactType: formEl.artifactType.value,
                historicalContext: formEl.historicalContext.value,
                createdAt: formEl.createdAt.value,
                discoveredAt: formEl.discoveredAt.value,
                discoveredBy: formEl.discoveredBy.value,
                presentLocation: formEl.presentLocation.value,
            }
            // TODO: use real API from backend
            navigate('/my')
        } catch (err) {
            console.error(err)
        } finally {
            setSaving(false)
        }
    }

    if (!artifact) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg text-emerald-400"></span></div>

    return (
        <div className="max-w-xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-6 text-center">Update Artifact</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input className="input input-bordered w-full" name="artifactName" defaultValue={artifact.artifactName} placeholder="Artifact Name" />
                <input className="input input-bordered w-full" name="imageUrl" defaultValue={artifact.imageUrl} placeholder="Artifact Image URL" />
                <select name="artifactType" className="select select-bordered w-full" defaultValue={artifact.artifactType}>
                    <option>Tools</option><option>Weapons</option><option>Documents</option><option>Writings</option><option>Jewelry</option><option>Pottery</option><option>Other</option>
                </select>
                <textarea className="textarea textarea-bordered w-full" name="historicalContext" defaultValue={artifact.historicalContext} placeholder="Historical Context" rows={3}></textarea>
                <input className="input input-bordered w-full" name="createdAt" defaultValue={artifact.createdAt} placeholder="Created At" />
                <input className="input input-bordered w-full" name="discoveredAt" defaultValue={artifact.discoveredAt} placeholder="Discovered At" />
                <input className="input input-bordered w-full" name="discoveredBy" defaultValue={artifact.discoveredBy} placeholder="Discovered By" />
                <input className="input input-bordered w-full" name="presentLocation" defaultValue={artifact.presentLocation} placeholder="Present Location" />
                <button type="submit" disabled={saving} className="btn w-full bg-emerald-400 hover:bg-emerald-500 text-white">{saving ? 'Updating...' : 'Update Artifact'}</button>
            </form>
        </div>
    )
}

export default UpdateArtifact 