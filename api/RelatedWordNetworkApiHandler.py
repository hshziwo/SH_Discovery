from flask_restful import Resource
from flask import request
import requests
from analysis.extract import get_graph_data
import config

class RelatedWordNetworkApiHandler(Resource):
  def get(self):
    # 뉴스 검색 API의 http 메소드가 get이므로 get 사용
    # 네이버 뉴스 API에 안내사항 따라함

    keyword = request.args.get('word')

    response = requests.get(
        'https://openapi.naver.com/v1/search/news.json',
        params = {
            'query' : keyword,
            'display' : 100,
            'sort' : 'sim' # 'sim' | 'date'
        },
        headers= {
            'X-Naver-Client-Id' : config.NAVER_CLIENT_ID,
            'X-Naver-Client-Secret' : config.NAVER_CLIENT_SECRET
        }
    )

    # print(response.json())

    # 우리 서버의 API에 맞게 데이터 가공
    data = response.json()

    descriptions = map(lambda x: x['description'], data['items'])

    return {
      'resultStatus': 'SUCCESS',
      'message': "Related Word Network",
      'items': get_graph_data(descriptions)
      }