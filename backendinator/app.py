from io import BytesIO

from flask import Flask, request
from PIL import Image

import AIinator

app = Flask(__name__)


@app.route("/", methods=["POST"])
def image_encoding():
    data = request.files["file-upload"].stream.read()
    image = Image.open(BytesIO(data))

    image_embedding = AIinator.embed_image(image)

    return "200 YG2G"


if __name__ == "__main__":
    app.run()
