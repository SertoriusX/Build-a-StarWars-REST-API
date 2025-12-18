from core.models import Vehicle, vehicle_dict
from core import db

class VehicleService:
    @staticmethod
    def get_all_vehicle():
        vehicles=Vehicle.query.order_by(Vehicle.id.asc()).all()
        vehicle_list=[vehicle_dict(vehicle) for vehicle in vehicles]
        return vehicle_list
    @staticmethod
    def get_by_id_vehicle(id):
        vehicle=Vehicle.query.filter_by(id=id).first()
        return vehicle
    @staticmethod
    def create_vehicle(data):
        name=data['name']
        model=data['model']
        vehicle_class=data['vehicle_class']
        manufacturer=data['manufacturer']
        length=data['length']
        cost_in_credits=data['cost_in_credits']
        crew=data['crew']
        max_atmosphering_speed=data['max_atmosphering_speed']
        cargo_capacity=data['cargo_capacity']
        consumables=data['consumables']
        url=data['url']
        new_vehicle=Vehicle(
            name=name,model=model,
            vehicle_class=vehicle_class,manufacturer=manufacturer,
            length=length,cost_in_credits=cost_in_credits,
            crew=crew,max_atmosphering_speed=max_atmosphering_speed,
            cargo_capacity=cargo_capacity,consumables=consumables,
            url=url
            )
        db.session.add(new_vehicle)
        db.session.commit()
        return new_vehicle
    @staticmethod
    def update_vehicle(data,id):
        name=data['name']
        model=data['model']
        vehicle_class=data['vehicle_class']
        manufacturer=data['manufacturer']
        length=data['length']
        cost_in_credits=data['cost_in_credits']
        crew=data['crew']
        max_atmosphering_speed=data['max_atmosphering_speed']
        cargo_capacity=data['cargo_capacity']
        consumables=data['consumables']
        url=data['url']
        vehicle=Vehicle.query.filter_by(id=id).first()
        if name:
            vehicle.name=name
        if model:
            vehicle.model=model
        if vehicle_class:
            vehicle.vehicle_class=vehicle_class
        if manufacturer:
            vehicle.manufacturer=manufacturer
        if length:
            vehicle.length=length
        if cost_in_credits:
            vehicle.cost_in_credits=cost_in_credits
        if crew:
            vehicle.crew=crew
        if max_atmosphering_speed:
            vehicle.max_atmosphering_speed=max_atmosphering_speed
        if cargo_capacity:
            vehicle.cargo_capacity=cargo_capacity
        if consumables:
            vehicle.consumables=consumables
        if url:
            vehicle.url=url
        db.session.commit()
        return vehicle
    @staticmethod
    def delete_vehicle(id):
        vehicle=Vehicle.query.filter_by(id=id).first()
        db.session.delete(vehicle)
        db.session.commit()
        return True
