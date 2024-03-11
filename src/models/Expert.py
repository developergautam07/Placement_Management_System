from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

db = SQLAlchemy()

class Expert(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    jobrole = Column(String(100), nullable=False)
    company = Column(String(100), nullable=False)
    link = Column(String(200), nullable=False)
    date_posted = Column(DateTime, default=datetime.utcnow)

    def __init__(self, name='', description='', jobrole='', company='', link='', date_posted=None):
        self.name = name
        self.description = description
        self.jobrole = jobrole
        self.company = company
        self.date_posted = date_posted
        self.link = link
    
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}