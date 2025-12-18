from flask import  request, jsonify
from .vehicle_service import VehicleService
from core.models import vehicle_dict
from core import app



@app.route('/vehicle',methods=['GET'])
def get_all_vehicle():
    service = VehicleService()
    vehicle=service.get_all_vehicle()
    return jsonify(vehicle)



@app.route('/vehicle/<string:id>',methods=['GET'])
def get_id_vehicle(id):
    service = VehicleService()
    get_by_id_vehicle=service.get_by_id_vehicle(id)
    return jsonify(vehicle_dict(get_by_id_vehicle))

@app.route('/vehicle',methods=['POST'])
def add_vehicle():
    data=request.get_json()
    service=VehicleService()
    adds_vehicle=service.create_vehicle(data)
    return jsonify(vehicle_dict(adds_vehicle))

@app.route('/vehicle/<string:id>',methods=['PUT'])
def upd_vehicle(id):
    data=request.get_json()
    service=VehicleService()
    update_vehicle=service.update_vehicle(data,id)
    if update_vehicle:
        return jsonify({'msg':'Vehicle succesfully updated'})
    else:
        return jsonify({'msg':'Vehicle not founded'})

@app.route('/vehicle/<string:id>',methods=['DELETE'])
def delete_vehicle(id):
    service=VehicleService()
    update_vehicle=service.delete_vehicle(id)
    if update_vehicle:
        return jsonify({'msg':'Vehicle succesfully deleted'})
    else:
        return jsonify({'msg':'Vehicle not founded'})