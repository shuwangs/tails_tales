"""Validate retrieval runs and calculate macro-averaged metrics."""
import argparse
import json
import math
from pathlib import Path
from statistics import mean

BASE_DIR = Path(__file__).resolve().parent


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def unique_index(rows, key, name):
    index = {row[key]: row for row in rows}
    if len(index) != len(rows):
        raise ValueError(f"Duplicate {key} in {name}")
    return index


def validate_data(dataset, queries):
    diaries = unique_index(dataset, "id", "dataset")
    unique_index(queries, "query_id", "queries")
    if not diaries or not queries:
        raise ValueError("Dataset and queries must not be empty")
    for query in queries:
        expected = query["relevant_diary_ids"]
        if len(expected) != len(set(expected)) or set(expected) - diaries.keys():
            raise ValueError(f"Invalid relevance IDs: {query['query_id']}")
    return diaries


def analyze_results(results, queries, dataset):
    diaries = validate_data(dataset, queries)
    queries_by_id = unique_index(queries, "query_id", "queries")
    runs = unique_index(results["results"], "query_id", "results")
    if runs.keys() != queries_by_id.keys():
        raise ValueError("Results must contain exactly the current query IDs")
    metadata = results["metadata"]
    k = metadata["top_k"]
    if type(k) is not int or not 0 < k <= len(diaries):
        raise ValueError("Invalid top_k")
    if metadata["diary_count"] != len(diaries) or metadata["query_count"] != len(queries):
        raise ValueError("Result metadata counts do not match current data")
    metrics = []
    for query_id, query in queries_by_id.items():
        result = runs[query_id]
        if result["query"] != query["query"]:
            raise ValueError(f"Query text changed: {query_id}; regenerate results")
        entries = result["top_entries"]
        retrieved = [entry["id"] for entry in entries]
        if len(retrieved) != k or len(set(retrieved)) != k or set(retrieved) - diaries.keys():
            raise ValueError(f"Invalid ranked IDs: {query_id}")
        scores = [entry["similarity"] for entry in entries]
        if not all(isinstance(s, (int, float)) and math.isfinite(s) for s in scores):
            raise ValueError(f"Invalid scores: {query_id}")
        if scores != sorted(scores, reverse=True):
            raise ValueError(f"Results not ranked by descending score: {query_id}")
        expected = set(query["relevant_diary_ids"])
        if not expected:
            continue

        # get hits
        hits = expected & set(retrieved)

        # get rank of first relevant entry in the retrieved list (1-based)
        first_rank = next((rank for rank, entry_id in enumerate(retrieved, 1)
                           if entry_id in expected), None)
        metrics.append({
            "query_id": query_id, "query": query["query"],
            "recall": len(hits) / len(expected), "precision": len(hits) / k,
            "reciprocal_rank": 1 / first_rank if first_rank else 0,
            "missing_ids": sorted(expected - set(retrieved)),
            "retrieved_ids": retrieved,
        })

    # if not found
    if not metrics:
        raise ValueError("No answerable queries found")
    
    return {
        "metadata": metadata,
        "answerable_queries": len(metrics),
        "no_answer_queries": len(queries) - len(metrics),
        "recall": mean(row["recall"] for row in metrics),
        "mrr": mean(row["reciprocal_rank"] for row in metrics),
        "precision": mean(row["precision"] for row in metrics),
        "failures": [row for row in metrics if row["missing_ids"]],
        "per_query": metrics,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("filename", nargs="?", default="semantic_results.json")
    args = parser.parse_args()
    summary = analyze_results(load_json(BASE_DIR / "results" / args.filename),
                              load_json(BASE_DIR / "data/queries.json"),
                              load_json(BASE_DIR / "data/dataset.json"))
   
    print(f"Answerable queries: {summary['answerable_queries']}")
    print(f"No-answer queries: {summary['no_answer_queries']}")

    for label, key in [("Recall", "recall"), ("MRR", "mrr"), ("Precision", "precision")]:
        print(f"{label}@{summary['metadata']['top_k']}: {summary[key]:.4f}")
    
    
    print("\nQueries with missing relevant entries:")
    for row in summary["failures"]:
        print(f"{row['query_id']}: {row['query']}\n  Missing IDs: {row['missing_ids']}"
              f"\n  Retrieved IDs: {row['retrieved_ids']}")


if __name__ == "__main__":
    main()
