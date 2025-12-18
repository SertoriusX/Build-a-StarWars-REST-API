from flask import request,jsonify
from .favorite_service import FavoriteService
from core import app
from core.models import favorite_dict
@app.route('/users/favorites', methods=['GET'])
def get_user_favorites():
    service = FavoriteService()
    favorites = service.get_all_favorite()
    return jsonify(favorites)


@app.route('/favorite/planet/<string:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id):
    user_id = request.headers.get('X-User-ID')
    if not user_id:
        return jsonify({'msg': 'User ID header missing'}), 400

    service = FavoriteService()
    favorite = service.add_favorite(user_id=user_id, planet_id=planet_id)
    return jsonify(favorite_dict(favorite)), 201


@app.route('/favorite/people/<string:people_id>', methods=['POST'])
def add_favorite_people(people_id):
    user_id = request.headers.get('X-User-ID')
    if not user_id:
        return jsonify({'msg': 'User ID header missing'}), 400

    service = FavoriteService()
    favorite = service.add_favorite(user_id=user_id, people_id=people_id)
    return jsonify(favorite_dict(favorite)), 201


@app.route('/favorite/vehicle/<string:vehicle_id>', methods=['POST'])
def add_favorite_vehicle(vehicle_id):
    user_id = request.headers.get('X-User-ID')
    if not user_id:
        return jsonify({'msg': 'User ID header missing'}), 400

    service = FavoriteService()
    favorite = service.add_favorite(user_id=user_id, vehicle_id=vehicle_id)
    return jsonify(favorite_dict(favorite)), 201


@app.route('/favorite/<string:id>', methods=['DELETE'])
def delete_favorite(id):
    service = FavoriteService()
    deleted = service.remove_favorite(id)
    if deleted:
        return jsonify({'msg': 'Favorite deleted successfully'}), 200
    else:
        return jsonify({'msg': 'Favorite not found'}), 404