import pool from "../db/db.js";
import { embedText } from "../utils/embedText.js";

export const getEntriesByPetIdQuery = async (petId) => {
	const { rows } = await pool.query(
		`
      SELECT *
      FROM pet_diary.diary_entries
      WHERE pet_id = $1
      ORDER BY entry_date DESC, created_at DESC

      `,
		[petId],
	);
	console.log("In petModels, getEntriesByPetIdQuery: ", rows);
	return rows;
};

export const addEntriesByPetIdQuery = async (petId, entry) => {
	const { title, mood, content, cover_image_url, entry_date } = entry;
	const embedding = await embedText(content);
	const vectorEmbedding = embedding ? `[${embedding.join(",")}]` : null;

	const { rows } = await pool.query(
		`
        INSERT INTO pet_diary.diary_entries (pet_id, title, mood, content, cover_image_url, entry_date, embedding)
        VALUES ($1, $2,  $3, $4, $5, $6, $7)
        RETURNING *
        `,
		[petId, title, mood, content, cover_image_url, entry_date, vectorEmbedding],
	);
	console.log("In petModels, addEntriesByPetIdQuery: ", rows);
	return rows[0];
};
