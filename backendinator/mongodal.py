from mongo import MongoClient

database_name = "img2article"
collection_name = "wikipedia-data"

class MongoDAL:

    def __init__(self, uri="mongodb://localhost:27017/"):
        self.client = MongoClient(uri);
        self.database = self.client[database_name]
        self.collection = self.database[collection_name]

    def insert(self, data):
        self.collection.insert(data)

    def delete(self, search):
        self.collection.delete_many(search)

    def query(self, search):
        self.collection.find(search)