import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { getAllArtifacts } from '../services/artifactApi.js'
import useTitle from '../hooks/useTitle.jsx'
import Loader from '../components/Loader.jsx'

const parseFilters = (searchString) => {
  const params = new URLSearchParams(searchString)
  return {
    search: params.get('search') || '',
    type: params.get('type') || '',
    location: params.get('location') || '',
    likesMin: params.get('likesMin') || '',
    likesMax: params.get('likesMax') || '',
    createdFrom: params.get('createdFrom') || '',
    createdTo: params.get('createdTo') || '',
  }
}

const AllArtifacts = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [artifacts, setArtifacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState(() => parseFilters(location.search))
  const [formValues, setFormValues] = useState(() => parseFilters(location.search))

  useEffect(() => {
    const next = parseFilters(location.search)
    setFormValues(next)
    setFilters((prev) => {
      const isSame = Object.keys(prev).every((key) => prev[key] === next[key])
      return isSame ? prev : next
    })
  }, [location.search])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getAllArtifacts(filters)
        setArtifacts(data)
      } catch {
        setArtifacts([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [filters])

  const updateFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    const pending = {
      search: formValues.search.trim(),
      type: formValues.type,
      location: formValues.location.trim(),
      likesMin: formValues.likesMin,
      likesMax: formValues.likesMax,
      createdFrom: formValues.createdFrom,
      createdTo: formValues.createdTo,
    }

    Object.entries(pending).forEach(([key, value]) => {
      const stringValue = typeof value === 'string' ? value.trim() : value
      if (stringValue) params.set(key, stringValue)
    })

    const qs = params.toString()
    navigate(`/artifacts${qs ? `?${qs}` : ''}`)
  }

  const handleReset = () => {
    const cleared = {
      search: '',
      type: '',
      location: '',
      likesMin: '',
      likesMax: '',
      createdFrom: '',
      createdTo: '',
    }
    setFormValues(cleared)
    navigate('/artifacts')
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
      <form onSubmit={handleSubmit} className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={formValues.search}
          onChange={(e)=>updateFormValue('search', e.target.value)}
          className="input input-bordered w-full"
        />
        <select
          className="select select-bordered w-full"
          value={formValues.type}
          onChange={(e)=>updateFormValue('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Tools">Tools</option>
          <option value="Weapons">Weapons</option>
          <option value="Documents">Documents</option>
          <option value="Writings">Writings</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Pottery">Pottery</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={formValues.location}
          onChange={(e)=>updateFormValue('location', e.target.value)}
          className="input input-bordered w-full"
        />
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min Likes"
            value={formValues.likesMin}
            onChange={(e)=>updateFormValue('likesMin', e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            min="0"
            placeholder="Max Likes"
            value={formValues.likesMax}
            onChange={(e)=>updateFormValue('likesMax', e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Created From (Year)"
            value={formValues.createdFrom}
            onChange={(e)=>updateFormValue('createdFrom', e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Created To (Year)"
            value={formValues.createdTo}
            onChange={(e)=>updateFormValue('createdTo', e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-2">
          <button className="btn bg-emerald-400 hover:bg-emerald-500 text-white" type="submit">Apply</button>
          <button type="button" onClick={handleReset} className="btn btn-outline">Reset</button>
        </div>
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