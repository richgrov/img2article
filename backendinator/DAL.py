import milvusdal as md 
import mongodal as mg                      

class DAL:
    def __init__(self):
        self.milvus = md.MilvusDAL()
        self.mongo = mg.MongoDAL()

    def insert(self, data: dict):
        self.milvus.insert(data=[data['id'], data['embed-text']])
        self.mongo.insert(data=[data['id'], data['text']])

    def query(self, embedding):
        query_mongo = self.milvus.query(search=embedding)
        self.mongo.query(search=query_mongo.data['id'])
