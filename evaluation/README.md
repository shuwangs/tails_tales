# Semantic search evaluation data

- `dataset.json`: 51 synthetic English diary entries for Milo, a cat. Entry 51, "Relaxing Evening" (2026-09-20), describes Milo enjoying being brushed with three different brushes and feeling relaxed.
- `queries.json`: 46 English search queries (40 answerable, 6 with no relevant entries), including eight queries that contrast positive and negative statements. All 46 queries include relevance rationales.
- `annotations.md`: supporting relevance notes. Its query table covers q001–q046, with a reverse mapping for all 51 diary entries.

The queries focus on recalling everyday experiences: play, food preferences, weather, visitors, training, celebrations, home life, and occasional discomfort. Natural-language questions are retrieval inputs; this dataset does not evaluate generated answers or date arithmetic.

## Relevance policy

Search all 51 entries for Milo. Judge relevance using `content` only, matching the application's current embedding input. Do not embed query labels, diary categories, titles, or review notes.

A relevant entry directly supports the requested event or experience. For a multi-concept query, all key conditions must be present. Merely sharing a topic is insufficient: healthy ears do not answer a query for ear discomfort, and calmly sleeping during thunder does not answer a query for hiding because of thunder. Empty `relevant_diary_ids` means no entry supports that event.

`category` describes the primary retrieval challenge; categories can overlap conceptually. `rationale` explains the expected IDs and selected confusing alternatives. IDs are references into `dataset.json`, not database IDs. This is an offline corpus and requires no database seeding.

## Review status and use

These queries and labels were drafted by an AI assistant by reading the diary content, without running MiniLM retrieval. They are provisional labels for human review, not independently verified human annotations. Review relevance IDs before reporting evaluation results.

The current file is a development draft, not a held-out benchmark. After reviewing labels, separate development and test queries before tuning similarity thresholds. Group queries for closely related events together when splitting to reduce overlap. Do not select thresholds using final test results.

For answerable queries, report Recall@6, MRR@6, and Precision@6. Evaluate empty-label queries separately for correct abstention; Recall and MRR are undefined for them. Most queries have only one relevant entry, so perfect Precision@6 is usually impossible when six entries are always returned. The initial retrieval metrics are reported below. Latency and abstention performance have not been measured.

## Run the evaluation

The workflow uses JavaScript to generate retrieval results and Python to analyze them:

- `evaluate.mjs` reuses `embedText` from `server/utils/embedText.js`, embeds diary content and queries, and ranks all 51 entries by cosine similarity. It saves the top six results for each query to `results.json`.
- `results.json` stores model metadata and per-query `top_entries`, each containing an `id` and `similarity`. It contains retrieval output, not aggregate evaluation metrics.
- `analyze.py` reads the saved results and joins them to `queries.json` by `query_id` to obtain relevance labels. It prints aggregate metrics, missing relevant IDs, and rankings for q023 and q030.

The embedding implementation uses `Xenova/all-MiniLM-L6-v2`, 1,000-character truncation, mean pooling, and normalized 384-dimensional vectors. The `.mjs` extension enables ES modules so the script can import the existing backend function.

Install the server dependencies if needed, then run these commands from the repository root:

```bash
npm ci --prefix server
node evaluation/evaluate.mjs
python3 evaluation/analyze.py
```

Python uses only the standard library. The first embedding run may require downloading the model. No API server or PostgreSQL connection is needed: similarity is calculated in memory. This evaluates embedding retrieval quality, not database queries or pet-isolation behavior.

To reanalyze an unchanged saved run, execute only the Python command. If the corpus or queries change, regenerate the retrieval results before analyzing them. The analyzer reads current relevance labels from `queries.json`, so keep the results and labels from the same evaluation version.

## Initial semantic-search baseline

The saved run was generated at `2026-10-30T05:44:26.610Z`. Metrics are macro-averages over the 40 answerable queries; the six queries with no relevant entries are excluded.

| Metric | Result | Meaning |
| --- | --- | --- |
| Recall@6 | 0.9500 | Average fraction of relevant entries retrieved in the top six |
| MRR@6 | 0.8217 | Average reciprocal rank of the first relevant result; zero if none appears in the top six |
| Precision@6 | 0.1750 | Average number of relevant results divided by six |

Most queries have only one relevant entry, so Precision@6 is limited by the fixed six-result output. MRR is a ranking metric, not a percentage of correct queries. The six empty-label queries are counted separately, but no abstention threshold or abstention metric has been implemented.

### Failure analysis

Two answerable queries missed their relevant entries entirely in the top six:

| Query | Expected diary ID | Retrieved IDs, in rank order |
| --- | --- | --- |
| q023: Greeting me excitedly when I got home | 33 | 36, 24, 17, 9, 51, 27 |
| q030: Not feeling like playing, even with his favorite toy | 9 | 12, 30, 45, 19, 37, 23 |

For q023, results include interactions with visitors and the owner but miss the specific homecoming greeting. The exact cause has not been established.

For q030, the highest-ranked entry describes having plenty of energy and playing with toys, the opposite of the requested behavior. The retrieved list suggests that play-related similarity outweighed the negative condition in this example.

These are observations from a small synthetic development dataset, not evidence of performance on real user traffic or a held-out test set. No keyword baseline comparison has been run yet. The next step is to compare keyword retrieval on the same content, queries, and top-six cutoff, then investigate improvements without changing relevance labels merely to improve scores.
