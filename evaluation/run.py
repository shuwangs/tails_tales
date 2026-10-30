"""Run retrieval evaluation and write comparable Markdown/JSON reports."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import subprocess
import sys

from analyze import BASE_DIR, analyze_results, load_json, validate_data


def render_report(report):
    semantic, keyword = report["methods"].values()
    k = semantic["metadata"]["top_k"]
    lines = ["# Retrieval evaluation", "", f"Generated: {report['generated_at']}",
             f"Mode: **{report['mode']}**", "",
             f"Corpus: {report['diary_count']} synthetic entries; "
             f"{semantic['answerable_queries']} answerable and "
             f"{semantic['no_answer_queries']} no-answer queries.", "",
             "| Metric | Semantic | TF-IDF | Semantic − TF-IDF |",
             "| --- | ---: | ---: | ---: |"]
    for label, key in [("Recall", "recall"), ("MRR", "mrr"), ("Precision", "precision")]:
        lines.append(f"| {label}@{k} | {semantic[key]:.4f} | {keyword[key]:.4f} | "
                     f"{report['delta'][key]:+.4f} |")
    for name, summary in report["methods"].items():
        metadata = summary["metadata"]
        lines.extend(["", f"## {name}", "", f"Model: {metadata['model']}",
                      f"Ranking generated: {metadata['generated_at']}", "",
                      "Queries with missing relevant entries:", ""])
        for row in summary["failures"]:
            lines.append(f"- {row['query_id']}: {row['query']} — missing "
                         f"{row['missing_ids']}; retrieved {row['retrieved_ids']}")
        if not summary["failures"]:
            lines.append("None.")
    lines.extend(["", "## Complementary retrieval", "",
                  "These queries retrieve at least one relevant entry with only one method.", ""])
    for name, ids in report["exclusive_hits"].items():
        lines.append(f"- {name}: {', '.join(ids) or 'None'}")
    lines.extend(["", "## Limits", "",
                  "Small synthetic development set with provisional AI-drafted relevance labels; "
                  "not a held-out benchmark or real-user performance estimate. "
                  "No-answer queries are excluded from retrieval averages; abstention, latency, "
                  "cost, database filtering, and authorization are not evaluated.", "",
                  "Saved-results mode reanalyzes existing rankings and does not test current "
                  "model code. Input hashes identify current report inputs; legacy ranking files "
                  "do not establish which corpus version originally produced them.", ""])
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--from-saved", action="store_true", help="Analyze existing rankings without models or sklearn")
    parser.add_argument("--output-dir", type=Path, default=BASE_DIR / "reports")
    args = parser.parse_args()
    dataset = load_json(BASE_DIR / "data/dataset.json")
    queries = load_json(BASE_DIR / "data/queries.json")
    validate_data(dataset, queries)
    ranking_dir = BASE_DIR / "results" if args.from_saved else args.output_dir.resolve() / "rankings"
    if not args.from_saved:
        ranking_dir.mkdir(parents=True, exist_ok=True)
        subprocess.run(["node", str(BASE_DIR / "evaluate.mjs"), str(ranking_dir)], cwd=BASE_DIR.parent, check=True)
        subprocess.run([sys.executable, str(BASE_DIR / "keyword_baseline.py"), "--output-dir", str(ranking_dir)], cwd=BASE_DIR.parent, check=True)
    methods = {
        name: analyze_results(load_json(ranking_dir / filename), queries, dataset)
        for name, filename in [("semantic", "semantic_results.json"), ("tfidf", "keyword_results.json")]
    }
    semantic, keyword = methods.values()
    if semantic["metadata"]["top_k"] != keyword["metadata"]["top_k"]:
        raise ValueError("Methods must use the same top_k")
    hits = {name: {row["query_id"] for row in result["per_query"] if row["reciprocal_rank"] > 0}
            for name, result in methods.items()}
    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "mode": "saved-results" if args.from_saved else "full-regeneration",
        "diary_count": len(dataset), "query_count": len(queries),
        "input_sha256": {str(path): hashlib.sha256(path.read_bytes()).hexdigest()
                         for path in [BASE_DIR / "data/dataset.json", BASE_DIR / "data/queries.json",
                                      ranking_dir / "semantic_results.json", ranking_dir / "keyword_results.json"]},
        "methods": methods,
        "delta": {key: semantic[key] - keyword[key] for key in ("recall", "mrr", "precision")},
        "exclusive_hits": {"semantic": sorted(hits["semantic"] - hits["tfidf"]),
                           "tfidf": sorted(hits["tfidf"] - hits["semantic"])},
    }
    args.output_dir.mkdir(parents=True, exist_ok=True)
    (args.output_dir / "report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (args.output_dir / "report.md").write_text(render_report(report), encoding="utf-8")
    print(f"Reports saved to {args.output_dir.resolve()}")


if __name__ == "__main__":
    main()
