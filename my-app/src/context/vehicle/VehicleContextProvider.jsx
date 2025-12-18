import React, { act, useReducer } from 'react'
import { VehicleContext } from './VehicleContext'
export default function VehicleContextProvider({ children }) {
  const initialState = {
    vehicles: []
  }
  function vehicleState(state, action) {
    switch (action.type) {
      case "LOAD_VEHICLE":
        return { ...state, vehicles: action.payload }
      case "ADD_VEHICLE":
        return { ...state, vehicles: [...state.vehicles, action.payload] }
      case "UPDATE_VEHICLE":
        return { ...state, vehicles: state.vehicles.map(v => v.id === action.payload.id ? action.payload : v) }
      case "DELETE_VEHICLE":
        return { ...state, vehicles: state.vehicles.filter(v => v.id !== action.payload) }


    }

  }

  const [state, dispatch] = useReducer(vehicleState, initialState)

  return (
    <div>
      <VehicleContext.Provider value={{ state, dispatch }}>
        {children}
      </VehicleContext.Provider>
    </div>
  )
}
