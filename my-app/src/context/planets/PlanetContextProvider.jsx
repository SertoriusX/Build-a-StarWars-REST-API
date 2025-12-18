import React, { useReducer } from 'react'
import { PlanetContext } from './PlanetContext'
export default function PlanetContextProvider({ children }) {
  const initialState = {
    planets: []
  }
  function planetState(state, action) {
    switch (action.type) {
      case "LOAD_PLANET":
        return { ...state, planets: action.payload }
      case "ADD_PLANET":
        return { ...state, planets: [...state.planets, action.payload] }
      case "UPDATE_PLANET":
        return { ...state, planets: state.planets.map(p => p.id === action.payload.id ? action.payload : p) }
      case "DELETE_PLANET":
        return { ...state, planets: state.planets.filter(p => p.id !== action.payload) }

    }
  }
  const [state, dispatch] = useReducer(planetState, initialState)

  return (
    <div>
      <PlanetContext.Provider value={{ state, dispatch }}>
        {children}
      </PlanetContext.Provider>
    </div>
  )
}
