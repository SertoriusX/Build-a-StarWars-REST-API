from flask import  request, jsonify
from .planet_service import PlanetService
from core.models import planet_dict
from core import app


@app.route('/planet',methods=['GET'])
def get_all_planet():
    service=PlanetService()
    planet=service.get_all_planets()
    return jsonify(planet)


@app.route('/planet/<string:id>',methods=['GET'])
def get_by_id_planet(id):
    service=PlanetService()
    planet=service.get_planet_by_id(id)
    return jsonify(planet)

@app.route('/planet', methods=['POST'])
def create_planet():
    data=request.get_json()
    service=PlanetService()
    planet=service.create_planet(data)
    return jsonify(planet_dict(planet))

@app.route('/planet/<string:id>',methods=['PUT'])
def update_planet(id):
    data=request.get_json()
    service=PlanetService()
    update_planet=service.update_planet(data,id)
    if update_planet:
        return jsonify({'msg':'Planet successfully updated'})
    else:
        return jsonify({'msg':'Planet not found'})


@app.route('/planet/<string:id>',methods=['DELETE'])
def delete_planet(id):
    service=PlanetService()
    delete_planets=service.delete_planet(id)
    if delete_planets:
        return jsonify({'msg':'Planet successfully deleted'})
    else:
        return jsonify({'msg':'Planet not found'})