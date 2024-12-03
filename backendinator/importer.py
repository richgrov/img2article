import DAL as d
import AIinator as ai

with open("/home/masterdash5/Downloads/data.txt", "r") as file:
    dal = d.DAL()

    for i, line in enumerate(file):
        dal.insert(i, line, ai.embed_text(line))