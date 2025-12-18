
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { PeopleContext } from '../context/people/PeopleContext'
export const PeopleHook = (url) => {
    const { dispatch } = useContext(PeopleContext)
    const getPeople = async () => {
        const res = await axios.get(`${url}/people`)
        dispatch({ type: "LOAD_PEOPLE", payload: res.data })
    }
    const addPeople = async (data) => {
        const res = await axios.post(`${url}/people`, data)
        dispatch({ type: "ADD_PEOPLE", payload: res.data })
    }
    const updatePeople = async (id, data) => {
        const res = await axios.put(`${url}/people/${id}`, data);
        dispatch({ type: "UPDATE_PEOPLE", payload: res.data });
    };
    const deletePeople = async (id) => {
        await axios.delete(`${url}/people/${id}`)
        dispatch({ type: "DELETE_PEOPLE", payload: id })

    }
    useEffect(() => {
        getPeople()
    }, [url])

    return { getPeople, addPeople, updatePeople, deletePeople }

}