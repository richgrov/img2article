from io import BytesIO

from flask import Flask, jsonify, make_response, request
from milvusdal import MilvusDAL
from PIL import Image

import AIinator

app = Flask(__name__)
dal = MilvusDAL()
dal.load_collection()


@app.route("/", methods=["POST"])
def image_encoding():

    data = request.files["file"].stream.read()

    image = Image.open(BytesIO(data))
    image_embedding = AIinator.embed_image(image)

    articles = dal.query(image_embedding)

    array = []
    for article in articles[0]:
        title = str(article["entity"]["title"]).strip()
        link = "https://wikipedia.org/wiki/" + title.replace(" ", "_").strip()
        array.append({"title": title, "link": link})
        print(article["entity"]["title"], "\n")

    response = make_response("200 YG2G")
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"

    return jsonify(array)


if __name__ == "__main__":
    app.run()
