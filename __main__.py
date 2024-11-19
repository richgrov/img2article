from pymilvus import MilvusClient, model

client = MilvusClient("milvus_demo.db")

if client.has_collection(collection_name="test"):
    client.drop_collection(collection_name="test")

client.create_collection(collection_name="test", dimension=768)

embedding_fn = model.DefaultEmbeddingFunction()

docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

vectors = embedding_fn.encode_documents(docs)

print("Dim:", embedding_fn.dim, vectors[0].shape)

data = [
    {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"}
    for i in range(len(vectors))
]

print("Data has", len(data), "entities, each with fields: ", data[0].keys())
print("Vector dim:", len(data[0]["vector"]))

result = client.insert(collection_name="test", data=data)
print(result)

query_vectors = embedding_fn.encode_queries(["Who is Alan Turing?"])

res = client.search(
    collection_name="test",
    data=query_vectors,
    limit=2,
    output_fields=["text", "subject"],
)

print(res)
