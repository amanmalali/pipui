import json

from flask import Flask, g, request

from autocomplete import Autocomplete
import startup

app = Flask(__name__)
ac = Autocomplete()


@app.route("/autocomplete")
def autocomplete():
    return json.dumps(ac.search(request.form["word"]))


if __name__ == '__main__':
    startup.startup()
    app.run(host="localhost", port=6666, debug=True)
