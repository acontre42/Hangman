CREATE DATABASE hangman_movies;

CREATE TABLE movie(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    year SMALLINT NOT NULL
);

INSERT INTO movie (title, year) 
VALUES 
    ('Detective Pikachu', 2019),
    ('It Follows', 2014),
    ('Orphan: First Kill', 2022),
    ('Charlie and the Chocolate Factory', 2005),
    ('Pride & Prejudice', 2005), -- 5
    ('Lady Bird', 2017),
    ('Tangled', 2010), 
    ('The Great Gatsby', 2013),
    ('Emma.', 2020),
    ('Mamma Mia!', 2008), -- 10
    ('Why Him?', 2016),
    ('Monsters, Inc.', 2001),
    ('I, Tonya', 2017),
    ('House of Wax', 2005),
    ('The Parent Trap', 1998), -- 15
    ('Mrs. Doubtfire', 1993), 
    ('The Devil Wears Prada', 2006), 
    ('Jurassic Park', 1993), 
    ('Moulin Rouge!', 2001),
    ('Dungeons & Dragons: Honor Among Thieves', 2023), -- 20
    ('Alien: Romulus', 2024), 
    ('Repo! The Genetic Opera', 2008), 
    ('Paranormal Activity: The Marked Ones', 2014), 
    ('Angus, Thongs and Perfect Snogging', 2008), 
    ('Baby Driver', 2017), -- 25
    ('As Above, So Below', 2014), 
    ('The Crow', 1994), 
    ('Freaky Friday', 2003), 
    ('The Mummy Returns', 2001), 
    ('The Lost Boys', 1987), -- 30
    ('When a Stranger Calls', 1979);

CREATE TABLE wikipedia_link(
    movie_id INT PRIMARY KEY REFERENCES movie NOT NULL,
    wiki_link VARCHAR(255) NOT NULL
);

INSERT INTO wikipedia_link 
VALUES
    (1, 'https://en.wikipedia.org/wiki/Detective_Pikachu_(film)'),
    (2, 'https://en.wikipedia.org/wiki/It_Follows'), 
    (3, 'https://en.wikipedia.org/wiki/Orphan:_First_Kill'), 
    (4, 'https://en.wikipedia.org/wiki/Charlie_and_the_Chocolate_Factory_(film)'), 
    (5, 'https://en.wikipedia.org/wiki/Pride_%26_Prejudice_(2005_film)'), 
    (6, 'https://en.wikipedia.org/wiki/Lady_Bird_(film)'), 
    (7, 'https://en.wikipedia.org/wiki/Tangled'), 
    (8, 'https://en.wikipedia.org/wiki/The_Great_Gatsby_(2013_film)'), 
    (9, 'https://en.wikipedia.org/wiki/Emma_(2020_film)'), 
    (10, 'https://en.wikipedia.org/wiki/Mamma_Mia!_(film)'), 
    (11, 'https://en.wikipedia.org/wiki/Why_Him%3F'), 
    (12, 'https://en.wikipedia.org/wiki/Monsters,_Inc.'), 
    (13, 'https://en.wikipedia.org/wiki/I,_Tonya'), 
    (14, 'https://en.wikipedia.org/wiki/House_of_Wax_(2005_film)'), 
    (15, 'https://en.wikipedia.org/wiki/The_Parent_Trap_(1998_film)'), 
    (16, 'https://en.wikipedia.org/wiki/Mrs._Doubtfire'), 
    (17, 'https://en.wikipedia.org/wiki/The_Devil_Wears_Prada_(film)'), 
    (18, 'https://en.wikipedia.org/wiki/Jurassic_Park_(film)'), 
    (19, 'https://en.wikipedia.org/wiki/Moulin_Rouge!'), 
    (20, 'https://en.wikipedia.org/wiki/Dungeons_%26_Dragons:_Honor_Among_Thieves'), 
    (21, 'https://en.wikipedia.org/wiki/Alien:_Romulus'), 
    (22, 'https://en.wikipedia.org/wiki/Repo!_The_Genetic_Opera'), 
    (23, 'https://en.wikipedia.org/wiki/Paranormal_Activity:_The_Marked_Ones'), 
    (24, 'https://en.wikipedia.org/wiki/Angus,_Thongs_and_Perfect_Snogging'), 
    (25, 'https://en.wikipedia.org/wiki/Baby_Driver'), 
    (26, 'https://en.wikipedia.org/wiki/As_Above,_So_Below_(film)'), 
    (27, 'https://en.wikipedia.org/wiki/The_Crow_(1994_film)'), 
    (28, 'https://en.wikipedia.org/wiki/Freaky_Friday_(2003_film)'), 
    (29, 'https://en.wikipedia.org/wiki/The_Mummy_Returns'), 
    (30, 'https://en.wikipedia.org/wiki/The_Lost_Boys'), 
    (31, 'https://en.wikipedia.org/wiki/When_a_Stranger_Calls_(1979_film)');

CREATE TABLE imdb_link(
    movie_id INT PRIMARY KEY REFERENCES movie NOT NULL,
    im_link VARCHAR(255) NOT NULL
);

INSERT INTO imdb_link (movie_id, im_link)
VALUES
    (1, 'https://www.imdb.com/title/tt5884052/'),
    (2, 'https://www.imdb.com/title/tt3235888/'),
    (3, 'https://www.imdb.com/title/tt11851548/'),
    (4, 'https://www.imdb.com/title/tt0367594/'),
    (5, 'https://www.imdb.com/title/tt0414387/'), 
    (6, 'https://www.imdb.com/title/tt4925292/'), 
    (7, 'https://www.imdb.com/title/tt0398286/'), 
    (8, 'https://www.imdb.com/title/tt1343092/'), 
    (9, 'https://www.imdb.com/title/tt9214832/'), 
    (10, 'https://www.imdb.com/title/tt0795421/'), 
    (11, 'https://www.imdb.com/title/tt4501244/'), 
    (12, 'https://www.imdb.com/title/tt0198781/'), 
    (13, 'https://www.imdb.com/title/tt5580036/'), 
    (14, 'https://www.imdb.com/title/tt0397065/'), 
    (15, 'https://www.imdb.com/title/tt0120783/'), 
    (16, 'https://www.imdb.com/title/tt0107614/'), 
    (17, 'https://www.imdb.com/title/tt0458352/'), 
    (18, 'https://www.imdb.com/title/tt0107290/'), 
    (19, 'https://www.imdb.com/title/tt0203009/'), 
    (20, 'https://www.imdb.com/title/tt2906216/'), 
    (21, 'https://www.imdb.com/title/tt18412256/'), 
    (22, 'https://www.imdb.com/title/tt0963194/'), 
    (23, 'https://www.imdb.com/title/tt2473682/'), 
    (24, 'https://www.imdb.com/title/tt0963743/'), 
    (25, 'https://www.imdb.com/title/tt3890160/'), 
    (26, 'https://www.imdb.com/title/tt2870612/'), 
    (27, 'https://www.imdb.com/title/tt0109506/'), 
    (28, 'https://www.imdb.com/title/tt0322330/'), 
    (29, 'https://www.imdb.com/title/tt0209163/'), 
    (30, 'https://www.imdb.com/title/tt0093437/'), 
    (31, 'https://www.imdb.com/title/tt0080130/');

SELECT title, year, wiki_link, im_link
FROM movie
JOIN wikipedia_link
ON movie.id = wikipedia_link.movie_id
JOIN imdb_link
ON movie.id = imdb_link.movie_id;