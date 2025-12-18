import React, { useState } from 'react'
import { PeopleHook } from '../../hooks/PeopleHook'
import { BaseUrl } from '../../api/BaseUrl'

export default function PeopleForm() {
    const { addPeople } = PeopleHook(BaseUrl)
    const [form, setForm] = useState({
        name: '', birth_year: '',
        eye_color: '', gender: '',
        hair_color: '', height: '',
        mass: '', skin_color: '',
        homeworld: '', url: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }
    const onSubmitPeople = async (e) => {
        e.preventDefault()
        await addPeople(form)
        setForm({
            name: '', birth_year: '',
            eye_color: '', gender: '',
            hair_color: '', height: '',
            mass: '', skin_color: '',
            homeworld: '', url: ''
        })
    }

    return (
        <div className="container my-4">
            <h2 className="mb-3">Add New Person</h2>
            <form onSubmit={onSubmitPeople}>
                <div className="row g-3">
                    {[
                        { name: 'name', placeholder: 'Name' },
                        { name: 'birth_year', placeholder: 'Birth Year' },
                        { name: 'eye_color', placeholder: 'Eye Color' },
                        { name: 'gender', placeholder: 'Gender' },
                        { name: 'hair_color', placeholder: 'Hair Color' },
                        { name: 'height', placeholder: 'Height' },
                        { name: 'mass', placeholder: 'Mass' },
                        { name: 'skin_color', placeholder: 'Skin Color' },
                        { name: 'homeworld', placeholder: 'Homeworld URL' },
                        { name: 'url', placeholder: 'Image URL' },
                    ].map(({ name, placeholder }) => (
                        <div className="col-md-6" key={name}>
                            <input
                                type="text"
                                className="form-control"
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                required={name === 'name'}
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
