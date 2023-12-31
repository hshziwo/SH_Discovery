from flask_restful import Api
from api.TestApiHandler import TestApiHandler

def addApi(app) :
    api = Api(app)
    api.add_resource(TestApiHandler, '/flask/test')