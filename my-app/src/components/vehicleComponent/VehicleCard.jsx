import React, { useContext, useState } from 'react'
import { VehicleContext } from '../../context/vehicle/VehicleContext'
import { VehicleHook } from '../../hooks/VehicleHook'
import { BaseUrl } from '../../api/BaseUrl'

export default function VehicleCard() {
  const { state } = useContext(VehicleContext)
  const { updateVehicle, deleteVehicle } = VehicleHook(BaseUrl)
  const [isEdit, setIsEdit] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    model: '',
    vehicle_class: '',
    manufacturer: '',
    length: '',
    cost_in_credits: '',
    crew: '',
    max_atmosphering_speed: '',
    cargo_capacity: '',
    consumables: '',
    url: ''
  })

  const startEdit = (vehicle) => {
    setIsEdit(vehicle.id)
    setEditForm({
      name: vehicle.name || '',
      model: vehicle.model || '',
      vehicle_class: vehicle.vehicle_class || '',
      manufacturer: vehicle.manufacturer || '',
      length: vehicle.length || '',
      cost_in_credits: vehicle.cost_in_credits || '',
      crew: vehicle.crew || '',
      max_atmosphering_speed: vehicle.max_atmosphering_speed || '',
      cargo_capacity: vehicle.cargo_capacity || '',
      consumables: vehicle.consumables || '',
      url: vehicle.url || ''
    })
  }

  const handleChangeEdit = (e) => {
    const { name, value } = e.target
    setEditForm({ ...editForm, [name]: value })
  }

  const saveEdit = async (e) => {
    e.preventDefault()
    try {
      await updateVehicle(isEdit, editForm)
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
      {state.vehicles.length === 0 && <p>No vehicles found</p>}

      {state.vehicles.map((vehicle) =>
        isEdit === vehicle.id ? (
          <form key={vehicle.id} onSubmit={saveEdit} className="border p-3 mb-3 rounded">
            <div className="row g-3">
              {[
                { label: 'Name', name: 'name' },
                { label: 'Model', name: 'model' },
                { label: 'Vehicle Class', name: 'vehicle_class' },
                { label: 'Manufacturer', name: 'manufacturer' },
                { label: 'Length', name: 'length' },
                { label: 'Cost in Credits', name: 'cost_in_credits' },
                { label: 'Crew', name: 'crew' },
                { label: 'Max Atmosphering Speed', name: 'max_atmosphering_speed' },
                { label: 'Cargo Capacity', name: 'cargo_capacity' },
                { label: 'Consumables', name: 'consumables' },
                { label: 'URL', name: 'url' }
              ].map(({ label, name }) => (
                <div className="col-md-6" key={name}>
                  <label htmlFor={name} className="form-label">
                    {label}
                  </label>
                  <input
                    type="text"
                    id={name}
                    name={name}
                    className="form-control"
                    value={editForm[name]}
                    onChange={handleChangeEdit}
                    placeholder={label}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-success me-2">
                Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div
            key={vehicle.id}
            className="d-flex justify-content-between align-items-center border p-3 mb-3 rounded"
          >
            <div>{vehicle.name}</div>
            <div>
              <button className="btn btn-primary btn-sm me-2" onClick={() => startEdit(vehicle)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteVehicle(vehicle.id)}>
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  )
}
