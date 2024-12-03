import clip
import numpy as np
import torch
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# FOR TESTING PURPOSES
# image = preprjcess(Image.open("CLIP.png")).unsqueeze(0).to(device)
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
        return image_values.astype(np.float32)


def embed_text(text_str: str) -> np.ndarray:
    return embed_texts(list(text_str))


def embed_texts(texts: list) -> np.ndarray:
    texts = clip.tokenize(texts).to(device)

    with torch.no_grad():
        text_embedding = model.encode_text(texts)
        text_values = text_embedding.flatten().cpu().numpy()
        return text_values.astype(np.float32)
