import React, { useContext, useState } from 'react'
import { PlanetContext } from '../../context/planets/PlanetContext'
import { PlanetHook } from '../../hooks/PlanetHook'
import { BaseUrl } from '../../api/BaseUrl'

export default function PlanetCard() {
  const { state } = useContext(PlanetContext)
  const { updatePlanet, deletePlanet } = PlanetHook(BaseUrl)
  const [isEdit, setIsEdit] = useState(null)
  const [editForm, setEditForm] = useState({
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

  const startEdit = (planet) => {
    setIsEdit(planet.id)
    setEditForm({
      name: planet.name || '',
      diameter: planet.diameter || '',
      rotation_period: planet.rotation_period || '',
      orbital_period: planet.orbital_period || '',
      gravity: planet.gravity || '',
      population: planet.population || '',
      climate: planet.climate || '',
      terrain: planet.terrain || '',
      surface_water: planet.surface_water || ''
    })
  }

  const handleEditForm = (e) => {
    const { name, value } = e.target
    setEditForm({ ...editForm, [name]: value })
  }

  const saveEdit = async () => {
    try {
      await updatePlanet(isEdit, editForm)
      setIsEdit(null)
    } catch (err) {
      console.error(err)
    }
  }

  const cancelEdit = () => {
    setIsEdit(null)
  }

  return (
    <div className="container my-4">
      {state.planets.length === 0 && <p>No planet found</p>}

      {state.planets.map((planet) =>
        isEdit === planet.id ? (
          <div key={planet.id} className="card mb-3 p-3">
            <div className="row g-2">
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
                  <label className="form-label">{label}</label>
                  <input
                    type="text"
                    className="form-control"
                    name={name}
                    value={editForm[name]}
                    onChange={handleEditForm}
                    placeholder={label}
                  />
                </div>
              ))}
            </div>

            <div className="mt-3">
              <button className="btn btn-success me-2" onClick={saveEdit}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div key={planet.id} className="d-flex justify-content-between align-items-center mb-2 p-3 border rounded">
            <div>{planet.name}</div>
            <div>
              <button className="btn btn-primary btn-sm me-2" onClick={() => startEdit(planet)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => deletePlanet(planet.id)}>
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  )
}
