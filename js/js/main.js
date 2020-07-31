//write small functions!!


/*------Constants------*/

/*------Variables------*/
let secretNum, guessList, isWinner, currentGuess;
//winner will be a boolean


/*------Cached Element References------*/
const messageEl = document.getElementById('message');
const guessEl = document.getElementById('prevGuesses');
const guessBtn = document.getElementById('guessButton');
const resetBtn = document.getElementById('resetButton');
const guessInput = document.getElementById('guessInput');
const titleEl = document.querySelector('h1');


/*------Event Listeners------*/
    //reset button
resetBtn.addEventListener('click', function() {
    init();
});
    //submit button
guessBtn.addEventListener('click', function() {
    if(guessList.length === 0) { //thus the first guess
        guessEl.innerText = 'Previous Guesses';
    }
    if(isWinner === false) {
        checkGuess(parseInt(guessInput.value));
    }
});
    //on enter key
guessBtn.addEventListener('keyup', function(e){
    if(e.keyCode === 13){
        e.preventDefault();
    }
})
    



/*------Functions------*/
init(); //calling it here so it's at the top and calls immediately

// Initialization function sets all state variables for a new game--call before any other function
function init(){
    messageEl.className = '';
    guessEl.innerText = ''; //clears guesses from prev game from this div....easy way to remove all appended children from an element
    messageEl.innerText = "Please enter a number between 1 and 100!";
    guessInput.value = '';
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*100) + 1;
}

//check guess 
function checkGuess(guess) {
    //guess logic
    if (guess<1 || guess>100){
        messageEl.innerText = 'Whoops! Please enter a number between 1 and 100';
    } else if (guess === secretNum) {
        //win scenrio
        messageEl.className = 'winner';
        titleEl.className = 'animate__animated animate__bounce';
        isWinner = true;
        confetti.start(2000);
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`
        }
    } else if (guess < secretNum) {
        //handle guess is too low
        messageEl.innerText = `Your guess of ${guess} is too low.`
        messageEl.className = 'low';
        guessList.push(guess);
    } else {
        // handle guess is too high
        messageEl.innerText = `Your guess of ${guess} is too high.`
        messageEl.className = 'high';
        guessList.push(guess);
    }
    render(guess);
}

function render(guess){
    //append a child div to the guessel div based on whetehr guess is high/low than secretnum
    if (guess === secretNum) {
        let div = document.createElement('div');
        div.innerText = guess;
        div.className = 'winner';
        guessEl.appendChild(div);
    } else if(guess > secretNum) {
        //create new div then append to parent div in red
        let div = document.createElement('div');
        div.innerText = guess;
        div.className = 'high';
        guessEl.appendChild(div);
    } else {
        let div = document.createElement('div');
        div.innerText = guess;
        div.className = 'low';
        guessEl.appendChild(div);
    }

}


// Write a render function to display the list of previous guesses on the page. Append an element to the cached guesses element, also adding a class name indicating whether it is higher or lower than the secret number.