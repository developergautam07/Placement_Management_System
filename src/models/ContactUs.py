from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

db = SQLAlchemy()

class Contact(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    date_posted = Column(DateTime, default=datetime.utcnow)

    def __init__(self, name='', email='', message='', date_posted=None):
        self.name = name
        self.email = email
        self.message = message
        self.date_posted = date_posted
    
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}