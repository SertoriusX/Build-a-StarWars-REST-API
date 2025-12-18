from flask import request,jsonify
from .user_service import UserService
from core.models import  user_dict
from core import app



@app.route('/user',methods=['GET'])
def get_users():
    service=UserService()
    users=service.get_all_user()
    return jsonify(users)


@app.route('/user/<string:id>',methods=['GET'])
def get_user_by_id(id):
    service=UserService()
    user=service.get_user_by_id(id)
    return jsonify(user_dict(user))

@app.route('/user',methods=['POST'])
def create_user():
    data=request.get_json()
    service=UserService()
    new_user=service.create_user(data)
    return jsonify(user_dict(new_user))


@app.route('/user/<string:id>',methods=['PUT'])
def update_user(id):
    data=request.get_json()
    service=UserService()
    update_users=service.update_user(data,id)
    if update_users:
        return jsonify({'message': 'User updated successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404
    
@app.route('/user/<string:id>',methods=['DELETE'])
def delete_user(id):
    service=UserService()
    delete_user=service.delete_user(id)
    if delete_user:
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404