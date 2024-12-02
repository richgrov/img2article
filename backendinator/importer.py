import DAL as d
import AIinator as ai

with open("", "r") as fuckRichardDieRightNow:
    for i, line in enumerate(fuckRichardDieRightNow):
        stuff = {
            "id" : i,
            "embed-text" : ai.embed_text(line),
            "text" : line
        }
        d.DAL.insert(stuff)