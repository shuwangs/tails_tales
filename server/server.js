import app from './app.js';
import dotenv from 'dotenv';
import pool from './db/db.js';

dotenv.config();

const PORT = process.env.LISTENING_PORT || 3001;

app.listen(PORT, () => {
    console.log("Listening to port: ", PORT);
})

pool.connect()
    .then(() => console.log("PostgreSQL connected"))
    .catch(err => console.error(" connection error", err));
