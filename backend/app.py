from flask import Flask, request, jsonify

import io
import os
import base64

from middleware.detect import detection
from middleware.detect_dots import detect_dots

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/upload", methods=["POST"])
def upload():
    # lip_thickness: thin or thick or normal
    lip_thickness = request.json['lip']
    img = request.json['file'].encode()
    dst_data = detection(img, lip_thickness)
    encoded_string = base64.b64encode(dst_data).decode()
    return jsonify({'image': encoded_string})


@app.route("/detect_dots", methods=["POST"])
def detect_dot():
    img = request.json['file'].encode()
    dst_data = detect_dots(img)
    encoded_string = base64.b64encode(dst_data).decode()

    return jsonify({'dots': encoded_string})


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
