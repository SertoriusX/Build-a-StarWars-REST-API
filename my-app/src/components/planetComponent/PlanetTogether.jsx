import React, { useState, useEffect, useContext } from 'react'
import { UseEffectHook } from '../../hooks/UseEffectHook'
import { BaseUrl } from '../../api/BaseUrl'
import { useNavigate } from 'react-router-dom'
import { FavoriteHook } from '../../hooks/FavoriteHook'
import { FavoriteContext } from '../../context/favorite/FavoriteContext'

export default function PlanetTogether() {
  const navigate = useNavigate()
  const { data, loading, error } = UseEffectHook(`${BaseUrl}/planet`)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { state } = useContext(FavoriteContext)
  const { addFavoritePlanet, deleteFavorite } = FavoriteHook(BaseUrl)

  const [likedPlanets, setLikedPlanets] = useState(new Map())

  useEffect(() => {
    const map = new Map()
    state.getAllFavorite.forEach(fav => {
      if (fav.planet_id) {
        map.set(fav.planet_id, fav.id)
      }
    })
    setLikedPlanets(map)
  }, [state.getAllFavorite])

  if (loading) return <p>Loading planets...</p>
  if (error) return <p>Error loading planets</p>
  if (!Array.isArray(data) || data.length === 0) return <p>Planet not found</p>

  const nextPlanet = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
  }

  const prevPlanet = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    )
  }

  const currentPlanet = data[currentIndex]
  const isLiked = likedPlanets.has(currentPlanet.id)

  const toggleLike = async () => {
    try {
      if (isLiked) {
        const favoriteId = likedPlanets.get(currentPlanet.id)
        await deleteFavorite(favoriteId) 
        setLikedPlanets((prev) => {
          const newMap = new Map(prev)
          newMap.delete(currentPlanet.id)
          return newMap
        })
      } else {
        const newFavorite = await addFavoritePlanet(currentPlanet.id)
        setLikedPlanets((prev) => {
          const newMap = new Map(prev)
          newMap.set(currentPlanet.id, newFavorite.id)
          return newMap
        })
      }
    } catch (error) {
      console.error('Failed to toggle like:', error)
    }
  }

  return (
    <div className="container my-4 text-center">
      <h1 className="mb-4">PlanetTogether Slider</h1>

      <div className="card mx-auto" style={{ width: '20rem' }}>
        <div className="card-body">
          <h5 className="card-title">{currentPlanet.name}</h5>
          <p className="card-text">
            <strong>Diameter:</strong> {currentPlanet.diameter}
          </p>
          <p className="card-text">
            <strong>Climate:</strong> {currentPlanet.climate}
          </p>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate(`/planetDetail/${currentPlanet.id}`)}
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
        <button className="btn btn-outline-primary me-2" onClick={prevPlanet}>
          Previous
        </button>
        <button className="btn btn-outline-primary" onClick={nextPlanet}>
          Next
        </button>
      </div>
    </div>
  )
}
