
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
 '2026-03-30'),


-- 😿 SAD / LOW MOOD
(1, 'Hiding Under the Bed', 'sad',
 'I stayed under the bed most of the day. I did not feel like eating or playing.',
 '2026-04-01'),

(1, 'No Appetite Today', 'sad',
 'My human gave me food but I only sniffed it and walked away. Something feels off.',
 '2026-04-02'),

(1, 'Lonely Afternoon', 'sad',
 'The house was too quiet. I waited by the door but no one came home for hours.',
 '2026-04-03'),

-- 😡 ANGRY / ANNOYED
(1, 'Vet Visit Betrayal', 'angry',
 'They put me in a box and took me to the vet. I do not trust them anymore.',
 '2026-04-04'),

(1, 'Bath Time Disaster', 'angry',
 'They tried to wash me again. I fought back. This is unacceptable.',
 '2026-04-05'),

-- 😸 HAPPY / PLAYFUL
(1, 'Zoomies Night', 'happy',
 'I ran across the house at full speed and jumped on everything. Best night ever.',
 '2026-04-06'),

(1, 'Favorite Toy Found', 'happy',
 'I found my favorite toy under the couch. I played with it for hours.',
 '2026-04-07'),

(1, 'Sunbeam Nap', 'happy',
 'I slept in a warm sunbeam by the window. Life is perfect.',
 '2026-04-08'),

-- 🤔 CURIOUS / NEUTRAL
(1, 'Strange Noise Investigation', 'curious',
 'I heard a strange noise from the kitchen and spent 20 minutes investigating it.',
 '2026-04-09'),

(1, 'New Box Appeared', 'curious',
 'A new box appeared in the living room. I inspected it from every angle.',
 '2026-04-10'),

-- 😨 FEARFUL
(1, 'Vacuum Monster', 'scared',
 'The loud vacuum monster came out again. I hid until it was gone.',
 '2026-04-11'),

(1, 'Thunderstorm Panic', 'scared',
 'There was a loud thunderstorm outside. I stayed close to my human.',
 '2026-04-12'),

-- 🍽️ FOOD RELATED
(1, 'Midnight Snack Success', 'happy',
 'I managed to steal some food from the table when no one was looking.',
 '2026-04-13'),

(1, 'Refused Dinner Again', 'sad',
 'Dinner did not look appealing. I walked away without eating.',
 '2026-04-14');
