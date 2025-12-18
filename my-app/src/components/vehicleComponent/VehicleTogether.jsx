import React, { useState, useEffect, useContext } from 'react'
import { UseEffectHook } from '../../hooks/UseEffectHook'
import { BaseUrl } from '../../api/BaseUrl'
import { useNavigate } from 'react-router-dom'
import { FavoriteHook } from '../../hooks/FavoriteHook'
import { FavoriteContext } from '../../context/favorite/FavoriteContext'

export default function VehicleTogether() {
  const navigate = useNavigate()
  const { data, loading, error } = UseEffectHook(`${BaseUrl}/vehicle`)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { state } = useContext(FavoriteContext)
  const { addFavoriteVehicle, deleteFavorite } = FavoriteHook(BaseUrl)

  const [likedVehicles, setLikedVehicles] = useState(new Map())

  useEffect(() => {
    if (!state || !state.getAllFavorite) return  
    const map = new Map()
    state.getAllFavorite.forEach(fav => {
      if (fav.vehicle_id) {
        map.set(fav.vehicle_id, fav.id)  
      }
    })
    setLikedVehicles(map)
  }, [state])

  if (loading) return <p>Loading vehicles...</p>
  if (error) return <p>Error loading vehicles</p>
  if (!Array.isArray(data) || data.length === 0) return <p>No vehicle found</p>

  const nextVehicle = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length)
  }

  const prevVehicle = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1))
  }

  const currentVehicle = data[currentIndex]
  const isLiked = likedVehicles.has(currentVehicle.id)

  const toggleLike = async () => {
    try {
      if (isLiked) {
        const favoriteId = likedVehicles.get(currentVehicle.id)
        await deleteFavorite(favoriteId)
        setLikedVehicles(prev => {
          const newMap = new Map(prev)
          newMap.delete(currentVehicle.id)
          return newMap
        })
      } else {
        const newFavorite = await addFavoriteVehicle(currentVehicle.id)
        setLikedVehicles(prev => {
          const newMap = new Map(prev)
          newMap.set(currentVehicle.id, newFavorite.id)
          return newMap
        })
      }
    } catch (error) {
      console.error('Failed to toggle like:', error)
    }
  }

  return (
    <div className="container my-4 text-center">
      <h1 className="mb-4">VehicleTogether Slider</h1>

      <div className="card mx-auto" style={{ width: '20rem' }}>
        <img
          src={currentVehicle.url}
          alt={currentVehicle.name}
          className="card-img-top"
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{currentVehicle.name}</h5>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate(`/vehicleDetail/${currentVehicle.id}`)}
          >
            See more
          </button>
          <br />
          <button
            onClick={toggleLike}
            className={`btn ${isLiked ? 'btn-danger' : 'btn-secondary'}`}
          >
            {isLiked ? 'Unlike ❤️' : 'Like ♡'}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-outline-primary me-2" onClick={prevVehicle}>
          Previous
        </button>
        <button className="btn btn-outline-primary" onClick={nextVehicle}>
          Next
        </button>
      </div>
    </div>
  )
}
