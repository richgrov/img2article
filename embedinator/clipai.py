import clip
import torch
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# image = preprocess(Image.open("CLIP.png")).unsqueeze(0).to(device)
text = clip.tokenize("one two three").to(device)

with torch.no_grad():
    # image_features = model.encode_image(image)
    text_features = model.encode_text(text)

    print(text_features)