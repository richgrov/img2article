import milvusdal as md 
#import mongodal as mg                      

class DAL:
    def __init__(self):
        self.milvus = md.MilvusDAL()
        #self.mongo = mg.MongoDAL()

    def insert(self, id, text, embeddedText):
        if id % 1000 == 0:
            print(str(id) + ": " + text)

        self.milvus.insert(id, text, embeddedText)
        #self.mongo.insert({
        #    "_id": id,
        #    "text": text
        #})

    def query(self, embedding):
        return self.milvus.query(search=embedding)
        #self.mongo.query(search=query_mongo.data['_id'])