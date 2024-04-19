from flask import Flask
from flask_pymongo import PyMongo
from .views import views

app = Flask(__name__)

app.register_blueprint(views)