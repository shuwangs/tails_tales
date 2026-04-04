import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

let pool;
if (process.env.db_connection) {
	pool = new Pool({
		connectionString: process.env.db_connection,
	});
} else {
	pool = new Pool({
		host: process.env.PGHOST,
		user: process.env.PGUSER,
		database: process.env.PGDATABASE,
		port: process.env.PGPORT,
	});
}
export default pool;
