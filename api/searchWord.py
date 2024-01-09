import requests
import config

def searchWord(keyword):
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

    return data