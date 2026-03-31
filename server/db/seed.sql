
SET search_path TO pet_diary;

-- USERS
INSERT INTO pet_diary.users (username, email)
VALUES 
('shu', 'shu@example.com');

-- PETS
INSERT INTO pet_diary.pets (user_id, pet_name, animal_type, breed, age)
VALUES
(1, 'Bobo', 'cat', 'Ragdoll', 6);

-- DIARY ENTRIES
INSERT INTO pet_diary.diary_entries (pet_id, title, mood, content, entry_date)
VALUES
(1, 'Bird Surveillance', 'curious',
 'Today my human opened the window, of course the net is there. I observed birds for a full hour.',
 '2026-03-30'),

(1, 'Food Delay Incident', 'angry',
 'Breakfast was 5 minutes late. Unacceptable behavior. spit on her',
 '2026-03-31'),

(1, 'Park Adventure', 'happy',
 'Went to the park and chased everything that moved, then I got terrified by a giant man.',
 '2026-03-30');