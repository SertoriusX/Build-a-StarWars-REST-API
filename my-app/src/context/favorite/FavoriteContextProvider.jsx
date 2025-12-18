import React, { useReducer } from "react";
import { FavoriteContext } from "./FavoriteContext";

const initialState = {
  getAllFavorite: [],
  favoritesPeople: [],
  favoritesPlanet: [],
  favoritesVehicle: []
};
function favoriteReducer(state, action) {
  switch (action.type) {
    case "LOAD_ALL_FAVORITE":
      const normalizedFavorites = action.payload.map(fav => {
        if (fav.people_id) {
          return { ...fav, type: "people", name: fav.people_name || "Unknown Person" };
        } else if (fav.planet_id) {
          return { ...fav, type: "planet", name: fav.planet_name || "Unknown Planet" };
        } else if (fav.vehicle_id) {
          return { ...fav, type: "vehicle", name: fav.vehicle_name || "Unknown Vehicle" };
        }
        return { ...fav, type: "unknown", name: "Unknown" };
      });

      return {
        ...state,
        getAllFavorite: normalizedFavorites,
        favoritesPeople: normalizedFavorites.filter(f => f.type === "people"),
        favoritesPlanet: normalizedFavorites.filter(f => f.type === "planet"),
        favoritesVehicle: normalizedFavorites.filter(f => f.type === "vehicle")
      };

    case "ADD_FAVORITE_PEOPLE": {
      const fav = {
        ...action.payload,
        type: "people",
        name: action.payload.people_name || "Unknown Person"
      };
      return {
        ...state,
        favoritesPeople: [...state.favoritesPeople, fav],
        getAllFavorite: [...state.getAllFavorite, fav]
      };
    }

    case "ADD_FAVORITE_PLANET": {
      const fav = {
        ...action.payload,
        type: "planet",
        name: action.payload.planet_name || "Unknown Planet"
      };
      return {
        ...state,
        favoritesPlanet: [...state.favoritesPlanet, fav],
        getAllFavorite: [...state.getAllFavorite, fav]
      };
    }

    case "ADD_FAVORITE_VEHICLE": {  
      const fav = {
        ...action.payload,
        type: "vehicle",
        name: action.payload.vehicle_name || "Unknown Vehicle"
      };
      return {
        ...state,
        favoritesVehicle: [...state.favoritesVehicle, fav],
        getAllFavorite: [...state.getAllFavorite, fav]
      };
    }

    case "REMOVE_FAVORITE":
      return {
        ...state,
        getAllFavorite: state.getAllFavorite.filter(f => f.id !== action.payload),
        favoritesPeople: state.favoritesPeople.filter(f => f.id !== action.payload),
        favoritesPlanet: state.favoritesPlanet.filter(f => f.id !== action.payload),
        favoritesVehicle: state.favoritesVehicle.filter(f => f.id !== action.payload)
      };

    default:
      return state;
  }
}

export default function FavoriteContextProvider({ children }) {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
}
