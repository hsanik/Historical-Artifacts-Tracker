import React, { useContext } from 'react'
import bgForm from '../assets/add-artifact-bg.png'
import AuthContext from '../context/AuthContext'

const Artifacts = () => {
  const { user } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const artifact = {
      artifactName: form.artifactName.value,
      imageUrl: form.imageUrl.value,
      artifactType: form.artifactType.value,
      historicalContext: form.historicalContext.value,
      shortDescription: form.shortDescription.value,
      createdAt: form.createdAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      presentLocation: form.presentLocation.value,
      adderName: user?.displayName || 'Anonymous',
      adderEmail: user?.email || 'N/A',
    }
    console.log('Submit artifact', artifact)
    // TODO: send to backend / firestore
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-100 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bgForm})` }}
    >
      <div className="relative w-11/12 md:w-4/5 lg:w-3/5 glass rounded-lg shadow-xl overflow-hidden">

        <div className="relative z-10 p-8 md:p-12 bg-white/80 backdrop-blur-lg max-h-screen overflow-y-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-6">Add Artifact</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              name="artifactName"
              type="text"
              placeholder="Artifact Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="imageUrl"
              type="url"
              placeholder="Artifact Image URL"
              className="input input-bordered w-full"
              required
            />

            <select
              name="artifactType"
              className="select select-bordered w-full"
              required
            >
              <option>Tools</option>
              <option>Weapons</option>
              <option>Documents</option>
              <option>Writings</option>
              <option>Jewelry</option>
              <option>Pottery</option>
              <option>Other</option>
            </select>

            <textarea
              name="historicalContext"
              className="textarea textarea-bordered w-full"
              placeholder="Historical Context"
              rows={3}
              required
            ></textarea>

            <textarea
              name="shortDescription"
              className="textarea textarea-bordered w-full"
              placeholder="Short Description"
              rows={2}
              required
            ></textarea>

            <input
              name="createdAt"
              type="text"
              placeholder="Created At (e.g., 100 BC)"
              className="input input-bordered w-full"
            />

            <input
              name="discoveredAt"
              type="text"
              placeholder="Discovered At (e.g., 1799)"
              className="input input-bordered w-full"
            />

            <input
              name="discoveredBy"
              type="text"
              placeholder="Discovered By"
              className="input input-bordered w-full"
            />

            <input
              name="presentLocation"
              type="text"
              placeholder="Present Location"
              className="input input-bordered w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-emerald-400 hover:bg-emerald-500 text-white"
            >
              Submit Artifact
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Artifacts 