from flask import Flask, request, jsonify, abort
from flask_cors import CORS

import io
import os
import base64
import traceback

from controller.mayu_controller import mayu_handler
from controller.lip_controller import lip_handler
from middleware.detect_dots import detect_dots
from controller.nose_controller import nose_handler
from controller.cheak_controller import cheak_handler
from controller.template_controller import make_eyebrow


app = Flask(__name__)
CORS(app)


def check_param(req_json, params):
    not_exist_params = []
    not_match_params = []
    for param, param_type in params.items():
        if param not in req_json.keys():
            not_exist_params.append(param)
        else:
            if param_type != type(req_json[param]):
                not_match_params.append(param)

    message = ''
    if not_exist_params:
        params = ','.join(not_exist_params)
        message += 'parameter \'{}\' is not found, '.format(params)
    if not_match_params:
        params = ','.join(not_match_params)
        message += 'parameter \'{}\' is invalid'.format(params)

    return message


def base_handler(func, args):
    try:
        dst_data = func(*args)
    except Exception as e:
        print(traceback.format_exc())
        description = {'message': str(e)}
        return False, description

    encoded_string = base64.b64encode(dst_data).decode()
    res = {'image': encoded_string}

    return True, res


@app.errorhandler(400)
def error_handler(error):
    res = jsonify({
        'error': {
            'message': error.description['message']
        },
        'code': error.code
    })
    return res, error.code


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/mayu", methods=["POST"])
def mayu():
    error_message = check_param(request.json, {'file': str})
    if error_message:
        abort(400, {'message': error_message})

    img = request.json['file'].encode()

    success, res = base_handler(mayu_handler, [img])

    if success:
        return jsonify(res)
    else:
        abort(400, res)


@app.route("/lip", methods=["POST"])
def lip():
    # lip_thickness: thin or thick or normal

    error_message = check_param(request.json, {'file': str, 'lip': str})
    if error_message:
        abort(400, {'message': error_message})

    lip_thickness = request.json['lip']
    img = request.json['file'].encode()

    success, res = base_handler(lip_handler, [img, lip_thickness])

    if success:
        return jsonify(res)
    else:
        abort(400, res)


@app.route("/nose", methods=["POST"])
def nose():
    error_message = check_param(request.json, {'file': str})
    if error_message:
        abort(400, {'message': error_message})

    img = request.json['file'].encode()

    success, res = base_handler(nose_handler, [img])

    if success:
        return jsonify(res)
    else:
        abort(400, res)


# @app.route("/detect_dots", methods=["POST"])
# def detect_dot():
#     img = request.json['file'].encode()
#     dst_data = detect_dots(img)
#     encoded_string = base64.b64encode(dst_data).decode()

#     return jsonify({'dots': encoded_string})

@app.route("/cheak", methods=["POST"])
def cheak():
    img = request.json['file'].encode()
    dst_data = cheak_handler(img)
    encoded_string = base64.b64encode(dst_data).decode()
    return jsonify({'image': encoded_string})


@app.route("/template/eyebrow", methods=["POST"])
def eyebrow_template():
    error_message = check_param(request.json, {'file': str})
    if error_message:
        abort(400, {'message': error_message})

    img = request.json['file'].encode()

    dst_data = make_eyebrow(img)
    encoded_string = base64.b64encode(dst_data).decode()
    #success, res = make_eyebrow(img)

    #if success:
     #   return jsonify(res)
    #else:
     #   abort(400, res)
    return jsonify({'image': encoded_string})


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
