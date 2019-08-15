var wordChoices = {
    australia: "canberra",
    united_states: "washington",
    russia: "moscow",
    china: "beijing",
    japan: "tokyo",
    canada: "ottawa",
    france: "paris",
    cuba: "havana",
    united_arab_emirates: "abu dhabi",
    egypt: "cairo",
    mexico: "mexico city",
    saudi_arabia: "riyadh",
    south_korea: "seoul",
    italy: "rome",
    venezuela: "caracas",
    united_kingdom: "london",
    somalia: "mogadishu",
    new_zealand: "wellington"
}

var wordImages = {
    australia: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Australia_with_AAT_%28orthographic_projection%29.svg/375px-Australia_with_AAT_%28orthographic_projection%29.svg.png",
    united_states: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/USA_orthographic.svg/330px-USA_orthographic.svg.png",
    russia: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Russian_Federation_2014_%28orthographic_projection%29_with_Crimea.svg/330px-Russian_Federation_2014_%28orthographic_projection%29_with_Crimea.svg.png",
    china: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/CHN_orthographic.svg/330px-CHN_orthographic.svg.png",
    japan: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Japan_%28orthographic_projection%29.svg/330px-Japan_%28orthographic_projection%29.svg.png",
    canada: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/CAN_orthographic.svg/330px-CAN_orthographic.svg.png",
    france: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/EU-France_%28orthographic_projection%29.svg/330px-EU-France_%28orthographic_projection%29.svg.png",
    cuba: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/CUB_orthographic.svg/375px-CUB_orthographic.svg.png",
    united_arab_emirates: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/United_Arab_Emirates_%28orthographic_projection%29.svg/375px-United_Arab_Emirates_%28orthographic_projection%29.svg.png",
    egypt: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/EGY_orthographic.svg/375px-EGY_orthographic.svg.png",
    mexico: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/MEX_orthographic.svg/330px-MEX_orthographic.svg.png",
    saudi_arabia: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Saudi_Arabia_%28orthographic_projection%29.svg/375px-Saudi_Arabia_%28orthographic_projection%29.svg.png",
    south_korea: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Republic_of_Korea_%28orthographic_projection%29.svg/330px-Republic_of_Korea_%28orthographic_projection%29.svg.png",
    italy: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/EU-Italy_%28orthographic_projection%29.svg/330px-EU-Italy_%28orthographic_projection%29.svg.png",
    venezuela: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Venezuela_Orthographic_Map.svg/375px-Venezuela_Orthographic_Map.svg.png",
    united_kingdom: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/EU-United_Kingdom_%28orthographic_projection%29.svg/330px-EU-United_Kingdom_%28orthographic_projection%29.svg.png",
    somalia: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Somalia_%28orthographic_projection%29.svg/375px-Somalia_%28orthographic_projection%29.svg.png",
    new_zealand: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/NZL_orthographic_NaturalEarth.svg/375px-NZL_orthographic_NaturalEarth.svg.png"
}

var chosenWordImage

var wins = 0;
var losses = 0;

var winningScore = 5;
var guessesRemaining = 15;

var score = 0;
var guessedLetters;

var chosenWordHistory = [];

var chosenWordNumber; //Generates a random integer equivalent less than or equal to count of properties in the object
var chosenWordProperty;  //Uses chosenWordNumber to pick a property from object
var chosenWordValue; //uses chosenWordProperty to pick array value from object

var currentWord;

function newWord() {
    if (chosenWordHistory.length === Object.keys(wordChoices).length) {
            chosenWordHistory = [];
        } // If all the words (properties) in the wordChoice object have been used, clear array to start again    
    for (i = 0; (chosenWordHistory.length === 0 && i === 0) || (chosenWordHistory.length > 0 && chosenWordHistory.indexOf(chosenWordNumber) !== -1); i++) {
        chosenWordNumber = Math.floor(Math.random() * Object.keys(wordChoices).length);
    } //Ensures that the word is only selected once per game.

    chosenWordProperty = Object.keys(wordChoices)[chosenWordNumber];
    chosenWordValue = wordChoices[chosenWordProperty];
    currentWord = Array(wordChoices[chosenWordProperty].length).fill("_");

    for (i = chosenWordValue.indexOf(" "); i <= chosenWordValue.lastIndexOf(" "); i++) {
        currentWord[chosenWordValue.indexOf(" ", i)] = "&nbsp;";
    } //Auto replace _ with a space for object values that contain spaces

    chosenWordImage = wordImages[chosenWordProperty];
    guessedLetters = [];
    chosenWordHistory.push(chosenWordNumber);

    pageContent();
}

function pageContent() {
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("score").textContent = score;
    //document.getElementById("winningScore").textContent = winningScore;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;
    document.getElementById("currentWord").innerHTML = currentWord.join(" ");
    document.getElementById("guessedLetters").textContent = guessedLetters.join(" ");
    document.getElementById("clueText").textContent = chosenWordProperty.replace(/_/g, " ");
    document.getElementById("wordImage").src = chosenWordImage;
}

document.onkeyup = function (event) {
    var message = "Welcome! Press any lowercase letter to start!";
    
    var userGuess = event.key;

    var acceptedKeys = "abcdefghijklmnopqrstuvwxyz"
    //var acceptedKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    if (acceptedKeys.indexOf(userGuess) !== -1) {
        message = "Correct!";
        if (guessedLetters.indexOf(userGuess) === -1){
        guessedLetters.push(userGuess);
        message = "Wrong letter... try again!";
        } //Only push letter to guessedLetter array if it hasn't already been guessed
        
        
        if (chosenWordValue.indexOf(userGuess) === -1) {
            guessesRemaining--;
            if (guessesRemaining === 0) {
                message = "You've lost... try again!";
                losses++;
                newWord();
                score = 0;
                guessesRemaining = 15;
                guessedLetters = [];
            }
        }

        else if (chosenWordValue.indexOf(userGuess) !== -1) {

            for (i = chosenWordValue.indexOf(userGuess); i <= chosenWordValue.lastIndexOf(userGuess); i++) {
                currentWord[chosenWordValue.indexOf(userGuess, i)] = userGuess;
            }

            if (currentWord.indexOf("_") === -1 && score < winningScore) {
                message = "Nicely done... here's you next country!";
                score++;
                newWord();
            }

            if (score === winningScore) {
                message = "You've won! Play again!";
                wins++;
                score++;
                //chosenWordHistory = []; //Clear chosenWordHistory BEFORE selecting new word for next round
                newWord();
                score = 0;
                guessesRemaining = 15;
            }
        }
    }

    else {
        alert("Use lowercase letters only")
    }
    document.getElementById("message").textContent = message;
    pageContent();
}

