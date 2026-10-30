"""Small hand-calculated fixtures for metrics and invalid evaluation inputs."""
import copy
import unittest

from analyze import analyze_results


class EvaluationTests(unittest.TestCase):
    def setUp(self):
        self.dataset = [{"id": 1}, {"id": 2}, {"id": 3}]
        self.queries = [
            {"query_id": "a", "query": "first", "relevant_diary_ids": [1, 3]},
            {"query_id": "b", "query": "second", "relevant_diary_ids": [3]},
            {"query_id": "c", "query": "absent", "relevant_diary_ids": []},
        ]
        self.results = {
            "metadata": {"top_k": 2, "diary_count": 3, "query_count": 3},
            "results": [
                {"query_id": query["query_id"], "query": query["query"],
                 "top_entries": [{"id": 2, "similarity": 0.9}, {"id": 1, "similarity": 0.5}]}
                for query in self.queries
            ],
        }

    def test_metrics_exclude_no_answer_and_include_misses(self):
        result = analyze_results(self.results, self.queries, self.dataset)
        self.assertEqual(result["answerable_queries"], 2)
        self.assertEqual(result["no_answer_queries"], 1)
        self.assertEqual(result["recall"], 0.25)
        self.assertEqual(result["precision"], 0.25)
        self.assertEqual(result["mrr"], 0.25)
        self.assertEqual(result["failures"][0]["missing_ids"], [3])

    def test_invalid_inputs_are_rejected(self):
        mutations = [
            lambda r, q, d: r["results"].pop(),
            lambda r, q, d: r["results"].append(copy.deepcopy(r["results"][0])),
            lambda r, q, d: q.append(copy.deepcopy(q[0])),
            lambda r, q, d: q[0]["relevant_diary_ids"].append(99),
            lambda r, q, d: r["results"][0].update(query="changed"),
            lambda r, q, d: r["results"][0]["top_entries"][0].update(id=99),
            lambda r, q, d: r["results"][0]["top_entries"][0].update(id=1),
            lambda r, q, d: r["results"][0]["top_entries"][0].update(similarity=float("nan")),
            lambda r, q, d: r["results"][0]["top_entries"].reverse(),
            lambda r, q, d: r["metadata"].update(diary_count=99),
        ]
        for mutation in mutations:
            with self.subTest(mutation=mutation):
                r, q, d = copy.deepcopy((self.results, self.queries, self.dataset))
                mutation(r, q, d)
                with self.assertRaises(ValueError):
                    analyze_results(r, q, d)


if __name__ == "__main__":
    unittest.main()
