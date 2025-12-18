import React, { useState, useEffect, useContext } from 'react';
import { UseEffectHook } from '../../hooks/UseEffectHook';
import { BaseUrl } from '../../api/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { FavoriteHook } from '../../hooks/FavoriteHook';
import { FavoriteContext } from '../../context/favorite/FavoriteContext';

export default function PeopleTogether() {
  const navigate = useNavigate();
  const { data, loading, error } = UseEffectHook(`${BaseUrl}/people`);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { state } = useContext(FavoriteContext);
  const { addFavoritePeople, deleteFavorite } = FavoriteHook(BaseUrl);

  const [likedPeople, setLikedPeople] = useState(new Map());

  useEffect(() => {
    const map = new Map();
    state.getAllFavorite.forEach(fav => {
      if (fav.people_id) {
        map.set(fav.people_id, fav.id); 
      }
    });
    setLikedPeople(map);
  }, [state.getAllFavorite]);

  if (loading) return <p>Loading people...</p>;
  if (error) return <p>Error loading people</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No people found</p>;

  const nextPerson = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const prevPerson = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const currentPerson = data[currentIndex];
  const isLiked = likedPeople.has(currentPerson.id);

  const toggleLike = async () => {
    try {
      if (isLiked) {
        const favoriteId = likedPeople.get(currentPerson.id);
        await deleteFavorite(favoriteId); 
        setLikedPeople(prev => {
          const newMap = new Map(prev);
          newMap.delete(currentPerson.id);
          return newMap;
        });
      } else {
        const newFavorite = await addFavoritePeople(currentPerson.id);
        setLikedPeople(prev => {
          const newMap = new Map(prev);
          newMap.set(currentPerson.id, newFavorite.id);
          return newMap;
        });
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <div className="container my-4 text-center">
      <h1 className="mb-4">PeopleTogether Slider</h1>
      <div className="card mx-auto" style={{ width: '20rem' }}>
        <img
          src={currentPerson.url}
          alt={currentPerson.name}
          className="card-img-top"
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{currentPerson.name}</h5>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate(`/peopleDetail/${currentPerson.id}`)}
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
        <button className="btn btn-outline-primary me-2" onClick={prevPerson}>
          Previous
        </button>
        <button className="btn btn-outline-primary" onClick={nextPerson}>
          Next
        </button>
      </div>
    </div>
  );
}
