from core.models import User, user_dict
from core import db
class UserService:
    @staticmethod
    def get_all_user():
        users= User.query.order_by(User.id.asc()).all()
        user_list=[user_dict(user)for user in users]
        return user_list
    
    @staticmethod
    def get_user_by_id(id):
        user =User.query.filter_by(id=id).first()
        return user
    @staticmethod
    def create_user(data):
        username=data['username']
        password=data['password']
        full_name=data['full_name']
        email=data['email']
        new_user=User(username=username,password=password,full_name=full_name,email=email)
        db.session.add(new_user)
        db.session.commit()
        return new_user
    
    @staticmethod
    def update_user(data,id):
        username=data['username']
        password=data['password']
        full_name=data['full_name']
        email=data['email']
        user =User.query.filter_by(id=id).first()
        if username:
            user.username=username
        if password:
            user.password=password
        if full_name:
            user.full_name=full_name
        if email:
            user.emaail=email
        db.session.commit()
        return user
    
    @staticmethod
    def delete_user(id):
        user =User.query.filter_by(id=id).first()
        if not user:
            return False
        db.session.delete(user)
        db.session.commit()
        return True
