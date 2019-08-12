var wordChoices = {
    austrailia: ["c", "a", "n", "b", "e", "r", "r", "a"],
    unitedStates: ["w", "a", "s", "h", "i", "n", "g", "t", "o", "n"], //Problem with noun must be fixed... indexOf only catches the first occurrence of the letter. It breaks after that... need a for loop to replace all occurrences of letters
    russia: ["m", "o", "s", "c", "o","w"],
    china: ["b","e","i","j","i","n","g"],
    japan: ["t","o","k","y","o"],
    canada: ["o","t","t","a","w","a"],
    france: ["p","a","r","i","s"],
    cuba: ["h","a","v","a","n","a"]
}

var winCount = 0;
var guessesRemaining = 15;

var guessedLetters;

var chosenWordNumber; //Generates a random integer equivalent less than or equal to count of properties in the object
var chosenWordProperty;  //Uses chosenWordNumber to pick a property from object
var chosenWordValue; //uses chosenWordProperty to pick array value from object

var currentWord;

function newWord() {
    chosenWordNumber = Math.floor(Math.random() * Object.keys(wordChoices).length);
    chosenWordProperty = Object.keys(wordChoices)[chosenWordNumber];
    chosenWordValue = wordChoices[chosenWordProperty];
    currentWord = Array(wordChoices[chosenWordProperty].length).fill("_");
    guessedLetters = [];
}

document.onkeyup = function (event) {
    var userGuess = event.key;
    guessedLetters.push(userGuess);

    if (chosenWordValue.indexOf(userGuess) === -1) {
        guessesRemaining--;
        if (guessesRemaining === 0) {
            newWord();
            alert("You've lost. Try Again!");
            winCount = 0;
            guessesRemaining = 15;
            guessedLetters = [];
        };
    }

    else if (chosenWordValue.indexOf(userGuess) !== -1) {

        for (i = chosenWordValue.indexOf(userGuess); i <= chosenWordValue.lastIndexOf(userGuess); i++) {
            currentWord[chosenWordValue.indexOf(userGuess,i)] = userGuess;
        }

        //currentWord[chosenWordValue.indexOf(userGuess)] = userGuess;
        if (currentWord.indexOf("_") === -1 && winCount < 5) {
            newWord();
            winCount++;
        }
        if (winCount === 5) {
            newWord();
            alert("Congratulations! You win! Play again!");
            winCount = 0;
            guessesRemaining = 15;
        };
    }

    document.getElementById("winCount").textContent = winCount;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;
    document.getElementById("currentWord").textContent = currentWord.join(" ");
    document.getElementById("guessedLetters").textContent = guessedLetters;
    document.getElementById("clueText").textContent = chosenWordProperty;
}




