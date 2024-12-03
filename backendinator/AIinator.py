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
    return embed_images(list(image))

def embed_text(text_str: str) -> np.ndarray:
    return embed_texts(list(text_str))

def embed_images(images: list) -> np.ndarray:
    images = torch.stack([preprocess(image) for image in images]).to(device)

    with torch.no_grad():
        image_embeddings = model.encode_image(images)
        image_values = image_embeddings.cpu().numpy()
        return image_values

def embed_texts(texts: list) -> np.ndarray:
    texts = clip.tokenize(texts).to(device)

    with torch.no_grad():
        text_embeddings = model.encode_text(texts)
        text_values = text_embeddings.cpu().numpy()
        return text_values