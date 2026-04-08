
import pool from "../db/db.js";
import { embedText } from "../utils/embedText.js";

const backfillEmbedding = async () => {
    try {
        const result = await pool.query(
            `SELECT id, content 
            FROM pet_diary.diary_entries
            WHERE embedding IS NULL
            `
        );

        const entries = result.rows;

        for (const entry in entries) {
            if (!entry.content) continue;

            const emb = await embedText(entry.content);

            await pool.query(`
                UPDATE pet_diary.diary_entries
                SET embedding = $1
                WHERE id = $2`,
                [JSON.stringify(emb), entry.id]);

            console.log("Updated entry for entry: ", entry.id);

        }
        console.log("Backfill finished");
    } catch (error) {
        console.log("Backfill failed, ", error.message);
    }
}
backfillEmbedding();