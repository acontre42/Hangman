/*
const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'development.env')
});
*/
import path from 'path'; // *** 
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
dotenv.config({
    override: true,
    path: path.join(__dirname, 'development.env')
});

//const {Client, Pool} = require('pg');
/*
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});
*/
import pg from 'pg'; // ***
const pool = new pg.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

export async function getNumMovies() {
    const client = await pool.connect();
    try {
        let queryString = 'SELECT COUNT(title) AS numMovies FROM movie';
        let {rows} = await client.query(queryString);
        const numMovies = parseInt(rows[0]['nummovies']);
        if (numMovies < 1) {
            throw new Error('Empty database');
        }
        else {
            //console.log(numMovies);
            return numMovies;
        }
    }
    catch(err) {
        console.log(`ERROR: ${err}`);
        return -1;
    }
    finally {
        client.release();
    }
}

export async function getRandomMovie(max) {
    if (!max || isNaN(max)) {
        max = await getNumMovies();
    }

    const client = await pool.connect();
    try {
        let randomId = Math.floor(Math.random() * max) + 1;
        let queryString = 
        `SELECT title, year, wiki_link, im_link 
        FROM movie 
        JOIN wikipedia_link
        ON movie.id = wikipedia_link.movie_id
        JOIN imdb_link
        ON movie.id = imdb_link.movie_id
        WHERE id = ${randomId}`;
        let {rows} = await client.query(queryString);
        //console.log(randomId, rows[0]['title'], rows[0]['year'], rows[0]['wiki_link'], rows[0]['im_link']);

        return {
            index: randomId,
            title: rows[0]['title'],
            year: rows[0]['year'],
            wiki_link: rows[0]['wiki_link'],
            imdb_link: rows[0]['im_link']
        };
    }
    catch(err) {
        console.log(err);
        return null;
    }
    finally {
        client.release();
    }
}

export async function getAllMovies() {
    const client = await pool.connect();
    try {
        let queryString = 'SELECT * FROM movie';
        let {rows} = await pool.query(queryString);
        let allMovies = [];
        rows.forEach((row) => {
            allMovies.push({
                id: row['id'],
                title: row['title'],
                year: row['year']
            })
        });
        return allMovies;
    }
    catch (err) {
        console.log(err);
        return [];
    }
    finally {
        client.release();
    }
}

export async function getMovieById(id) {
    if (!id || isNaN(id)) {
        console.log('ERROR: id is not a valid number');
        return null;
    }

    const client = await pool.connect();
    try {
        const queryString = `SELECT * FROM movie WHERE id = ${id}`;
        let {rows} = await pool.query(queryString);
        if (!rows[0]) {
            console.log(`ERROR: no movie with id ${id}`);
            return null;
        }

        let movie = {
            id: rows[0]['id'],
            title: rows[0]['title'],
            year: rows[0]['year']
        };
        return movie;
    }
    catch(err) {
        console.log(err);
        return null;
    }
    finally {
        client.release();
    }
}