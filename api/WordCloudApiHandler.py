from flask_restful import Resource
from flask import request
from api.searchWord import searchWord
from analysis.extract import get_node_data

class WordCloudApiHandler(Resource):
  def get(self):
    # 뉴스 검색 API의 http 메소드가 get이므로 get 사용
    # 네이버 뉴스 API에 안내사항 따라함

    keyword = request.args.get('word')
    data = searchWord(keyword)
    descriptions = map(lambda x: x['description'], data['items'])

    return {
      'resultStatus': 'SUCCESS',
      'message': "Word Cloud",
      'items': get_node_data(descriptions)
      }