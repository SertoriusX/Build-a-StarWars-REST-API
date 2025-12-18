import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BaseUrl } from '../../api/BaseUrl'
import axios from 'axios'

export default function PlanetDetail() {
    const { id } = useParams()
    const [planet, setPlanet] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${BaseUrl}/planet/${id}`)
            .then((res) => setPlanet(res.data))
            .catch((err) => {
                console.error(err)
            })
    }, [id])

    if (!planet) {
        return <div className="text-center my-5"><p>Loading planet details...</p></div>
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
                {planet.url && (
                    <img 
                        src={planet.url} 
                        alt={planet.name} 
                        className="card-img-top" 
                        style={{ objectFit: 'cover', maxHeight: '300px' }}
                    />
                )}
                <div className="card-body">
                    <h2 className="card-title">{planet.name}</h2>
                    <p><strong>Diameter:</strong> {planet.diameter}</p>
                    <p><strong>Climate:</strong> {planet.climate}</p>
                    <p><strong>Terrain:</strong> {planet.terrain}</p>
                </div>
            </div>
        </div>
    )
}
