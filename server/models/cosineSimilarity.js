import pool from "../db/db.js";

export const calCosineSimilarity = async (petId, searchEmb) => {
    const { rows } = await pool.query(
        `
        SELECT 
        id, pet_id, title, mood, content, cover_image_url, entry_date, embedding, 
        1 - (embedding <=> $1) AS cosine_similarity
        FROM pet_diary.diary_entries
        WHERE pet_id = $2 
            AND embedding IS NOT NULL
        ORDER BY cosine_similarity DESC
        LIMIT 6
        `, [JSON.stringify(searchEmb), petId])

    return rows;
}