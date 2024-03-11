from flask_restful import Resource
from flask import Flask, request, jsonify
from models.User import User
from models.Student import Student
import requests
from lib.db import db
from datetime import datetime

class Login(Resource):
    def post(self):
        email = request.json['email']
        password = request.json['password']
        is_admin = True if request.json.get('is_admin') else False
        if (email is None or email == '') and (password is None or password == ''):
            return jsonify({'message': 'Bad Request', 'status': 400})
        
        print("email: ", email, "password: ", password)
        if not is_admin:
            user = Student.query.with_entities(Student.id, Student.email, Student.firstName, Student.lastName).filter(Student.email==email).filter(Student.password==password).first()
        else:
            user = User.query.with_entities(User.id, User.email).filter(User.email==email).filter(User.password==password).first()
        print("User: ", user)
        if not user:
            return jsonify({'message': 'Invalid credentials', 'status': 401})
        else:
            user = user._asdict()
            user['isAdmin'] = is_admin
            return jsonify({'message': 'Login Successfull', 'data': user, 'status': 200})
    
class SignUp(Resource):
    def post(self):
        data = request.json
        # username = data['username']
        password = data['password']
        email = data['email']

        user = User(password=password, email=email, createdAt = datetime.utcnow())
        db.session.add(user)
        db.session.commit()
        userId = user.id
        userData = User.query.with_entities(User.id, User.email, User.username).filter_by(id=userId).first()

        return jsonify({'message': 'Signup Successfull', 'data': userData, 'status': 200})
