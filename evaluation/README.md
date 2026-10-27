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

For answerable queries, report Recall@6, MRR@6, and Precision@6. Evaluate empty-label queries separately for correct abstention; Recall and MRR are undefined for them. Most queries have only one relevant entry, so perfect Precision@6 is usually impossible when six entries are always returned. No evaluation metrics or latency measurements have been run yet.

## Planned evaluation script

The evaluation script has not been implemented yet. The next step is to create `evaluation/evaluate.mjs` and reuse `embedText` from `server/utils/embedText.js`:

```js
import { embedText } from "../server/utils/embedText.js";
```

The `.mjs` extension explicitly enables ES modules in Node.js, allowing `import` and `export` without changing the root package configuration. The script will use the application's existing `Xenova/all-MiniLM-L6-v2` model, 1,000-character truncation, mean pooling, and normalized embeddings.

The planned workflow is:

1. Load `dataset.json` and `queries.json` relative to the script using `import.meta.url`.
2. Generate embeddings for diary content and query text using `embedText`.
3. Rank all 51 diary entries by cosine similarity for each query and retain the top six.
4. Compare retrieved IDs with `relevant_diary_ids` and calculate Recall@6, MRR@6, and Precision@6 for the 40 answerable queries.
5. Save per-query rankings, similarity scores, and aggregate metrics to `evaluation/results.json`. Inspect opposite-meaning results for the negation queries and report the six empty-label queries separately.

Once the script exists and the server dependencies are installed, run it from the repository root:

```bash
node evaluation/evaluate.mjs
```

The first embedding run may require downloading the model. This offline evaluation will not require starting the API server or connecting to PostgreSQL. Establish the semantic-search baseline first, then compare it with keyword retrieval on the same corpus and queries. Neither the script nor `results.json` is currently included.
