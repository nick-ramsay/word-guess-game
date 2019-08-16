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
    new_zealand: "wellington",
    argentina: "buenos aires",
    sweden: "stockholm",
    phillipines: "manilla",
    brazil: "brasilia"
}; //Object containing countries as properties and capitals as values, provides word used for user guesses

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
    new_zealand: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/NZL_orthographic_NaturalEarth.svg/375px-NZL_orthographic_NaturalEarth.svg.png",
    argentina: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Argentina_orthographic.svg/330px-Argentina_orthographic.svg.png",
    sweden: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/EU-Sweden_%28orthographic_projection%29.svg/330px-EU-Sweden_%28orthographic_projection%29.svg.png",
    phillipines: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/PHL_orthographic.svg/375px-PHL_orthographic.svg.png",
    brazil: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/BRA_orthographic.svg/375px-BRA_orthographic.svg.png"
}; //Object using same properties as wordChoices object but values = URL from which to retrieve image for wordChoice clue

var wins = 0; //Win count, starting at zero
var losses = 0; //Loss count, starting at zero

var winningScore = 5; //Score at which one is added to win count
var guessesAllowed = 10; //Number of guesses allowed before one is added to loss count

var guessesRemaining = 10; //Counter for remaining guesses before loss. Starts at same value as guesses allowed.

var score = 0; //Score count, starting at zero, increasing by 1 each time winningScore is reached
var guessedLetters = []; //Empty array that will store letters guessed until a win or a loss

var chosenWordHistory = []; //Keeps history of words chosen. Array is cleared when all wordChoice properties have been added to it.

var chosenWordNumber; //Generates a random integer equivalent less than or equal to count of properties in the object
var chosenWordProperty;  //Uses chosenWordNumber to pick a property from object
var chosenWordValue; //uses chosenWordProperty to pick array value from object
var chosenWordImage; //Clue image selected using chosenWordProperty

var currentWord; //Declaring variable to be used as array storing series of underscores representing un-guessed letters

var message = "Welcome! Press any lowercase letter to start!"; //Message for user. Message is overwritten each time a user selects a key.

function newWord() {
    if (chosenWordHistory.length === Object.keys(wordChoices).length) {
        chosenWordHistory = [];
    } // If all the words (properties) in the wordChoice object have been used, clear array and start a new history   
    for (i = 0; (chosenWordHistory.length === 0 && i === 0) || (chosenWordHistory.length > 0 && chosenWordHistory.indexOf(chosenWordNumber) !== -1); i++) {
        chosenWordNumber = Math.floor(Math.random() * Object.keys(wordChoices).length);
    } //Ensures that the word is only selected once per game.

    chosenWordProperty = Object.keys(wordChoices)[chosenWordNumber];
    chosenWordValue = wordChoices[chosenWordProperty];
    currentWord = Array(wordChoices[chosenWordProperty].length).fill("_");

    for (i = chosenWordValue.indexOf(" "); i <= chosenWordValue.lastIndexOf(" "); i++) {
        currentWord[chosenWordValue.indexOf(" ", i)] = "&nbsp;";
    } //Auto replace _ with a space for object values that contain spaces so users don't need to guess

    chosenWordImage = wordImages[chosenWordProperty]; //Uses property randomly picked for wordChoice to pick matching image
    guessedLetters = []; //Clears history of guessed letters
    chosenWordHistory.push(chosenWordNumber); //Once number selected to pick a chosen word property, stores number in chosenWordHistory array to not select again.

    pageContent();
}

function pageContent() {
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("score").textContent = score;
    document.getElementById("winningScore").textContent = winningScore;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;
    document.getElementById("currentWord").innerHTML = currentWord.join(" ");
    document.getElementById("guessedLetters").textContent = guessedLetters.join(" ");
    document.getElementById("clueText").textContent = chosenWordProperty.replace(/_/g, " ");
    document.getElementById("wordImage").src = chosenWordImage;
    document.getElementById("message").textContent = message;
} //DOM function responsible for populating all JS output on HTML

document.onkeyup = function (event) {
    var userGuess = event.key;
    var acceptedKeys = "abcdefghijklmnopqrstuvwxyz";

    if (acceptedKeys.indexOf(userGuess) !== -1) {
        if (guessedLetters.indexOf(userGuess) === -1) {
            guessedLetters.push(userGuess);
        } //Only push letter to guessedLetter array if it hasn't already been guessed AND it is in the acceptedKeys array

        if (chosenWordValue.indexOf(userGuess) === -1) {
            message = "Oops... wrong letter";
            guessesRemaining--;
            if (guessesRemaining === 0) {
                message = "You've lost... try again!";
                losses++;
                newWord();
                score = 0;
                guessesRemaining = guessesAllowed;
                guessedLetters = [];
            } //Action to be taken for a loss, where user uses their last remaining guess
        } //Actions to be taken if user picks a wrong letter

        else if (chosenWordValue.indexOf(userGuess) !== -1) {
            message = "Correct!";
            for (i = chosenWordValue.indexOf(userGuess); i <= chosenWordValue.lastIndexOf(userGuess); i++) {
                currentWord[chosenWordValue.indexOf(userGuess, i)] = userGuess;
            } //Action replaces respective "_" in currentWord array with the correctly guessed key value. Repeats loop until all occurences of letter are replaced.

            if (currentWord.indexOf("_") === -1 && score < winningScore) {
                message = "Nicely done! Here's your next country!";
                score++;
                newWord();
            }//Actions to be taken when user picks correct letter but hasn't reached winningScore

            if (score === winningScore) {
                message = "You win! Play again!";
                wins++;
                score++;
                //chosenWordHistory = []; //Clear chosenWordHistory BEFORE selecting new word for next round
                newWord();
                score = 0;
                guessesRemaining = guessesAllowed;
            } //Actions taken when user picks correct letter and hits winningScore
        }//Actions to be taken when user picks a correct letter
    }

    else {
        message = "Use lowercase letters only";
    } //Action to be taken (message only) if user selects an invalid key
    pageContent(); //Finally, regardless of user's selection, call pageContent() function to output result in HTML
}