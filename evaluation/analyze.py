import json
from pathlib import Path
from statistics import mean

BASE_DIR = Path(__file__).resolve().parent

with (BASE_DIR / "results.json").open("r") as file:
    results = json.load(file)

with(BASE_DIR / "queries.json").open("r") as file:
    queries = json.load(file)

queries_by_id = {query["query_id"]: query for query in queries}
k = results["metadata"]["top_k"]

metrics = []
no_answer_results = []

for result in results["results"]:
    query_id = result["query_id"]
    query = queries_by_id[query_id]
    expected = set(query["relevant_diary_ids"])
    retrieved = [entry["id"] for entry in result["top_entries"][:k]]

    # if the query has no relevant diary entries, skip it
    if not expected:
        no_answer_results.append(result)
        continue

    hits = set(retrieved) & expected

    # rank of the first relevant diary entry in the retrieved list
    first_relevant_rank = None
    for rank, entry_id in enumerate(retrieved, start=1):
        if entry_id in expected:
            first_relevant_rank = rank
            break

    metrics.append({
        "query_id": query["query_id"],
        "query": query["query"],
        "recall": len(hits) / len(expected),
        "precision": len(hits) / k,
        "reciprocal_rank": (
            1 / first_relevant_rank if first_relevant_rank else 0
        ),
        "missing_ids": sorted(expected - set(retrieved)),
    })

    if not metrics:
        raise ValueError("No answerable queries found.")

print(f"Answerable queries: {len(metrics)}")
print(f"No-answer queries: {len(no_answer_results)}")
print(f"Recall@{k}: {mean(row['recall'] for row in metrics):.4f}")
print(f"MRR@{k}: {mean(row['reciprocal_rank'] for row in metrics):.4f}")
print(f"Precision@{k}: {mean(row['precision'] for row in metrics):.4f}")

print("\nQueries with missing relevant entries:")
for row in metrics:
    if row["missing_ids"]:
        print(
            f"{row['query_id']}: {row['query']}\n"
            f"  Missing IDs: {row['missing_ids']}"
        )


print("\nFailed query rankings:")

for result in results["results"]:
    if result["query_id"] in {"q023", "q030"}:
        print(f"\n{result['query_id']}: {result['query']}")

        for rank, entry in enumerate(result["top_entries"], start=1):
            print(
                f"  {rank}. Diary {entry['id']} "
                f"(score={entry['similarity']:.4f})"
            )