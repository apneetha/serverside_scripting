from flask import Flask, request
import json
import requests


app = Flask(__name__)

apikey = 'vs-ygwslqp6EgLL83Z5_K4Jspv3GabTpcFABYolfS75mXweV_KOqvVgsg5xYUnW-tb0D3jkc37CHHGf4IkL9kheCs5tieorVrM_HVvlIttuDQFSeoYrTtByMgFguY3Yx'

headers = {'Authorization': 'Bearer %s' % apikey, }


@app.route('/')
def index():
    return app.send_static_file('business.html')


@app.route('/style.css')
def upload_css():
    return app.send_static_file('style.css')


@app.route('/business.js')
def upload_javascript():
    return app.send_static_file('business.js')


@app.route('/getdata', methods=['GET'])
def getdata():
    keyword = request.args.get('term')
    lat = request.args.get('latitude')
    long = request.args.get('longitude')
    categories = request.args.get('categories')
    rad = request.args.get('radius')
    url = 'https://api.yelp.com/v3/businesses/search?term=' + keyword + '&latitude=' + lat + '&longitude=' + long + '&categories=' + categories + '&radius=' + rad
    response = requests.get(url, headers=headers, verify=False)
    response_json = response.json()
    response_dump = json.dumps(response_json)
    response_load = json.loads(response_dump)
    print(response_json)
    print(url)

    return response_json


@app.route('/getbdata', methods=['GET'])
def getbdata():
    b_id = request.args.get('b_id')
    url = 'https://api.yelp.com/v3/businesses/' + b_id
    response = requests.get(url, headers=headers, verify=False)
    response_json = response.json()
    response_dump = json.dumps(response_json)
    response_load = json.loads(response_dump)
    print(response_json)
    return response_json


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050, debug=True, threaded=True)
