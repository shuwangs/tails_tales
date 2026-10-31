import argparse
import json
from pathlib import Path
from datetime import timezone,datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = Path(__file__).resolve().parent
parser = argparse.ArgumentParser(description="Generate TF-IDF retrieval rankings")
parser.add_argument("--output-dir", type=Path, default=BASE_DIR / "results")

args = parser.parse_args()
args.output_dir.mkdir(parents=True, exist_ok=True)

with (BASE_DIR / "data" / "dataset.json").open("r") as file:
    dataset = json.load(file)

with(BASE_DIR / "data" / "queries.json").open("r") as file:
    queries = json.load(file)

# use the content for TF-IDF vectorization as the vector search.
contents = [entry["content"] for entry in dataset]

vectorizer = TfidfVectorizer()

# generate TF-IDF matrix for the diary entries
tfidf_matrix = vectorizer.fit_transform(contents)

# use the TF-IDF matrix to compute cosine similarity between queries and diary entries
query_vectors = vectorizer.transform([query["query"] for query in queries])

#print("Diary vectors:", diary_vectors.shape)
print("Query vectors:", query_vectors.shape)


TOP_K = 6

all_scores = cosine_similarity(query_vectors, tfidf_matrix)

results = []

for query_idx, query in enumerate(queries):
    query_scores = all_scores[query_idx]

    top_indices = sorted(
        range(len(dataset)),
        key=lambda idx: (-float(query_scores[idx]), dataset[idx]["id"])
    )[:TOP_K]


    results.append({
        "query_id": query["query_id"],
        "query": query["query"],
        "category": query["category"],
        "top_entries": [
            {
                "id": dataset[index]["id"],
                "similarity": float(all_scores[query_idx][index]),
            }
            for index in top_indices
        ],
    })

output = {
    "metadata": {
        "model": "TF-IDF (scikit-learn defaults)",
        "top_k": TOP_K,
        "diary_count": len(dataset),
        "query_count": len(queries),
        "generated_at": datetime.now(timezone.utc).isoformat(),
    },
    "results": results,
}

with (args.output_dir / "keyword_results.json").open(
    "w", encoding="utf-8"
) as file:
    json.dump(output, file, indent=2, ensure_ascii=False)

print(f"\nSaved {len(results)} queries to {args.output_dir / 'keyword_results.json'}")
