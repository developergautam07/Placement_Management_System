from flask_restful import Resource
from flask import Flask, request, jsonify
from models.Job import Job
from lib.db import db

class Jobs(Resource):
    def get(self):
        jobroles = request.args.get('filter')
        search = request.args.get('search')
        job_type = request.args.get('type')
        limit = request.args.get('limit', type=int)
        offset = request.args.get('offset', type=int)

        query = Job.query

        if jobroles:
            query = query.filter(Job.jobroles.contains(jobroles))
        
        if job_type in ['job', 'internship']:
            query = query.filter(Job.type == job_type)

        if search:
            query = query.filter(Job.title.contains(search))

        if limit is not None and offset is not None:
            query = query.limit(limit).offset(offset)

        jobs = query.all()

        if not jobs:
            return jsonify({'message': 'No jobs found', 'status': 404})
        else:
            print("jobs: ", jobs)
            jobs_list = [job.to_dict() for job in jobs]
            return jsonify({'message': 'Jobs fetched successfully', 'data': jobs_list, 'status': 200})
        
    def post(self):
        data = request.json.get('record')
        if not data:
            return jsonify({'message': 'No data provided', 'status': 400})
        
        title = data.get('title')
        description = data.get('description')
        jobroles = data.get('jobroles')
        company = data.get('company')
        location = data.get('location')
        salary = data.get('salary')
        link = data.get('Action')
        job_type = data.get('type')

        if not (title and description and jobroles and company and salary and link and job_type):
            return jsonify({'message': 'Incomplete data provided', 'status': 400})

        try:
            new_job = Job(
                title=title,
                description=description,
                jobroles=jobroles,
                company=company,
                location=location,
                salary=salary,
                link=link,
                type=job_type
            )
            db.session.add(new_job)
            db.session.commit()
            return jsonify({'message': 'Job added successfully', 'status': 200})
        except Exception as e:
            return jsonify({'message': f'Failed to add job: {str(e)}', 'status': 500})
