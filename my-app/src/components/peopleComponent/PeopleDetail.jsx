import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BaseUrl } from '../../api/BaseUrl'

export default function PeopleDetail() {
    const { id } = useParams()
    const [person, setPerson] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${BaseUrl}/people/${id}`)
            .then((res) => setPerson(res.data))
            .catch((err) => {
                console.error(err)
            })
    }, [id])

    if (!person) {
        return <div className="text-center my-5"><p>Loading person details...</p></div>
    }

    return (
        <div className="container my-5">
            <button
                className="btn btn-secondary mb-4"
                onClick={() => navigate('/together')}
            >
                &larr; Back to Home page
            </button>

            <div className="card mx-auto" style={{ maxWidth: '500px' }}>
                {person.url && (
                    <img
                        src={person.url}
                        alt={person.name}
                        className="card-img-top"
                        style={{ objectFit: 'cover', maxHeight: '300px' }}
                    />
                )}
                <div className="card-body text-center">
                    <h2 className="card-title">{person.name}</h2>
                    <p><strong>Gender:</strong> {person.gender}</p>
                    <p><strong>Birth Year:</strong> {person.birth_year}</p>
                    <p><strong>Height:</strong> {person.height} cm</p>
                    <p><strong>Mass:</strong> {person.mass} kg</p>
                </div>
            </div>
        </div>
    )
}
