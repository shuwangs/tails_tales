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
	return rows[0];
};

export const getPetsByUserIdQuery = async (userId) => {
	const { rows } = await pool.query(
		`SELECT *
         FROM pet_diary.pets
         WHERE user_id = $1
         ORDER BY created_at, id`,
		[userId],
	);

	return rows;
};

export const createPetQuery = async (userId, pet) => {
	const { pet_name, animal_type, breed, age, personality_tags } = pet;

	const { rows } = await pool.query(
		`INSERT INTO pet_diary.pets
            (user_id, pet_name, animal_type, breed, age, personality_tags)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
		[
			userId,
			pet_name,
			animal_type,
			breed ?? null,
			age ?? null,
			personality_tags ?? null,
		],
	);

	return rows[0];
};