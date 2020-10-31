from flask import Flask, request, jsonify

import io
import os
import base64

from middleware.detect import detection

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/upload", methods=["POST"])
def upload():
    img = request.json['file'].encode()
    dst_data = detection(img)
    encoded_string = base64.b64encode(dst_data).decode()
    return jsonify({'image': encoded_string})


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
