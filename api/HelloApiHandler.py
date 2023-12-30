from flask_restful import Api, Resource, reqparse
import requests
import config
import json
from konlpy.tag import Okt

class HelloApiHandler(Resource):
  # def get(self):
  #   return {
  #     'resultStatus': 'SUCCESS',
  #     'message': "Hello Api Handler"
  #     }

  def get(self):
    with open('testdata.json') as f:
      json_object = json.load(f)

    okt = Okt()

    return {
      'resultStatus': 'SUCCESS',
      'message': "Hello Api Handler",
      'test': okt.nouns(json_object['items'][0]['description'])
      }

  # def get(self):
  #   # 뉴스 검색 API의 http 메소드가 get이므로 get 사용
  #   # 네이버 뉴스 API에 안내사항 따라함
  #   keyword = "기안84"

  #   response = requests.get(
  #       'https://openapi.naver.com/v1/search/news.json',
  #       params = {
  #           'query' : keyword,
  #           'display' : 100,
  #           'sort' : 'sim' # 'sim' | 'date'
  #       },
  #       headers= {
  #           'X-Naver-Client-Id' : config.NAVER_CLIENT_ID,
  #           'X-Naver-Client-Secret' : config.NAVER_CLIENT_SECRET
  #       }
  #   )

  #   # print(response.json())

  #   # 우리 서버의 API에 맞게 데이터 가공
  #   items = response.json()

  #   return {
  #     'resultStatus': 'SUCCESS',
  #     'message': "Hello Api Handler",
  #     'items' : items
  #     }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)

    args = parser.parse_args()

    print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    request_type = args['type']
    request_json = args['message']
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    ret_status = request_type
    ret_msg = request_json

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    final_ret = {"status": "Success", "message": message}

    return final_ret