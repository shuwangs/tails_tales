import pool from "../db/db.js";

export const createUserInDB = async (user) => {
	const { username, email, hashedPassword } = user;

	const { rows } = await pool.query(
		`
        INSERT INTO pet_diary.users (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at`,
		[username, email, hashedPassword],
	);

	return rows[0];
};

export const getUserByEmailQuery = async (email) => {
	const { rows } = await pool.query(
		`
        SELECT id, username, email, password_hash
        FROM pet_diary.users
        WHERE LOWER(email) = LOWER($1)
        `,
		[email],
	);

	return rows[0];
};

export const createSessionQuery = async (userId, tokenHash, expiresAt) => {
	const { rows } = await pool.query(
		`
        INSERT INTO pet_diary.sessions (user_id, token_hash, expires_at)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
		[userId, tokenHash, expiresAt],
	);

	return rows[0];
};

export const deleteSessionQuery = async (tokenHash) => {
	await pool.query(`DELETE FROM pet_diary.sessions WHERE token_hash = $1`, [
		tokenHash,
	]);
};

export const getSessionUserQuery = async (tokenHash) => {
	const { rows } = await pool.query(
		`
        SELECT u.id, u.username, u.email
        FROM pet_diary.sessions AS s
        JOIN pet_diary.users AS u ON u.id = s.user_id
        WHERE s.token_hash = $1
          AND s.expires_at > NOW()
        `,
		[tokenHash],
	);

	return rows[0];
};
