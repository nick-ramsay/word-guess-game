var wordChoices = {
    verb: ["v", "e", "r", "b"],
    noun: ["n", "o", "u", "n"], //Problem with noun must be fixed... indexOf only catches the first occurrence of the letter. It breaks after that... need a for loop to replace all occurrences of letters
    vowel: ["v", "o", "w", "e", "l"]
}

console.log(wordChoices.vowel); //Returns property value
console.log(wordChoices.vowel.length); //Finds length of property's value
console.log(Object.keys(wordChoices)[0]); //Returns the first property in the object
console.log(Object.keys(wordChoices).length); //Returns count of properties in object

var winCount = 0;
var guessesRemaining = 15;
var guessedLetters = [];
console.log(guessedLetters);

var chosenWordNumber = Math.floor(Math.random() * Object.keys(wordChoices).length); //Generates a random integer equivalent less than or equal to count of properties in the object
console.log(chosenWordNumber);

var chosenWordProperty = Object.keys(wordChoices)[chosenWordNumber]; //Uses chosenWordNumber to pick a property from object
console.log(chosenWordProperty);

var chosenWordValue = wordChoices[chosenWordProperty]; //uses chosenWordProperty to pick array value from object
console.log(chosenWordValue);

currentWord = Array(wordChoices[chosenWordProperty].length).fill("_");
console.log(currentWord);

document.onkeyup = function (event) {
    var userGuess = event.key;
    guessedLetters.push(userGuess);

    if (chosenWordValue.indexOf(userGuess) === -1) {
        guessesRemaining--;
        if (guessesRemaining === 0) {
            chosenWordNumber = Math.floor(Math.random() * Object.keys(wordChoices).length);
            chosenWordProperty = Object.keys(wordChoices)[chosenWordNumber];
            chosenWordValue = wordChoices[chosenWordProperty];
            currentWord = Array(wordChoices[chosenWordProperty].length).fill("_");
            alert("You've lost. Try Again!");
            winCount = 0;
            guessesRemaining = 15;
            guessedLetters = [];
        };
    }

    else if (chosenWordValue.indexOf(userGuess) !== -1) {
        currentWord[chosenWordValue.indexOf(userGuess)] = userGuess;
        if (currentWord.indexOf("_") === -1 && winCount < 5) {
            chosenWordNumber = Math.floor(Math.random() * Object.keys(wordChoices).length);
            chosenWordProperty = Object.keys(wordChoices)[chosenWordNumber];
            chosenWordValue = wordChoices[chosenWordProperty];
            currentWord = Array(wordChoices[chosenWordProperty].length).fill("_");
            guessedLetters = [];
            winCount++;
        }
        if (winCount === 5) {
            chosenWordNumber = Math.floor(Math.random() * Object.keys(wordChoices).length);
            chosenWordProperty = Object.keys(wordChoices)[chosenWordNumber];
            chosenWordValue = wordChoices[chosenWordProperty];
            currentWord = Array(wordChoices[chosenWordProperty].length).fill("_");
            alert("Congratulations! You win! Play again!");
            winCount = 0;
            guessesRemaining = 15;
            guessedLetters = [];
        };
    }


    document.getElementById("winCount").textContent = winCount;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;
    document.getElementById("currentWord").textContent = currentWord.join(" ");
    document.getElementById("guessedLetters").textContent = guessedLetters;
    console.log(chosenWordValue.indexOf(userGuess));

}
/*document.getElementById("userGuess").textContent = "Your Guess: "+ userGuess;*/



