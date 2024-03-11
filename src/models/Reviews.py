from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

db = SQLAlchemy()

class Reviews(db.Model):
    id = Column(Integer, primary_key=True)
    reviews = Column(Text, nullable=False)
    jobrole = Column(String(100), nullable=False)
    company = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False)
    date_posted = Column(DateTime, default=datetime.utcnow)

    def __init__(self, reviews='', jobrole='', company='', rating=0, date_posted=None):
        self.reviews = reviews
        self.jobrole = jobrole
        self.company = company
        self.rating = rating
        self.date_posted = date_posted
    
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}