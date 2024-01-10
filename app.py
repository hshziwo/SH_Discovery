from flask import Flask, send_from_directory, redirect, url_for
from flask_cors import CORS #comment this on deployment
from api.api import addApi

app = Flask(__name__, static_url_path='', static_folder='front_app/build')
CORS(app) #comment this on deployment
addApi(app) #개발과 배포 빌드 app.py의 차이로 인해 하위 함수로 변경

@app.route("/", defaults={'path':''})
def index(path):
    return send_from_directory(app.static_folder,'index.html')

# @app.errorhandler(404)
# def page_not_found(error):
#     return redirect(url_for("index")), 404


# @app.errorhandler(500)
# def internal_error(error):
#     return redirect(url_for("index")), 500


@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for("index"))