from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

db = SQLAlchemy()

class Job(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    jobroles = Column(String(100), nullable=False)
    company = Column(String(100), nullable=False)
    location = Column(String(100), nullable=False)
    salary = Column(Integer, nullable=False)
    link = Column(String(200), nullable=False)
    type = Column(String(200), nullable=False)
    date_posted = Column(DateTime, default=datetime.utcnow)

    def __init__(self, title='', description='', jobroles='', company='', location='', salary=0, date_posted=None, link='', type=''):
        self.title = title
        self.description = description
        self.jobroles = jobroles
        self.company = company
        self.location = location
        self.salary = salary
        self.date_posted = date_posted
        self.link = link
        self.type = type
    
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}