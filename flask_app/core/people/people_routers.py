from flask import  request, jsonify
from .people_service import PersonService
from core.models import person_dict
from core import app



@app.route('/people',methods=['GET'])
def get_all_people():
    service=PersonService()
    people=service.get_all_people()
    return jsonify(people)

@app.route('/people/<string:id>',methods=['GET'])
def get_id_people(id):
    service=PersonService()
    people=service.get_all_id_people(id)
    return jsonify(person_dict(people))

@app.route('/people',methods=['POST'])
def create_people():
    data=request.get_json()
    service=PersonService()
    people=service.add_people(data)
    return jsonify(person_dict(people))

@app.route('/people/<string:id>',methods=['PUT'])
def update_people(id):
    data=request.get_json()
    service=PersonService()
    upd_people=service.edit_people(data,id)
    if upd_people:
        return jsonify({'msg':'People successfully updated'})
    else:
        return jsonify({'msg':'People is not founded'})
@app.route('/people/<string:id>',methods=['DELETE'])
def delete_people(id):
    service=PersonService()
    delete_people=service.del_people(id)
    if delete_people:
        return jsonify({'msg':'People successfully deleted'})
    else:
        return jsonify({'msg':'People is not founded'})