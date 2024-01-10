from flask_restful import Api
from api.TestApiHandler import TestApiHandler
from api.RelatedWordNetworkApiHandler import RelatedWordNetworkApiHandler
from api.WordCloudApiHandler import WordCloudApiHandler

def addApi(app) :
    api = Api(app)
    api.add_resource(RelatedWordNetworkApiHandler, '/api/analysis/network')
    api.add_resource(WordCloudApiHandler, '/api/analysis/wordcloud')
    api.add_resource(TestApiHandler, '/flask/test')