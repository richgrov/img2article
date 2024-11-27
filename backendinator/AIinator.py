import clip
import numpy as np
import torch
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# FOR TESTING PURPOSES
# image = preprocess(Image.open("CLIP.png")).unsqueeze(0).to(device)
# text = clip.tokenize("one two three").to(device)

# with torch.no_grad():
#     # image_features = model.encode_image(image)
#     text_features = model.encode_text(text)

#     print(text_features)


def embed_image(image: Image) -> np.ndarray:
    image = preprocess(image).unsqueeze(0).to(device)

    with torch.no_grad():
        image_embedding = model.encode_image(image)
        image_values = image_embedding.flatten().cpu().numpy()
        return image_values


def embed_text(text_str: str) -> np.ndarray:
    text = clip.tokenize(text_str).to(device)

    with torch.no_grad():
        text_embedding = model.encode_text(text)
        text_values = text_embedding.flatten().cpu().numpy()
        return text_values
