CREATE TABLE IF NOT EXISTS song_info (
    id serial PRIMARY KEY,
    title text,
    artist text,
    genre text
);

PREPARE addSong(text, text, text) AS INSERT INTO song_info (title, artist, genre) VALUES ($1, $2, $3);
PREPARE addSong(text, text, text) AS INSERT INTO songs (title, artist, genre) VALUES ($1, $2, $3);
EXECUTE addSong('Kilby Girl', 'Backseat Lovers, The', 'Indie');
EXECUTE addSong('The Pot', 'TOOL', 'Psychadelic Prog Metal');
EXECUTE addSong('ARROWS IN WORDS FROM THE SKY', 'Machine Head', 'Groove Metal');
EXECUTE addSong('Afterthought', 'Joji', 'Sadboi');