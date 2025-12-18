import React, { useState } from 'react'
import { VehicleHook } from '../../hooks/VehicleHook'
import { BaseUrl } from '../../api/BaseUrl'

export default function VehicleForm() {
  const [form, setForm] = useState({
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

  const { addVehicle } = VehicleHook(BaseUrl)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const onSendVehicle = async (e) => {
    e.preventDefault()
    try {
      await addVehicle(form)
      setForm({
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
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container my-4">
      <h2>Vehicle Form</h2>
      <form onSubmit={onSendVehicle}>
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
