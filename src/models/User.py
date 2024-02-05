from flask_sqlalchemy import SQLAlchemy
from lib.db import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    firstName = db.Column(db.String(100))
    lastName = db.Column(db.String(100))
    createdAt = db.Column(db.Date)

    # def __reper__():
    #     return f"Video(name={name}, views={views}, likes={likes})"

    def __init__(self, username='', password='', email='', firstName='', lastName='', createdAt=None):
        self.username = username
        self.password = password
        self.email = email
        self.firstName = firstName
        self.lastName = lastName
        self.createdAt = createdAt
# db.create_all()