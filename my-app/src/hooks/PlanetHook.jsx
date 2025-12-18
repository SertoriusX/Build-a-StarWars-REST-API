import { useContext, useEffect } from "react"
import { PlanetContext } from "../context/planets/PlanetContext"
import axios from "axios"


export const PlanetHook = (url) => {
    const { dispatch } = useContext(PlanetContext)


    const getPlanet = async () => {
        const res = await axios.get(`${url}/planet`)
        dispatch({ type: 'LOAD_PLANET', payload: res.data })
    }
    const addPlanet = async (data) => {
        const res = await axios.post(`${url}/planet`, data)
        dispatch({ type: 'ADD_PLANET', payload: res.data })
    }
    const updatePlanet = async (id, data) => {
        const res = await axios.put(`${url}/planet/${id}`, data)
        dispatch({ type: 'UPDATE_PLANET', payload: res.data })

    }
    const deletePlanet = async (id) => {
        await axios.delete(`${url}/planet/${id}`)
        dispatch({ type: 'DELETE_PLANET', payload: id })

    }

    useEffect(() => {
        getPlanet()
    }, [url])
    return { getPlanet, addPlanet, updatePlanet, deletePlanet }

}