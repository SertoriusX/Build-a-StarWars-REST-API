from core.models import Favorite,favorite_dict
from core import db

class FavoriteService:
    @staticmethod
    def get_all_favorite():
        favorites = Favorite.query.order_by(Favorite.id.asc()).all()
        return [favorite_dict(fav) for fav in favorites]

    @staticmethod
    def get_favorite_id(id):
        return Favorite.query.filter_by(id=id).first()

    @staticmethod
    def add_favorite(user_id, people_id=None, vehicle_id=None, planet_id=None):
        new_favorite = Favorite(
            user_id=user_id,
            people_id=people_id,
            vehicle_id=vehicle_id,
            planet_id=planet_id
        )
        db.session.add(new_favorite)
        db.session.commit()
        return new_favorite

    @staticmethod
    def remove_favorite(id):
        favorite = Favorite.query.filter_by(id=id).first()
        if not favorite:
            return False
        db.session.delete(favorite)
        db.session.commit()
        return True