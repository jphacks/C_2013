from flask import Flask, request, jsonify

import io
import os
import base64

# from middleware.detect import detection
from controller.mayu_controller import mayu_handler
from controller.lip_controller import lip_handler
from middleware.detect_dots import detect_dots
from controller.nose_controller import nose_handler


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"


# @app.route("/upload", methods=["POST"])
# def upload():
#     # lip_thickness: thin or thick or normal
#     lip_thickness = request.json['lip']
#     img = request.json['file'].encode()
#     dst_data = detection(img, lip_thickness)
#     encoded_string = base64.b64encode(dst_data).decode()
#     return jsonify({'image': encoded_string})


@app.route("/mayu", methods=["POST"])
def mayu():
    img = request.json['file'].encode()
    dst_data = mayu_handler(img)
    encoded_string = base64.b64encode(dst_data).decode()
    return jsonify({'image': encoded_string})


@app.route("/lip", methods=["POST"])
def lip():
    # lip_thickness: thin or thick or normal
    lip_thickness = request.json['lip']
    img = request.json['file'].encode()
    dst_data = lip_handler(img, lip_thickness)
    encoded_string = base64.b64encode(dst_data).decode()
    return jsonify({'image': encoded_string})


@app.route("/nose", methods=["POST"])
def nose():
    img = request.json['file'].encode()
    dst_data = nose_handler(img)
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
