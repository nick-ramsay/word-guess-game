var wordChoices = {
    austrailia: ["c", "a", "n", "b", "e", "r", "r", "a"],
    united_states: ["w", "a", "s", "h", "i", "n", "g", "t", "o", "n"], //Problem with noun must be fixed... indexOf only catches the first occurrence of the letter. It breaks after that... need a for loop to replace all occurrences of letters
    russia: ["m", "o", "s", "c", "o", "w"],
    china: ["b", "e", "i", "j", "i", "n", "g"],
    japan: ["t", "o", "k", "y", "o"],
    canada: ["o", "t", "t", "a", "w", "a"],
    france: ["p", "a", "r", "i", "s"],
    cuba: ["h", "a", "v", "a", "n", "a"],
    united_arab_emirates: ["a","b","u"," ","d","h","a","b","i"]
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
    united_arab_emirates: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/United_Arab_Emirates_%28orthographic_projection%29.svg/375px-United_Arab_Emirates_%28orthographic_projection%29.svg.png"
}

var chosenWordImage


var winningScore = 5;
var guessesRemaining = 15;

var score = 0;


var guessedLetters;

var chosenWordHistory = [];

/*if (chosenWordHistory.length === winningScore) {
    chosenWordHistory = [];
} // If all the words (properties) in the wordChoice object have been used, clear array to start again.*/

var chosenWordNumber; //Generates a random integer equivalent less than or equal to count of properties in the object
var chosenWordProperty;  //Uses chosenWordNumber to pick a property from object
var chosenWordValue; //uses chosenWordProperty to pick array value from object

var currentWord;

function newWord() {
    for (i = 0; (chosenWordHistory.length === 0 && i === 0) || (chosenWordHistory.length > 0 && chosenWordHistory.indexOf(chosenWordNumber) !== -1); i++) {
        chosenWordNumber = Math.floor(Math.random() * Object.keys(wordChoices).length);
    } //Ensures that the word is only selected once per game.
    
    chosenWordProperty = Object.keys(wordChoices)[chosenWordNumber];
    chosenWordValue = wordChoices[chosenWordProperty];
    currentWord = Array(wordChoices[chosenWordProperty].length).fill("_");
    
    for (i = chosenWordValue.indexOf(" "); i <= chosenWordValue.lastIndexOf(" "); i++) {
        currentWord[chosenWordValue.indexOf(" ", i)] = "\s";
    } //Auto replace _ with a space for object values that contain spaces

    chosenWordImageProperty = Object.keys(wordImages)[chosenWordNumber];
    chosenWordImage = wordImages[chosenWordImageProperty];
    guessedLetters = [];
    chosenWordHistory.push(chosenWordNumber);

    document.getElementById("score").textContent = score;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;
    document.getElementById("currentWord").textContent = currentWord.join(" ");
    document.getElementById("guessedLetters").textContent = guessedLetters;
    document.getElementById("clueText").textContent = chosenWordProperty.replace(/_/g," ");
    
    document.getElementById("wordImage").src = chosenWordImage;
}

document.onkeyup = function (event) {
    var userGuess = event.key;

    var acceptedKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    if (acceptedKeys.indexOf(userGuess) !== -1) {
        guessedLetters.push(userGuess);
        if (chosenWordValue.indexOf(userGuess) === -1) {
            guessesRemaining--;
            if (guessesRemaining === 0) {
                newWord();
                alert("You've lost. Try Again!");
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
                score++;
                newWord();     
            }

            if (score === winningScore) {
                score++;
                chosenWordHistory = []; //Clear chosenWordHistory BEFORE selecting new word for next round
                newWord();
                alert("Congratulations! You win! Play again!");
                score = 0;
                guessesRemaining = 15;
            }
        }
    }

    else {
        alert("Make another guess... Use only lower-case alphabetical characters");
    }

    console.log(chosenWordHistory.length);
    console.log(Object.keys(wordChoices).length);
    console.log(chosenWordHistory);

    document.getElementById("score").textContent = score;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;
    document.getElementById("currentWord").textContent = currentWord.join(" ");
    document.getElementById("guessedLetters").textContent = guessedLetters;
    document.getElementById("clueText").textContent = chosenWordProperty.replace(/_/g," ");
    
    document.getElementById("wordImage").src = chosenWordImage;
}

