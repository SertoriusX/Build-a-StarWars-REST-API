import React, { useState } from 'react'
import { PlanetHook } from '../../hooks/PlanetHook'
import { BaseUrl } from '../../api/BaseUrl'

export default function PlanetForm() {
  const { addPlanet } = PlanetHook(BaseUrl)
  const [form, setForm] = useState({
    name: '',
    diameter: '',
    rotation_period: '',
    orbital_period: '',
    gravity: '',
    population: '',
    climate: '',
    terrain: '',
    surface_water: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const onSendPlanet = async (e) => {
    e.preventDefault()
    try {
      await addPlanet(form)
      setForm({
        name: '',
        diameter: '',
        rotation_period: '',
        orbital_period: '',
        gravity: '',
        population: '',
        climate: '',
        terrain: '',
        surface_water: ''
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container my-4">
      <h2>PlanetForm</h2>
      <form onSubmit={onSendPlanet}>
        <div className="row g-3">
          {[
            { label: 'Name', name: 'name' },
            { label: 'Diameter', name: 'diameter' },
            { label: 'Rotation Period', name: 'rotation_period' },
            { label: 'Orbital Period', name: 'orbital_period' },
            { label: 'Gravity', name: 'gravity' },
            { label: 'Population', name: 'population' },
            { label: 'Climate', name: 'climate' },
            { label: 'Terrain', name: 'terrain' },
            { label: 'Surface Water', name: 'surface_water' }
          ].map(({ label, name }) => (
            <div className="col-md-6" key={name}>
              <label htmlFor={name} className="form-label">
                {label}
              </label>
              <input
                type="text"
                className="form-control"
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={label}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  )
}
