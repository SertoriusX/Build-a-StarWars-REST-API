from core.models import People, person_dict
from core import db

class PersonService:

    @staticmethod
    def get_all_people():
        peoples=People.query.order_by(People.id.asc()).all()
        people_list =[person_dict(people) for people in peoples]
        return people_list
    
    @staticmethod
    def get_all_id_people(id):
        people=People.query.filter_by(id=id).first()
        return people
    @staticmethod
    def add_people(data):
        name=data['name']
        birth_year=data['birth_year']
        eye_color=data['eye_color']
        gender=data['gender']
        hair_color=data['hair_color']
        height=data['height']
        mass=data['mass']
        skin_color=data['skin_color']
        homeworld=data['homeworld']
        url=data['url']
        new_people=People(
            name=name,birth_year=birth_year,
            eye_color=eye_color,gender=gender,
            hair_color=hair_color,height=height,
            mass=mass,
            skin_color=skin_color,homeworld=homeworld,
            url=url)
        
        db.session.add(new_people)
        db.session.commit()
        return new_people
    @staticmethod
    def edit_people(data,id):
        name=data['name']
        birth_year=data['birth_year']
        eye_color=data['eye_color']
        gender=data['gender']
        hair_color=data['hair_color']
        height=data['height']
        mass=data['mass']
        skin_color=data['skin_color']
        homeworld=data['homeworld']
        url=data['url']
        people=People.query.filter_by(id=id).first()
        if name:
            people.name=name
        if birth_year:
            people.birth_year=birth_year
        if eye_color:
            people.eye_color=eye_color
        if gender:
            people.gender=gender
        if hair_color:
            people.hair_color=hair_color
        if height:
            people.height=height
        if mass:
            people.mass=mass
        if skin_color:
            people.skin_color=skin_color
        if homeworld:
            people.homeworld=homeworld
        if url:
            people.url=url
        db.session.commit()
        return people
    @staticmethod
    def del_people(id):
        people=People.query.filter_by(id=id).first()
        db.session.delete(people)
        db.session.commit()
        return True
