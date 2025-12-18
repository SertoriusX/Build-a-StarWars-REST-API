import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FavoriteContext } from "../context/favorite/FavoriteContext";
import { FavoriteHook } from "../hooks/FavoriteHook";
import { BaseUrl } from "../api/BaseUrl";

export default function Navbar() {
  const { state, dispatch } = useContext(FavoriteContext);
  const { deleteFavorite } = FavoriteHook(BaseUrl);

  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);

  const getFavoriteNameAndType = (fav) => {
    if (fav.people_name) return { name: fav.people_name, type: "people" };
    if (fav.planet_name) return { name: fav.planet_name, type: "planet" };
    if (fav.vehicle_name) return { name: fav.vehicle_name, type: "vehicle" };
    return { name: "Unknown", type: "unknown" };
  };

  const removeFavorite = async (fav) => {
    setError(null);
    setLoadingId(fav.id);
    try {
      await deleteFavorite(fav.id); 
      dispatch({ type: "REMOVE_FAVORITE", payload: fav.id });
    } catch (err) {
      setError("Failed to remove favorite");
      console.error("Failed to remove favorite:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          StarWars App
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink
                to="/people"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                People
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/planet"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Planet
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/vehicle"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Vehicle
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/together"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                See All
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                id="favoritesDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="button"
                style={{ textDecoration: "none" }}
              >
                ⭐ Favorites ({state.getAllFavorite.length})
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="favoritesDropdown"
              >
                {state.getAllFavorite.length === 0 ? (
                  <li className="dropdown-item text-muted">No favorites yet</li>
                ) : (
                  state.getAllFavorite.map((fav) => {
                    const { name, type } = getFavoriteNameAndType(fav);
                    return (
                      <li
                        key={`${type}-${fav.id}`}
                        className="dropdown-item d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {name} ({type})
                        </span>
                        <button
                          className="btn btn-sm btn-danger"
                          disabled={loadingId === fav.id}
                          onClick={(e) => {
                            e.preventDefault();
                            removeFavorite(fav);
                          }}
                        >
                          {loadingId === fav.id ? "..." : "❌"}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </li>
          </ul>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </nav>
  );
}
