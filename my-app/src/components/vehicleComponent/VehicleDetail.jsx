import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BaseUrl } from '../../api/BaseUrl'

export default function VehicleDetail() {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${BaseUrl}/vehicle/${id}`)
            .then((res) => setVehicle(res.data))
            .catch((err) => {
                console.error(err)
            })
    }, [id])

    if (!vehicle) {
        return <div className="text-center my-5"><p>Loading vehicle details...</p></div>
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
                <img 
                    src={vehicle.url} 
                    alt={vehicle.name} 
                    className="card-img-top" 
                    style={{ objectFit: 'cover', maxHeight: '300px' }}
                />
                <div className="card-body">
                    <h2 className="card-title">{vehicle.name}</h2>
                    {vehicle.description && <p className="card-text">{vehicle.description}</p>}
                    {vehicle.model && <p><strong>Model:</strong> {vehicle.model}</p>}
                    {vehicle.manufacturer && <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>}
                    {vehicle.cost_in_credits && <p><strong>Cost:</strong> {vehicle.cost_in_credits} credits</p>}
                    {vehicle.length && <p><strong>Length:</strong> {vehicle.length} meters</p>}
                </div>
            </div>
        </div>
    )
}
