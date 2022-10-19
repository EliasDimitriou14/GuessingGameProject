let secretNumber;
let numAttempts;

//Create the interface to communicate with the user
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Function that creates random number between a given range of min and max inclusivly
function randomIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

//Function to define the number of guessing attempts
const askLimit = max => {
    rl.question("Enter a min number of attempts: ", min => {
        console.log("A random  number of attempts between " + min + " and " + max + " has been set...");
        numAttempts = randomIntRange(Number(min), Number(max));
        rl.question("Enter a max number: ", askRange);
    });
};


//Function to define the range of numbers that the secret number is within
const askRange = max => {
    rl.question("Enter a min number: ", min => {
        console.log("I'm thinking of a number between " + min + " and " + max + "...");
        secretNumber = randomIntRange(Number(min), Number(max));
        rl.question("Enter a guess: ", askGuess);
    });
};


//Function to ask the user to guess the secret number
const askGuess = num => {
    let res = checkGuess(Number(num));
    if(res === false){
        numAttempts--;
        if(numAttempts === 0){
            console.log("You Lose...");
            rl.close();
            return;
        }
        rl.question("Enter a guess: ", askGuess);
    }else{
        console.log("You win!");
        rl.close();
    }
};

//Function to check whether the guess of the user is correct or not
const checkGuess = num => {
    if(num > secretNumber){
        console.log("Too high");
        return false;
    }else if(num < secretNumber){
        console.log("Too low");
        return false;
    }else{
        console.log("Correct");
        return true;
    }
};

//Game start!!!!
rl.question("Enter a max number of attempts: ", askLimit);
