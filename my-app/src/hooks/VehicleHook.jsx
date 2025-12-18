import axios from "axios"
import { VehicleContext } from "../context/vehicle/VehicleContext"
import { useContext, useEffect } from "react"


export const VehicleHook = (url) => {
    const { dispatch } = useContext(VehicleContext)


    const getVehicle = async () => {
        const res = await axios.get(`${url}/vehicle`)
        dispatch({ type: 'LOAD_VEHICLE', payload: res.data })
    }
    const addVehicle = async (data) => {
        const res = await axios.post(`${url}/vehicle`, data)
        dispatch({ type: 'ADD_VEHICLE', payload: res.data })
    }
    const updateVehicle = async (id, data) => {
        const res = await axios.put(`${url}/vehicle/${id}`, data)
        dispatch({ type: 'UPDATE_VEHICLE', payload: res.data })
    }

    const deleteVehicle = async (id) => {
        await axios.delete(`${url}/vehicle/${id}`)
        dispatch({ type: 'DELETE_VEHICLE', payload: id })
    }

    useEffect(() => {
        getVehicle()
    }, [])
    return { getVehicle, addVehicle, updateVehicle, deleteVehicle }
}