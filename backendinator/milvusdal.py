from pymilvus import (
    MilvusClient,
    model,
    DataType
)

collection_name = "wikipedia_data"
dimensions = 512

class MilvusDAL:

    def __init__(self, uri='http://localhost:19530', token="root:Milvus"):
        self.client = MilvusClient("milvus_demo.db")
        # self.client = MilvusClient(uri=uri, token=token)

        if (not self.client.has_collection(collection_name)):
            schema = MilvusClient.create_schema(auto_id=False, enable_dynamic_field=True)
            schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
            schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=255)
            schema.add_field(field_name="vectors", datatype=DataType.FLOAT_VECTOR, dim=512)

            self.client.create_collection(
                collection_name=collection_name,
                schema=schema,
                dimension=dimensions
            )

    def load_collection(self):
        self.client.load_collection(collection_name=collection_name)

    def temp_create_index(self):
        index_params = MilvusClient.prepare_index_params()
        index_params.add_index(
            field_name="vectors",
            metric_type="L2",
            index_type="IVF_FLAT",
            index_name="vector_index",
            params={"nlist", 128}
        )

        self.client.create_index(collection_name=collection_name, index_params=index_params)
    
    def insert(self, id, title, vectors):
        try:
            self.client.insert(collection_name, [{
              "id": id,
               "title": title,
               "vectors": vectors
          }])
        except Exception as e:
            print(e)

    def query(self, search):
        return self.client.search(
            collection_name=collection_name,
            data=[search],
            limit=5,
            anns_field="vectors",
            output_fields=["id", "title"],
            search_params={
                "metric_type":"IP",
                "params": {"nprobe": 10}
            }
        )

    