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
