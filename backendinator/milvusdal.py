from pymilvus import (
    MilvusClient,
    model
)

collection_name = "wikipedia-data"
dimensions = 256

class MilvusDAL:

    def __init__(self, uri='http://localhost:19530', token="root:Milvus"):
        self.client = MilvusClient("milvus_demo.db")
        # self.client = MilvusClient(uri=uri, token=token)
        self.embedding_fn = model.DefaultEmbeddingFunction()

        if (not self.client.has_collection(collection_name)):
            self.client.create_collection(
                collection_name=collection_name,
                dimension=dimensions
            )
    
    def insert(self, data):
        self.client.insert(collection_name=collection_name, data=data)

    def delete(self, search):
        self.client.delete(collection_name=collection_name, filter=search)

    def query(self, search):
        return self.client.search(
            collection_name=collection_name,
            data=self.embedding_fn.encode_queries([search]),
            limit=5
        )

    