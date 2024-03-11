from flask_restful import Resource
from flask import Flask, request, jsonify
from models.ContactUs import Contact
from lib.db import db
from datetime import datetime

class ContactUs(Resource):     
    def post(self):
        data = request.json.get('record')
        if not data:
            return jsonify({'message': 'No data provided', 'status': 400})

        # Extract data from the request
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Validate the data
        if not name or not email or not message:
            return jsonify({'message': 'Incomplete data provided', 'status': 400})

        # Create a new Reviews object
        try:
            new_contact = Contact(
                name=name,
                email=email,
                message=message,
                date_posted=datetime.utcnow()  # Assuming you want to set the current date/time
            )
            # Add the new expert to the database session
            db.session.add(new_contact)
            # Commit the transaction
            db.session.commit()
            return jsonify({'message': 'Reviews added successfully', 'status': 200})
        
        except Exception as e:
            return jsonify({'message': f'Failed to add job: {str(e)}', 'status': 500})