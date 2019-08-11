var wordChoices = {
    verb:["v","e","r","b"],
    noun:["n","o","u","n"],
    vowel:["v","o","w","e","l"]
}

console.log(wordChoices.vowel); //Returns property value
console.log(wordChoices.vowel.length); //Finds length of property's value
console.log(Object.keys(wordChoices)[0]); //Returns the first property in the object
console.log(Object.keys(wordChoices).length); //Returns count of properties in object

var userScore = 0;
var wrongGuesses = 0;
var usedLetters = [];

var chosenWordNumber = Math.floor(Math.random() * Object.keys(wordChoices).length); //Generates a random integer equivalent less than or equal to count of objects in array
console.log(chosenWordNumber);

var chosenWordProperty = Object.keys(wordChoices)[chosenWordNumber];
console.log(chosenWordProperty);

var chosenWordValue = wordChoices[chosenWordProperty];
console.log(chosenWordValue);



