from io import BytesIO

import torch
from flask import Flask, request
from PIL import Image
from transformers import CLIPModel, CLIPProcessor
import AIinator

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

app = Flask(__name__)


@app.route("/", methods=["POST"])
def image_encoding():
    data = request.files["file-upload"].stream.read()

    AIinator.embed_image(data)

    return "200 OKAY"


if __name__ == "__main__":
    app.run()
