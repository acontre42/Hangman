"use strict";

// HTML Elements
const replayButton = document.getElementById("replayButton");
const alphabetButtons = document.getElementsByClassName("letters");
const guessSubmit = document.getElementById("guessSubmit");
const hangmanPic = document.getElementById("hangmanPic");
const blankTitle = document.getElementById("blankTitle");
const gameOverText = document.getElementById("gameOverText");
const gameOverDiv = document.getElementById("gameOverDiv");
const gameOverButton = document.getElementById("gameOverButton");
// Variables
const punctuation = ['.', ',', '!', '?', ':', '&'];
let usedLetters = [];
const MAX_GUESSES = 6; // Game ends after 6 incorrect guesses.
let movie;
let titleIndex = -1;
let chosenTitle;
let guessingBlank = ""; // Shows up on page under hangman pic
let incorrectGuesses = 0;

//SET UP STUFF
// Get random movie from server. Assign movie info to movie-related variables and elements.
async function getRandomMovieTitle() {
    try {
        const res = await fetch('/api/getrandom', {
            method: 'GET'
        });
        const data = await res.json();
        movie = data;
    }
    catch(err) {
        console.log(err);
    }

    if (movie) {
        titleIndex = movie.index;
        chosenTitle = movie.title
        console.log(titleIndex, chosenTitle);
    }
    else {
        console.log("ERROR: couldn't get movie");
        // TO DO: what to do if error
    }
    
    document.getElementById("titleP").innerText = `${movie.title} (${movie.year})`;
    document.getElementById("wikiLink").href = movie.wiki_link;
    document.getElementById("imdbLink").href = movie.imdb_link;
}
// Sets up underscores/punctuation for guessing blank.
function setUpGuessingBlank() {
    for (let i = 0; i < chosenTitle.length; i++) {
        if (chosenTitle[i] == " ") {
            guessingBlank += "&nbsp;";
        }
        else if (punctuation.includes(chosenTitle[i])) {
            guessingBlank += chosenTitle[i] + "&nbsp;";
        }
        else {
            guessingBlank += "_" + "&nbsp;";
        }
    }
    blankTitle.innerHTML = guessingBlank;
}
// Makes alphabet buttons functional. If replaying, return buttons back to normal display.
function setUpAlphabetButtons(replay = false) {
    for (let i = 0; i < alphabetButtons.length; i++) {
        alphabetButtons[i].addEventListener("click", letterClick);

        if (replay) {
            alphabetButtons[i].style.backgroundColor = "lightgreen";
            alphabetButtons[i].style.cursor = "pointer";
        }
    }
}
// Compare submitted guess to chosenTitle. End game if right, update guesses if wrong.
guessSubmit.addEventListener("click", function() {
    let guessInput = document.getElementById("guessInput");
    let submittedGuess = guessInput.value;
    console.log(submittedGuess);
    if (submittedGuess.toUpperCase() == chosenTitle.toUpperCase()) {
        guessingBlank = chosenTitle;
        blankTitle.innerHTML = guessingBlank;
        endGame(true);
    }
    else {
        updateGuesses();
    }
    guessInput.value = "";
});
// Chooses new movie title. Resets alphabet buttons and game variables.
// Hides movieInfoDiv again, show guessDiv.
replayButton.addEventListener("click", async function() {
    let currentTitleIndex = titleIndex;
    do {
        await getRandomMovieTitle();
    } while (currentTitleIndex === titleIndex); // Avoid immediate repeat.

    usedLetters = [];
    incorrectGuesses = 0;
    guessingBlank = "";

    setUpAlphabetButtons(true);
    blankTitle.innerHTML = guessingBlank;
    setUpGuessingBlank();
    updateHangman();

    let hiddenElems = document.getElementsByClassName("showAfter");
    for (let elem of hiddenElems) {
        elem.style.display = "none";
    };
    document.getElementById("guessDiv").style.display = "block";
});
// Closes game over screen.
gameOverButton.addEventListener("click", function() {
    gameOverDiv.style.display = "none";
});

// GAME STUFF
// When player guesses wrong, increment incorrectGuesses and update hangman image.
function updateGuesses() {
    incorrectGuesses++;
    updateHangman();
    
    if (incorrectGuesses === MAX_GUESSES) {
        endGame();
    }
}
// Update hangman picture based on number of incorrect guesses.
function updateHangman() {
    let imgPath = "./images/";

    switch (incorrectGuesses) {
        case 1:
            imgPath += "Hangman1.jpeg";
            break;
        case 2:
            imgPath += "Hangman2.jpeg";
            break;
        case 3:
            imgPath += "Hangman3.jpeg";
            break;
        case 4:
            imgPath += "Hangman4.jpeg";
            break;
		case 5:
            imgPath += "Hangman5.jpg";
			break;
        case 6:
            imgPath += "Hangman6.jpg";
            break;
        default:
            imgPath += "Hangman0.jpeg";
    }

    hangmanPic.src = imgPath;
}
// Function for checking if the guessed letter is in the title. If it is, check win condition.
const guessLetter = function(letter) {
    let upperTitle = chosenTitle.toUpperCase();
    let newBlank = "";
    let simplifiedBlank = ""; // Used for checking against chosenTitle
    if (upperTitle.includes(letter)){
        for (let i = 0; i < chosenTitle.length; i++){
            if (upperTitle[i] == letter || punctuation.includes(chosenTitle[i]) || usedLetters.includes(upperTitle[i])){
                newBlank += chosenTitle[i] + "&nbsp;";
                simplifiedBlank += chosenTitle[i];
            }
            else if (chosenTitle[i] == " ") {
                newBlank += "&nbsp;" + "&nbsp;";
                simplifiedBlank += " ";
            }
            else {
                newBlank += "_" + "&nbsp;" + "&nbsp;";
            }
        }
        guessingBlank = newBlank;
        blankTitle.innerHTML = guessingBlank;

        if (!guessingBlank.includes('_')) {
            if (chosenTitle === simplifiedBlank) {
                //console.log(simplifiedBlank);
                endGame(true);
            }
        }
    }
    else {
        //console.log(`${chosenTitle} does not have ${letter}`);
        updateGuesses();
    }
}
// Function for when alphabet letters are clicked. Add letter to usedLetters and remove functionality from button.
const letterClick = function(event) {
    let x = event.target.innerHTML;
    if (usedLetters.includes(x) === false) {
        usedLetters.push(x);
        guessLetter(x);
        event.target.style.backgroundColor = "red";
        event.target.style.cursor = "default";
        event.target.removeEventListener("click", letterClick);
    }
}
// Displays game over screen with replay button and appropriate outcome text.
// Display movieInfoDiv, hide guessDiv.
function endGame(win = false) {
    let text;
    let buttonText;
    if (win) {
        text = "YOU WIN";
        buttonText = "Yay!";
        gameOverText.style.color = "green";
    }
    else {
        text = "YOU LOSE";
        buttonText = "Boo!";
        gameOverText.style.color = "red";
    }
    let hiddenElems = document.getElementsByClassName("showAfter");
    for (let elem of hiddenElems) {
        elem.style.display = "block";
    };
    gameOverText.innerText = text;
    gameOverDiv.style.display = "block";
    gameOverButton.innerText = buttonText;
    document.getElementById("guessDiv").style.display = "none";
}

// MAIN
await getRandomMovieTitle();
setUpGuessingBlank();
setUpAlphabetButtons();