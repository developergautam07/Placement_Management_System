from flask import Flask
from flask_restful import Api, reqparse
from flask_sqlalchemy import SQLAlchemy
from lib.db import db
from flask_cors import CORS
from flask_apscheduler import APScheduler

app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

scheduler = APScheduler()
scheduler.init_app(app)

from controllers.auth import Login, SignUp
from controllers.trade import AddTrade, RecentTrades
from controllers.predict import PredictionModel


api.add_resource(Login, '/login')
api.add_resource(SignUp, '/sign_up')
api.add_resource(AddTrade, '/add_trade')
api.add_resource(RecentTrades, '/recent_trades')
api.add_resource(PredictionModel, '/predict')

# def call_predict():
#     with app.test_client() as client:
#         print("123")
#         response = client.get('/predict')
#         return 0


if __name__ == "__main__":
    # scheduler.add_job(func = call_predict, id='Scheduled Task', trigger = 'interval', minutes = 5)
    # scheduler.start()
    app.run(debug=True)