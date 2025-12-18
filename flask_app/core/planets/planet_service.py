from core.models import Planet, planet_dict
from core import db

class PlanetService:

    @staticmethod
    def get_all_planets():
        planets= Planet.query.order_by(Planet.id.asc()).all()
        planet_list=[planet_dict(planet) for planet in planets]
        return planet_list
    
    @staticmethod
    def get_planets_by_id(id):
        planet=Planet.query.filter_by(id=id).first()
        return planet
    
    @staticmethod
    def create_planet(data):
        name=data['name']
        diameter=data['diameter']
        rotation_period=data['rotation_period']
        orbital_period=data['orbital_period']
        gravity=data['gravity']
        population=data['population']
        climate=data['climate']
        terrain=data['terrain']
        surface_water=data['surface_water']
        
        new_planets=Planet(
            name=name,
            diameter=diameter,
            rotation_period=rotation_period,
            orbital_period=orbital_period,
            gravity=gravity,
            population=population,
            climate=climate,
            terrain=terrain,
            surface_water=surface_water
        )
        db.session.add(new_planets)
        db.session.commit()
        return new_planets
    @staticmethod
    def update_planets(data,id):
        name=data['name']
        diameter=data['diameter']
        rotation_period=data['rotation_period']
        orbital_period=data['orbital_period']
        gravity=data['gravity']
        population=data['population']
        climate=data['climate']
        terrain=data['terrain']
        surface_water=data['surface_water']
        planet=Planet.query.filter_by(id=id).first()
        if name:
            planet.name=name
        if diameter:
            planet.diameter=diameter
        if rotation_period:
            planet.rotation_period=rotation_period
        if orbital_period:
            planet.orbital_period=orbital_period
        if gravity:
            planet.gravity=gravity
        if population:
            planet.population=population
        if climate:
            planet.climate=climate
        if terrain:
            planet.terrain=terrain
        if surface_water:
            planet.surface_water=surface_water
        db.session.commit()
        return planet
    
    @staticmethod
    def delete_planet(id):
        planet=Planet.query.filter_by(id=id).first()
        if not planet:
            return 'This not found'
        db.session.delete(planet)
        db.session.commit()
        return True
