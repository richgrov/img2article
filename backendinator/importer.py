import DAL as d
import AIinator as ai

with open("", "r") as file:
    for i, line in enumerate(file):
        data = {
            "id" : i,
            "embed-text" : ai.embed_text(line),
            "text" : line
        }
        d.DAL.insert(data)