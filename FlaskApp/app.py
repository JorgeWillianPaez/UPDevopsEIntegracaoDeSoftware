from flask import Flask

app = Flask(__name__)

@app.route('/',methods=['GET'])
def root_route():
    return 'Hello World'

if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')