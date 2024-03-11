from flask_restful import Resource
from flask import Flask, request, jsonify
from models.Reviews import Reviews
from lib.db import db
from datetime import datetime

class Feedback(Resource):
    def get(self):
        role = request.args.get('filter')
        search = request.args.get('search')
        limit = request.args.get('limit', type=int)
        offset = request.args.get('offset', type=int)

        query = Reviews.query

        if role:
            query = query.filter(Reviews.jobrole.contains(role))

        if search:
            query = query.filter(Reviews.company.contains(search))

        if limit is not None and offset is not None:
            query = query.limit(limit).offset(offset)

        reviews = query.all()

        if not reviews:
            return jsonify({'message': 'No Experts found', 'status': 404})
        else:
            reviews_list = [review.to_dict() for review in reviews]
            return jsonify({'message': 'Experts fetched successfully', 'data': reviews_list, 'status': 200})
        
    def post(self):
        data = request.json.get('record')
        if not data:
            return jsonify({'message': 'No data provided', 'status': 400})

        # Extract data from the request
        review = data.get('reviews')
        jobrole = data.get('jobroles')
        company = data.get('company')
        rating = data.get('rating')
        
        # Validate the data
        if not review or not jobrole or not company or not rating:
            return jsonify({'message': 'Incomplete data provided', 'status': 400})

        # Create a new Reviews object
        try:
            new_review = Reviews(
                reviews=review,
                jobrole=jobrole,
                company=company,
                rating=rating,
                date_posted=datetime.utcnow()  # Assuming you want to set the current date/time
            )
            # Add the new expert to the database session
            db.session.add(new_review)
            # Commit the transaction
            db.session.commit()
            return jsonify({'message': 'Reviews added successfully', 'status': 200})
        
        except Exception as e:
            return jsonify({'message': f'Failed to add job: {str(e)}', 'status': 500})