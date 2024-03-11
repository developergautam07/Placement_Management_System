from flask_restful import Resource
from flask import Flask, request, jsonify
from models.Expert import Expert
from lib.db import db
from datetime import datetime

class ExpertConnect(Resource):
    def get(self):
        role = request.args.get('filter')
        search = request.args.get('search')
        limit = request.args.get('limit', type=int)
        offset = request.args.get('offset', type=int)

        query = Expert.query

        if role:
            query = query.filter(Expert.jobrole.contains(role))

        if search:
            query = query.filter(Expert.name.contains(search))

        if limit is not None and offset is not None:
            query = query.limit(limit).offset(offset)

        experts = query.all()

        if not experts:
            return jsonify({'message': 'No Experts found', 'status': 404})
        else:
            experts_list = [expert.to_dict() for expert in experts]
            return jsonify({'message': 'Experts fetched successfully', 'data': experts_list, 'status': 200})
        
    def post(self):
        data = request.json.get('record')
        if not data:
            return jsonify({'message': 'No data provided', 'status': 400})

        # Extract data from the request
        name = data.get('name')
        description = data.get('description')
        jobrole = data.get('jobrole')
        company = data.get('company')
        link = data.get('Action')
        
        # Validate the data
        if not name or not jobrole or not company or not link:
            return jsonify({'message': 'Incomplete data provided', 'status': 400})

        # Create a new Expert object
        try:
            new_expert = Expert(
                name=name,
                description=description,
                jobrole=jobrole,
                company=company,
                link=link,
                date_posted=datetime.utcnow()  # Assuming you want to set the current date/time
            )
            # Add the new expert to the database session
            db.session.add(new_expert)
            # Commit the transaction
            db.session.commit()
            return jsonify({'message': 'Expert added successfully', 'status': 200})
        
        except Exception as e:
            return jsonify({'message': f'Failed to add job: {str(e)}', 'status': 500})