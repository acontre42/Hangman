"use strict";
import express from 'express';
const app = express();
const port = 8000;

import path from 'path'; // ***
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/public'));

import {getNumMovies, getRandomMovie, getAllMovies, getMovieById} from './public/DBFunc.js';
let numMovies = 0;



app.get('/api/movies', async (req, res) => {
    let movies = await getAllMovies();

    //localhost:8000/api/movies?key=value&key=value
    console.log(req.query);
    const {filter, value} = req.query;
    if (filter && value) { // successful filters = id, year, title
        if (filter == 'year' || filter == 'id') {
            movies = movies.filter((movie) => movie[filter] == parseInt(value));
        }
        else if (filter == 'title') {
            movies = movies.filter((movie) => {
                let lcTitle = movie[filter].toLowerCase();
                let lcValue = value.toLowerCase();
                return lcTitle == lcValue;
            });
        }
        
        if (movies.length < 1) {
            res.status(400).send();
            return;
        }
    }
    
    res.status(200).send(movies);
});

app.get('/api/movies/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send();
    }
    const movie = await getMovieById(id);
    if (!movie) {
        res.status(500).send();
    }
    else {
        res.status(200).send(movie);
    }
});

app.get('/api/getrandom', async (req, res) => {
    let movie = await getRandomMovie(numMovies);
    if (!movie) {
        res.status(500).send();
    }
    else {
        console.log(movie);
        res.status(200).send(movie);
    }
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

// Misc. Functions
async function setUp() {
    numMovies = await getNumMovies();
    console.log(`numMovies: ${numMovies}`);
    if (!numMovies || numMovies < 1) {
        return false;
    }
    else {
        return true;
    }
}