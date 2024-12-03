import milvusdal as md
import AIinator as ai

dal = md.MilvusDAL()
dal.load_collection()

embedded = ai.embed_text("Animals")

print(dal.query(embedded))
