from flask_restful import Api
from api.HelloApiHandler import HelloApiHandler

def addApi(app) :
    api = Api(app)
    api.add_resource(HelloApiHandler, '/flask/hello')