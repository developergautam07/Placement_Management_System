from flask_restful import Resource
from flask import Flask, request, jsonify
from models.InterviewPrep import InterviewPrep
from lib.db import db
from datetime import datetime

class Interview(Resource):
    def get(self):
        role = request.args.get('filter')
        search = request.args.get('search')
        limit = request.args.get('limit', type=int)
        offset = request.args.get('offset', type=int)

        query = InterviewPrep.query

        if role:
            query = query.filter(InterviewPrep.jobrole.contains(role))

        if search:
            query = query.filter(InterviewPrep.title.contains(search))

        if limit is not None and offset is not None:
            query = query.limit(limit).offset(offset)

        interview_prep = query.all()

        if not interview_prep:
            return jsonify({'message': 'No Data found', 'status': 404})
        else:
            prep_list = [interv.to_dict() for interv in interview_prep]
            return jsonify({'message': 'Interview Prepration Data fetched successfully', 'data': prep_list, 'status': 200})
        
    def post(self):
        data = request.json.get('record')
        if not data:
            return jsonify({'message': 'No data provided', 'status': 400})

        # Extract data from the request
        title = data.get('title')
        platform = data.get('platform')
        jobrole = data.get('jobrole')
        link = data.get('link')
        # Extract other fields as needed
        
        # Validate the data
        if not title or not platform or not jobrole or not link:
            return jsonify({'message': 'Incomplete data provided', 'status': 400})

        # Create a new InterviewPrep object
        try:
            new_interview_prep = InterviewPrep(
                title=title,
                platform=platform,
                jobrole=jobrole,
                link=link,
                date_posted=datetime.utcnow()  # Assuming you want to set the current date/time
            )
            # Add the new interview preparation to the database session
            db.session.add(new_interview_prep)
            # Commit the transaction
            db.session.commit()

            return jsonify({'message': 'Interview preparation data added successfully', 'status': 200})
        
        except Exception as e:
            return jsonify({'message': f'Failed to add job: {str(e)}', 'status': 500})