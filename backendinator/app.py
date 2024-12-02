from io import BytesIO

import AIinator
from flask import Flask, make_response, request
from PIL import Image

app = Flask(__name__)


@app.route("/", methods=["POST"])
def image_encoding():

    data = request.files["file"].stream.read()

    image = Image.open(BytesIO(data))
    image_embedding = AIinator.embed_image(image)

    response = make_response("200 YG2G")
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"

    return response


if __name__ == "__main__":
    app.run()
