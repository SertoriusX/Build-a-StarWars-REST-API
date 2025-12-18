import React, { useContext, useState } from 'react';
import { PeopleContext } from '../../context/people/PeopleContext';
import { PeopleHook } from '../../hooks/PeopleHook';
import { BaseUrl } from '../../api/BaseUrl';

export default function PeopleCard() {
  const { state } = useContext(PeopleContext);
  const [isEdit, setIsEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    birth_year: '',
    eye_color: '',
    gender: '',
    hair_color: '',
    height: '',
    mass: '',
    skin_color: '',
    homeworld: '',
    url: '',
  });

  const { updatePeople, deletePeople } = PeopleHook(BaseUrl);

  const startEdit = (person) => {
    setIsEdit(person.id);
    setEditForm({
      name: person.name || '',
      birth_year: person.birth_year || '',
      eye_color: person.eye_color || '',
      gender: person.gender || '',
      hair_color: person.hair_color || '',
      height: person.height || '',
      mass: person.mass || '',
      skin_color: person.skin_color || '',
      homeworld: person.homeworld || '',
      url: person.url || '',
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      await updatePeople(isEdit, editForm);
      setIsEdit(null);
    } catch (error) {
      console.error('Failed to save edit', error);
    }
  };

  const cancelEdit = () => {
    setIsEdit(null);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">PeopleCard</h2>

      {state.peoples.length === 0 && <p>No people found</p>}

      <div className="row">
        {state.peoples.map((people) => (
          <div key={people.id} className="col-md-6 mb-4">
            <div className="card p-3 h-100">
              {isEdit === people.id ? (
                <>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="name"
                      className="form-control mb-2"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      name="birth_year"
                      className="form-control mb-2"
                      value={editForm.birth_year}
                      onChange={handleEditChange}
                      placeholder="Birth Year"
                    />
                    <input
                      type="text"
                      name="eye_color"
                      className="form-control mb-2"
                      value={editForm.eye_color}
                      onChange={handleEditChange}
                      placeholder="Eye Color"
                    />
                    <input
                      type="text"
                      name="gender"
                      className="form-control mb-2"
                      value={editForm.gender}
                      onChange={handleEditChange}
                      placeholder="Gender"
                    />
                    <input
                      type="text"
                      name="hair_color"
                      className="form-control mb-2"
                      value={editForm.hair_color}
                      onChange={handleEditChange}
                      placeholder="Hair Color"
                    />
                    <input
                      type="text"
                      name="height"
                      className="form-control mb-2"
                      value={editForm.height}
                      onChange={handleEditChange}
                      placeholder="Height"
                    />
                    <input
                      type="text"
                      name="mass"
                      className="form-control mb-2"
                      value={editForm.mass}
                      onChange={handleEditChange}
                      placeholder="Mass"
                    />
                    <input
                      type="text"
                      name="skin_color"
                      className="form-control mb-2"
                      value={editForm.skin_color}
                      onChange={handleEditChange}
                      placeholder="Skin Color"
                    />
                    <input
                      type="text"
                      name="homeworld"
                      className="form-control mb-2"
                      value={editForm.homeworld}
                      onChange={handleEditChange}
                      placeholder="Homeworld URL"
                    />
                    <input
                      type="text"
                      name="url"
                      className="form-control mb-2"
                      value={editForm.url}
                      onChange={handleEditChange}
                      placeholder="URL"
                    />
                  </div>
                  <div>
                    <button className="btn btn-success me-2" onClick={saveEdit}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="card-title">{people.name}</h5>
                  <p className="card-text">Birth Year: {people.birth_year}</p>
                  <div>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => startEdit(people)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePeople(people.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
