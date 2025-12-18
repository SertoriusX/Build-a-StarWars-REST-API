import React, { useReducer } from 'react'
import { PeopleContext } from './PeopleContext'
export default function PeopleContextProvider({ children }) {
  const initialState = {
    peoples: []
  }
  function peopleState(state, action) {
    switch (action.type) {
      case "LOAD_PEOPLE":
        return { ...state, peoples: action.payload }
      case "ADD_PEOPLE":
        return { ...state, peoples: [...state.peoples, action.payload] }
      case "UPDATE_PEOPLE":
        return { ...state, peoples: state.peoples.map(p => p.id === action.payload.id ? action.payload : p) }
      case "DELETE_PEOPLE":
        return { ...state, peoples: state.peoples.filter(p => p.id !== action.payload) }
      default:
        return state;
    }

  }

  const [state, dispatch] = useReducer(peopleState, initialState)

  return (
    <div>
      <PeopleContext.Provider value={{ state, dispatch }}>
        {children}
      </PeopleContext.Provider>
    </div>
  )
}
