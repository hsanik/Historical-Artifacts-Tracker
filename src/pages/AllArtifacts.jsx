import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { getAllArtifacts } from '../services/artifactApi.js'
import useTitle from '../hooks/useTitle.jsx'
import Loader from '../components/Loader.jsx'

const AllArtifacts = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const initialQ = params.get('search') || ''

  const [artifacts, setArtifacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState(initialQ)

  useEffect(() => {
    const fetchData = async (term) => {
      const data = await getAllArtifacts(term)
      setArtifacts(data)
      setLoading(false)
    }
    fetchData(query)
  }, [query])

  const handleSubmit = (e)=>{
    e.preventDefault()
    const trimmed = query.trim()
    if(trimmed){
      navigate(`/artifacts?search=${encodeURIComponent(trimmed)}`)
    }else{
      navigate('/artifacts')
    }
  }

  useTitle('All Artifacts')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={150}/>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-6">All Artifacts</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex justify-center gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={e=>setQuery(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <button className="btn bg-emerald-400 hover:bg-emerald-500 text-white" type="submit">Go</button>
      </form>

      {artifacts.length === 0 ? (
        <p className="text-center text-gray-500">No artifacts found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artifacts.map((artifact) => (
            <div key={artifact._id} className="card bg-white shadow hover:shadow-lg transition-shadow">
              <figure className="h-44 overflow-hidden">
                <img src={artifact.imageUrl} alt={artifact.artifactName} className="w-full h-full object-cover" />
              </figure>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-lg line-clamp-1">{artifact.artifactName}</h2>
                <p className="text-sm text-gray-500">Type: {artifact.artifactType}</p>
                <p className="text-sm text-gray-500">Location: {artifact.presentLocation}</p>
                <Link to={`/artifacts/${artifact._id}`} className="btn btn-sm mt-2 bg-emerald-400 hover:bg-emerald-500 text-white">View Detail</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllArtifacts 