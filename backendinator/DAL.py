import milvusdal as md                       
import numpy as np

class DAL:
    def __init__(self):
        self.milvus = md.MilvusDAL()
        # self.mongo = mg.MongoDAL()

    def insert(self, database: str, *args):
        for data in args:
            match(database):
                case 'milvus':
                    self.milvus.insert(data=data)
                case 'mongo':
                    pass
                    # mongo.insert(data=args)

    def delete(self, database: str, *args):
        for data in args:
            match(database):
                case 'milvus':
                    self.milvus.delete(search=data)
                case 'mongo':
                    # self.mongo.delete(search=data)
                    pass

    def query(self, database: str, *args):
        for data in args:
            match(database):
                case 'milvus':
                    self.milvus.query(search=data)
                case 'mongo':
                    # self.mongo.query(search=data)
                    pass