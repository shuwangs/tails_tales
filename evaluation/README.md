# Semantic search evaluation data

- `data/dataset.json`: 51 synthetic English diary entries for Milo, a cat. Entry 51, "Relaxing Evening" (2026-09-20), describes Milo enjoying being brushed with three different brushes and feeling relaxed.
- `data/queries.json`: 46 English search queries (40 answerable, 6 with no relevant entries), including eight queries that contrast positive and negative statements. All 46 queries include relevance rationales.
- `data/annotations.md`: supporting relevance notes. Its query table covers q001–q046, with a reverse mapping for all 51 diary entries.

The queries focus on recalling everyday experiences: play, food preferences, weather, visitors, training, celebrations, home life, and occasional discomfort. Natural-language questions are retrieval inputs; this dataset does not evaluate generated answers or date arithmetic.

## One-command comparison report

From the repository root:

```bash
# Fast: validate and compare the checked-in rankings (Python standard library only)
python3 evaluation/run.py --from-saved

# Full: install dependencies once, then regenerate both retrieval methods
npm ci --prefix server
python3 -m pip install -r evaluation/requirements.txt
python3 evaluation/run.py
```

Both modes write `evaluation/reports/report.md` and `report.json`. Use
`--output-dir /path/to/reports` to choose another directory. Full mode writes fresh
rankings under that directory's `rankings/` subdirectory and preserves the
checked-in baseline files. Model downloads may require network access on the
first run. A failed subprocess or invalid evaluation input exits nonzero.

Reports include macro Recall@6, MRR@6, Precision@6, semantic-minus-TF-IDF deltas,
per-query metrics, missing relevant IDs, complementary retrieval hits, model/run
metadata, and SHA-256 hashes of report inputs. These hashes identify report inputs;
legacy saved rankings do not prove corpus provenance. Saved mode checks query
texts and IDs, but cannot detect every stale ranking after corpus edits. Regenerate
rankings whenever corpus, queries, or retrieval code changes.

The analyzer rejects duplicate IDs, unknown relevance/ranking IDs, missing or extra
queries, changed query text, mismatched counts, invalid scores, and malformed rankings.
No-answer queries remain excluded from retrieval averages; abstention is not measured.

### GitHub Actions

The existing CI workflow now runs evaluation unit tests and saved-results analysis
on pushes and pull requests. It displays the Markdown report in the run's **Summary**
and uploads reports and rankings as the `retrieval-evaluation` artifact.
For fresh model inference, open **Actions → CI → Run workflow** and enable
`full_evaluation`. This installs Node/Python dependencies and downloads MiniLM;
it requires neither a database nor API keys. Full regeneration runs on CPU and
may take longer than saved analysis.

Saved-results CI validates data and analysis, not changes to model behavior.
There is no quality threshold: a lower score is reported rather than automatically
rejected. Neither mode evaluates database queries, permissions, latency, or cost.

Run the hand-calculated metric and invalid-input tests with:

```bash
python3 -m unittest discover -s evaluation -p 'test_*.py'
```

## Relevance policy

Search all 51 entries for Milo. Judge relevance using `content` only, matching the application's current embedding input. Do not embed query labels, diary categories, titles, or review notes.

A relevant entry directly supports the requested event or experience. For a multi-concept query, all key conditions must be present. Merely sharing a topic is insufficient: healthy ears do not answer a query for ear discomfort, and calmly sleeping during thunder does not answer a query for hiding because of thunder. Empty `relevant_diary_ids` means no entry supports that event.

`category` describes the primary retrieval challenge; categories can overlap conceptually. `rationale` explains the expected IDs and selected confusing alternatives. IDs are references into `data/dataset.json`, not database IDs. This is an offline corpus and requires no database seeding.

## Review status and use

These queries and labels were drafted by an AI assistant by reading the diary content, without running MiniLM retrieval. They are provisional labels for human review, not independently verified human annotations. Review relevance IDs before reporting evaluation results.

The current file is a development draft, not a held-out benchmark. After reviewing labels, separate development and test queries before tuning similarity thresholds. Group queries for closely related events together when splitting to reduce overlap. Do not select thresholds using final test results.

For answerable queries, report Recall@6, MRR@6, and Precision@6. Evaluate empty-label queries separately for correct abstention; Recall and MRR are undefined for them. Most queries have only one relevant entry, so perfect Precision@6 is usually impossible when six entries are always returned. The initial retrieval metrics are reported below. Latency and abstention performance have not been measured.

## Directory structure

```text
evaluation/
├── README.md
├── requirements.txt
├── evaluate.mjs
├── keyword_baseline.py
├── analyze.py
├── run.py
├── test_analyze.py
├── data/
│   ├── dataset.json
│   ├── queries.json
│   └── annotations.md
└── results/
    ├── semantic_results.json
    └── keyword_results.json
```

