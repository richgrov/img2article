from io import BytesIO

import torch
from flask import Flask, request
from PIL import Image
from transformers import CLIPModel, CLIPProcessor

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

app = Flask(__name__)


@app.route("/", methods=["POST"])
def image_encoding():
    data = request.files["file-upload"].stream.read()

    image = Image.open(BytesIO(data))
    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        image_embeddings = model.get_image_features(**inputs)

    print(image_embeddings)

    return "200 OKAY"


if __name__ == "__main__":
    app.run()
