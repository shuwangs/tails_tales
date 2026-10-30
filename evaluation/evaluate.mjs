import { mkdir, readFile, writeFile } from 'fs/promises';
import { resolve } from 'node:path';

const outputDir = process.argv[2] ? resolve(process.argv[2]) : new URL('./results/', import.meta.url);
await mkdir(outputDir, { recursive: true });
import { embedText } from '../server/utils/embedText.js';

const dataset = JSON.parse(await readFile(new URL('./data/dataset.json', import.meta.url), 'utf-8'));
const queries = JSON.parse(await readFile(new URL('./data/queries.json', import.meta.url), 'utf-8'));

const diaryEmbeddings = [];
for (const entry of dataset) {
    diaryEmbeddings.push({
        id: entry.id,
        embedding: await embedText(entry.content),
    });
}

const queryEmbeddings = [];
for (const query of queries) {
    queryEmbeddings.push({
        query_id: query.query_id,
        embedding: await embedText(query.query),
    });
}


function cosineSimilarity(a, b) {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] ** 2;
        normB += b[i] ** 2;
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);
    return denominator === 0 ? 0 : dot / denominator;
}

const TOP_K = 6;

const results = queries.map((query, idx) => {
    const queryVector = queryEmbeddings[idx].embedding;

    const topEntries = diaryEmbeddings
        .map(entry => ({
            id: entry.id,
            similarity: cosineSimilarity(queryVector, entry.embedding),
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, TOP_K);

    return {
        query_id: query.query_id,
        query: query.query,
        category: query.category,
        expected_id: query.expected_id,
        top_entries: topEntries,
    }
})

const output = {
    metadata: {
        model: "Xenova/all-MiniLM-L6-v2",
        top_k: TOP_K,
        diary_count: dataset.length,
        query_count: queries.length,
        generated_at: new Date().toISOString(),
    },
    results,
}

await writeFile(process.argv[2] ? resolve(outputDir, 'semantic_results.json') : new URL('./results/semantic_results.json', import.meta.url),
    JSON.stringify(output, null, 2), 'utf-8');

console.log(`Saved ${results.length} semantic query results`);
