import pool from "../db/db.js";

export const getEntryByIdQuery = async (id) => {
	const { rows } = await pool.query(
		`
      SELECT *
      FROM pet_diary.diary_entries
      WHERE id = $1
      `,
		[id],
	);
	console.log("In models, getEntryByIdQuery: ", rows);
	return rows[0];
};

export const updateEntryQuery = async (
	id,
	title,
	mood,
	content,
	cover_image_url,
	entry_date,
	embedding,
) => {
	const { rows } = await pool.query(
		`
        UPDATE pet_diary.diary_entries
        SET 
        title = $1,
        mood = $2,
        content = $3,
        cover_image_url = $4,
        entry_date = $5,
        embedding = $6
        WHERE id = $7
        RETURNING *
        `,
		[title, mood, content, cover_image_url, entry_date, embedding, id],
	);
	console.log("In models, getEntryById : ", rows[0]);

	return rows[0];
};

export const deleteEntryByIdQuery = async (id) => {
	const { rows } = await pool.query(
		`
      DELETE 
      FROM pet_diary.diary_entries
      WHERE id = $1
      RETURNING *
      `,
		[id],
	);
	console.log("In models, deleteEntryByIdQuery : ", rows);
	return rows;
};
