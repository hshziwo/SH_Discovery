from flask_restful import Api
from api.TestApiHandler import TestApiHandler
from api.RelatedWordNetworkApiHandler import RelatedWordNetworkApiHandler

def addApi(app) :
    api = Api(app)
    api.add_resource(RelatedWordNetworkApiHandler, '/analytics/network')
    api.add_resource(TestApiHandler, '/flask/test')