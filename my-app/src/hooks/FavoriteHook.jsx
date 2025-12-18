import { useContext, useEffect } from "react";
import axios from "axios";
import { FavoriteContext } from "../context/favorite/FavoriteContext";

const CURRENT_USER_ID = "1"; 

export const FavoriteHook = (url) => {
  const { dispatch } = useContext(FavoriteContext);

  const axiosConfig = {
    headers: { "X-User-ID": CURRENT_USER_ID },
  };

  const getFavorites = async () => {
    try {
      const res = await axios.get(`${url}/users/favorites`, axiosConfig);
      dispatch({ type: "LOAD_ALL_FAVORITE", payload: res.data });
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  const addFavoritePlanet = async (planetId) => {
    try {
      const res = await axios.post(`${url}/favorite/planet/${planetId}`, null, axiosConfig);
      dispatch({ type: "ADD_FAVORITE_PLANET", payload: res.data });
      return res.data;
    } catch (error) {
      console.error("Failed to add favorite planet:", error);
      throw error;
    }
  };

  const addFavoritePeople = async (peopleId) => {
    try {
      const res = await axios.post(`${url}/favorite/people/${peopleId}`, null, axiosConfig);
      dispatch({ type: "ADD_FAVORITE_PEOPLE", payload: res.data });
      return res.data;
    } catch (error) {
      console.error("Failed to add favorite people:", error);
      throw error;
    }
  };

  const addFavoriteVehicle = async (vehicleId) => {
    try {
      const res = await axios.post(`${url}/favorite/vehicle/${vehicleId}`, null, axiosConfig);
      dispatch({ type: "ADD_FAVORITE_VEHICLE", payload: res.data });
      return res.data;
    } catch (error) {
      console.error("Failed to add favorite vehicle:", error);
      throw error;
    }
  };

  const deleteFavorite = async (favoriteId) => {
    try {
      await axios.delete(`${url}/favorite/${favoriteId}`, axiosConfig);
      dispatch({ type: "REMOVE_FAVORITE", payload: favoriteId });
    } catch (error) {
      console.error("Failed to delete favorite:", error);
      throw error;
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return {
    getFavorites,
    addFavoritePlanet,
    addFavoritePeople,
    addFavoriteVehicle,
    deleteFavorite,
  };
};
