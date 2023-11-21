"use strict";

// HTML Elements
const replayButton = document.getElementById("replayButton");
const alphabetButtons = document.getElementsByClassName("letters");
const guessButton = document.getElementById("guessSubmit");
const hangmanPic = document.getElementById("hangmanPic");
const blankTitle = document.getElementById("blankTitle");
const gameOverText = document.getElementById("gameOverText");
const gameOverDiv = document.getElementById("gameOverDiv");
// Variables
const punctuation = ['.', ',', '!', '?', ':', '&'];
const movieTitles = ["Detective Pikachu", "It Follows", "Orphan: First Kill",
                    "Charlie & the Chocolate Factory", "Pride & Prejudice",
                   "Lady Bird", "Tangled", "The Great Gatsby", "Emma.",
                   "Mamma Mia!", "Why Him?", "Monsters, Inc.", "I, Tonya",
                    "House of Wax", "The Parent Trap", "Mrs. Doubtfire",
                    "The Devil Wears Prada", "Jurassic Park", "Moulin Rouge!"];
let usedLetters = [];
const min = 0;
const max = movieTitles.length;
const MAX_GUESSES = 6; // Game ends after 6 incorrect guesses.
let titleIndex;
let chosenTitle;
let guessingBlank = ""; // Shows up on page under hangman pic
let incorrectGuesses = 0;

//SET UP STUFF
// Chooses random movie from movies array. Assigns titleIndex and chosenTitle.
function getRandomMovieTitle() {
    titleIndex = Math.random() * (max - min) + min;
    titleIndex = Math.floor(titleIndex);
    chosenTitle = movieTitles[titleIndex];
    //console.log(titleIndex, chosenTitle);
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
// Makes submit button functional.
function setUpGuessButton() {
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
}
// Makes replay button functional. Chooses new movie title. Resets buttons and game variables.
// Hides game over screen after being clicked.
function setUpReplayButton() {
    replayButton.addEventListener("click", function() {
        let currentTitleIndex = titleIndex;
        do {
            getRandomMovieTitle();
        } while (currentTitleIndex === titleIndex); // Avoid immediate repeat.

        usedLetters = [];
        incorrectGuesses = 0;
        guessingBlank = "";

        setUpAlphabetButtons(true);
        blankTitle.innerHTML = guessingBlank;
        setUpGuessingBlank();
        updateHangman();

        gameOverDiv.style.display = "none";
    });
}

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
    switch (incorrectGuesses) {
        case 1:
            hangmanPic.src = "./Hangman1.jpeg";
            break;
        case 2:
            hangmanPic.src = "./Hangman2.jpeg";
            break;
        case 3:
            hangmanPic.src = "./Hangman3.jpeg";
            break;
        case 4:
            hangmanPic.src = "./Hangman4.jpeg";
            break;
		case 5:
			hangmanPic.src = "./Hangman5.jpg";
			break;
        case 6:
            hangmanPic.src = "./Hangman6.jpg";
            break;
        default:
            hangmanPic.src = "./Hangman0.jpeg";
    }
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
function endGame(win = false) {
    let text;
    if (win) {
        text = "YOU WIN";
        gameOverText.style.color = "green";
    }
    else {
        text = "YOU LOSE";
        gameOverText.style.color = "red";
    }
    gameOverText.innerText = text;
    gameOverDiv.style.display = "block";
}

// MAIN
getRandomMovieTitle();
setUpGuessingBlank();
setUpAlphabetButtons();
setUpGuessButton();
setUpReplayButton();