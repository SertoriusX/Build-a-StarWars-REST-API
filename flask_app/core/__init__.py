from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

import os
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///myDatabase.db' 

db=SQLAlchemy(app)
migrate = Migrate(app,db)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

from .models import *
from .user.user_routers import *
from .planets.planet_routers import *
from .vehicle.vehicle_routers import *
from .people.people_routers import *
from .favorite.favorite_routers import *
