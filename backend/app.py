from flask import Flask, request, jsonify

import io
import base64

from detect import main

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/upload", methods=["POST"])
def upload():
    # stream = request.files['file'].stream
    # dst_data = main(stream)
    img = request.json['file'].encode()
    dst_data = main(img)
    encoded_string = base64.b64encode(dst_data).decode()
    return jsonify({'image': encoded_string})


if __name__ == "__main__":
    app.run(debug=True)
