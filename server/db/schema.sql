CREATE EXTENSION IF NOT EXISTS vector;

CREATE SCHEMA IF NOT EXISTS pet_diary;
SET search_path TO pet_diary , public;

DROP TABLE IF EXISTS diary_entries CASCADE;
DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- TABLE users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) UNIQUE, 
    username VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TABLE pets
CREATE TABLE pets(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_name VARCHAR(100) NOT NULL,
    animal_type VARCHAR(100) NOT NULL CHECK (animal_type IN ('cat', 'dog')),
    breed VARCHAR(100),
    age INTEGER,
    personality_tags TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TABLE diary_entries
CREATE TABLE diary_entries(
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    title VARCHAR(200),
    mood VARCHAR(50),
    content TEXT NOT NULL,
    cover_image_url TEXT,
    entry_date DATE NOT NULL,
    embedding VECTOR(1536),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);