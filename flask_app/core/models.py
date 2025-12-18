from core import db
from uuid import uuid4
from datetime import datetime

def get_uuid():
    return uuid4().hex


class User(db.Model):
    id=db.Column(db.String(32),primary_key=True,default=get_uuid)
    username = db.Column(db.String(40), nullable=False, unique=True)
    password = db.Column(db.String(40), nullable=False)
    full_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    favorites = db.relationship('Favorite', backref='user', lazy=True)
    
    def __init__(self,username,password,full_name,email):
        self.username=username
        self.password=password
        self.full_name=full_name
        self.email=email
def user_dict(user):
    return{
        'id':user.id,
        'username':user.username,
        'full_name':user.full_name,
        "email":user.email
    }

class Planet(db.Model):     
    id = db.Column(db.String(32), primary_key=True,default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    diameter = db.Column(db.String(100), nullable=False)
    rotation_period = db.Column(db.String(100), nullable=False)
    orbital_period = db.Column(db.String(100), nullable=False)
    gravity = db.Column(db.String(100), nullable=False)
    population = db.Column(db.String(100), nullable=False)
    climate = db.Column(db.String(100), nullable=False)
    terrain = db.Column(db.String(100), nullable=False)
    surface_water = db.Column(db.String(100), nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    edited = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    favorites = db.relationship('Favorite', backref='planet', lazy=True)   
    def __init__(self,name,diameter,rotation_period,orbital_period,gravity,population,climate,terrain,surface_water):
        self.name=name
        self.diameter=diameter
        self.rotation_period=rotation_period
        self.orbital_period=orbital_period
        self.gravity=gravity
        self.population=population
        self.climate=climate
        self.terrain=terrain
        self.surface_water=surface_water
def planet_dict(planet):
    return{
        'id':planet.id,
        'name':planet.name,
        'diameter':planet.diameter,
        'rotation_period':planet.rotation_period,
        'orbital_period':planet.orbital_period,
        'gravity':planet.gravity,
        'population':planet.population,
        'climate':planet.climate,
        'terrain':planet.terrain,
        'surface_water':planet.surface_water

    }

class Vehicle(db.Model):
    __tablename__ = 'vehicle'
    id = db.Column(db.String(32), primary_key=True, default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    vehicle_class = db.Column(db.String(100), nullable=False)
    manufacturer = db.Column(db.String(100), nullable=False)
    length = db.Column(db.String(100), nullable=False)
    cost_in_credits = db.Column(db.String(100), nullable=False)
    crew = db.Column(db.String(100), nullable=False)
    max_atmosphering_speed = db.Column(db.String(100), nullable=False)
    cargo_capacity = db.Column(db.String(100), nullable=False)
    consumables = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(200), nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    edited = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    favorites = db.relationship('Favorite', backref='vehicle', lazy=True)

    def __init__(self,name,model,vehicle_class,manufacturer,length,cost_in_credits,crew,max_atmosphering_speed,cargo_capacity,consumables,url):
        self.name=name
        self.model=model
        self.vehicle_class=vehicle_class
        self.manufacturer=manufacturer
        self.length=length
        self.cost_in_credits=cost_in_credits
        self.crew=crew
        self.max_atmosphering_speed=max_atmosphering_speed
        self.cargo_capacity=cargo_capacity
        self.consumables=consumables
        self.url=url
def vehicle_dict(vehicle):
    return {
        "id":vehicle.id,
        "name":vehicle.name,
        "model":vehicle.model,
        "vehicle_class": vehicle.vehicle_class,
        "manufacturer": vehicle.manufacturer,
        "length": vehicle.length,
        "cost_in_credits": vehicle.cost_in_credits,
        "crew": vehicle.crew,
        "max_atmosphering_speed": vehicle.max_atmosphering_speed,
        "cargo_capacity": vehicle.cargo_capacity,
        "consumables": vehicle.consumables,
        "url": vehicle.url
    }
        
class People(db.Model):
    __tablename__ = 'people'
    id = db.Column(db.String(32), primary_key=True,default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    birth_year = db.Column(db.String(100), nullable=False)
    eye_color = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(100), nullable=False)
    hair_color = db.Column(db.String(100), nullable=False)
    height = db.Column(db.String(20), nullable=False)
    mass = db.Column(db.String(40), nullable=False)
    skin_color = db.Column(db.String(20), nullable=False)
    homeworld = db.Column(db.String(40), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    edited = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    favorites = db.relationship('Favorite', backref='people', lazy=True)    

    def __init__(self,name,birth_year,eye_color,gender,hair_color,height,mass,skin_color,homeworld,url):
        self.name=name
        self.birth_year=birth_year
        self.eye_color=eye_color
        self.gender=gender
        self.hair_color=hair_color
        self.height=height
        self.mass=mass
        self.skin_color=skin_color
        self.homeworld=homeworld
        self.url=url
def person_dict(person):
    return{
        'id':person.id,
        'name':person.name,
        'birth_year':person.birth_year,
        'eye_color':person.eye_color,
        'gender':person.gender,
        'hair_color':person.hair_color,
        'height':person.height,
        'mass':person.mass,
        'skin_color':person.skin_color,
        'homeworld':person.homeworld,
        "url":person.url
    }

class Favorite(db.Model):
    __tablename__ = 'favorite'
    id = db.Column(db.String(32), primary_key=True,default=get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey('user.id'), nullable=False)
    people_id = db.Column(db.String(32), db.ForeignKey('people.id'), nullable=True)
    vehicle_id = db.Column(db.String(32), db.ForeignKey('vehicle.id'), nullable=True)
    planet_id = db.Column(db.String(32), db.ForeignKey('planet.id'), nullable=True)
    def __init__(self,user_id,people_id,vehicle_id,planet_id):
        self.user_id=user_id
        self.people_id=people_id
        self.vehicle_id=vehicle_id
        self.planet_id=planet_id
def favorite_dict(favorite):
    return {
        'id': favorite.id,
        'user_id': favorite.user_id,
        'user_name': favorite.user.username if favorite.user else None,
        'people_id': favorite.people_id,
        'people_name': favorite.people.name if favorite.people else None,
        'vehicle_id': favorite.vehicle_id,
        'vehicle_name': favorite.vehicle.name if favorite.vehicle else None,
        'planet_id': favorite.planet_id,
        'planet_name': favorite.planet.name if favorite.planet else None,

    }