Data and annotations live in `data/`; saved retrieval runs live in `results/`. The analyzer accepts a filename within `results/`, so use `semantic_results.json` or `keyword_results.json` without the directory prefix.

## Run the evaluation

The workflow uses JavaScript to generate retrieval results and Python to analyze them:

- `evaluate.mjs` reuses `embedText` from `server/utils/embedText.js`, embeds diary content and queries, and ranks all 51 entries by cosine similarity. It saves the top six results for each query to `results/semantic_results.json`.
- `results/semantic_results.json` stores model metadata and per-query `top_entries`, each containing an `id` and `similarity`. It contains retrieval output, not aggregate evaluation metrics.
- `keyword_baseline.py` fits scikit-learn’s default `TfidfVectorizer()` on diary content, transforms queries using that vocabulary and weighting, and ranks entries by cosine similarity. It saves the top six results to `results/keyword_results.json`.
- `analyze.py` reads the saved results and joins them to `data/queries.json` by `query_id` to obtain relevance labels. It prints aggregate metrics, missing relevant IDs, and rankings for q023 and q030.

The embedding implementation uses `Xenova/all-MiniLM-L6-v2`, 1,000-character truncation, mean pooling, and normalized 384-dimensional vectors. The `.mjs` extension enables ES modules so the script can import the existing backend function.

Install the server dependencies if needed, then run these commands from the repository root:

```bash
npm ci --prefix server
node evaluation/evaluate.mjs
python3 evaluation/analyze.py semantic_results.json

# Generate and analyze the keyword baseline using the same Python environment
python3 -m pip install -r evaluation/requirements.txt
python3 evaluation/keyword_baseline.py
python3 evaluation/analyze.py keyword_results.json
```

The analysis script uses only the Python standard library; generating the TF-IDF baseline requires scikit-learn. With no filename argument, `analyze.py` defaults to `results/semantic_results.json`. The first embedding run may require downloading the model. No API server or PostgreSQL connection is needed: similarity is calculated in memory. This evaluates embedding retrieval quality, not database queries or pet-isolation behavior.

To reanalyze an unchanged saved run, execute only the Python command. If the corpus or queries change, regenerate the retrieval results before analyzing them. The analyzer reads current relevance labels from `data/queries.json`, so keep the results and labels from the same evaluation version.

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

## Comparison with the TF-IDF baseline

Both methods search the same 51 diary bodies using the same queries, relevance labels, and top-six cutoff. The same analysis script calculates macro-averaged metrics for the 40 answerable queries. Neither method applies an abstention threshold.

| Metric | Semantic retrieval | Default TF-IDF | Semantic minus TF-IDF |
| --- | --- | --- | --- |
| Recall@6 | 0.9500 | 0.8750 | +0.0750 (7.5 percentage points) |
| MRR@6 | 0.8217 | 0.7417 | +0.0800 |
| Precision@6 | 0.1750 | 0.1625 | +0.0125 (1.25 percentage points) |

Semantic retrieval performs better overall on this dataset, but not on every query:

| Outcome | Queries | Observation |
| --- | --- | --- |
| Semantic retrieves the relevant entry; TF-IDF misses it | q005, q019, q020, q045 | These include wording differences such as “another cat” versus “feline housemate,” and “thunder” versus “thunderclap.” |
| TF-IDF retrieves the relevant entry; semantic misses it | q023 | TF-IDF ranks diary 33 fourth; semantic retrieval does not include it in the top six. |
| Both methods miss the relevant entry | q030 | Neither retrieves diary 9, which describes declining to play with a favorite toy. |

TF-IDF misses diaries 27, 31, 32, 9, and 31 for q005, q019, q020, q030, and q045 respectively. Its q030 results are diaries 49, 33, 30, 32, 44, and 45. The earlier semantic failure analysis suggests difficulty with negation in q030; the TF-IDF failure alone does not establish the same cause.

The analyzer and comparison report list failures dynamically from the relevance labels; q023 is a failure for semantic retrieval but a success for TF-IDF.

### Scope and next steps

These findings describe a small synthetic development dataset with provisional relevance labels, not real user traffic or a held-out test set. The comparison uses an untuned default TF-IDF baseline and does not establish superiority over tuned lexical methods. Related queries such as q019 and q045 also cover the same event, so they are not independent examples of broader coverage. Latency and correct abstention on the six empty-label queries remain unmeasured.

Preserve these baseline results before investigating improvements. Any tuning should use development queries, followed by evaluation on a separate event-grouped test set. Do not change relevance labels merely to improve scores.
