import milvusdal as md
import AIinator as ai

with open("/home/masterdash5/Downloads/data.txt", "r") as file:
    dal = md.MilvusDAL()
    array = []

    for i, line in enumerate(file):
        if (i % 2500 == 0):
            print(f"{i}: {line}")

            dal.insert(array)
            array.clear()

        array.append({
            "id": id,
            "title": line,
            "vectors": ai.embed_text(line)
        })