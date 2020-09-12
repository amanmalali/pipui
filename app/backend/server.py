import json
from flask import Flask, g, request, jsonify
from flask_cors import CORS, cross_origin
from autocomplete import Autocomplete
import startup

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
ac = Autocomplete()


@app.route("/autocomplete")
def autocomplete():
    return jsonify(ac.search(request.args["word"]))


if __name__ == '__main__':
    startup.startup()
    app.run(host="0.0.0.0", port=5000, debug=True)
