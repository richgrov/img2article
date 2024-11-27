from flask import Flask, request
import AIinator

app = Flask(__name__)


@app.route("/", methods=["POST"])
def image_encoding():
    data = request.files["file-upload"]

    AIinator.embed_image(data)

    return "200 OKAY"


if __name__ == "__main__":
    app.run()
