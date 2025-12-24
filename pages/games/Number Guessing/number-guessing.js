let randomNumber;
let attempts;

// HTML Component Variable
let gameSection;
let attemptsInput;
let feedback;
let attemptSection;
let inputNumber;
let btnSubmit;
let btnRetry;
let guide;
let remainingAttempts;

// Get component and add event, after HTML load
window.onload = () => {
    gameSection = document.getElementById('gameSection');
    attemptsInput = document.getElementById('attemptsInput');
    feedback = document.getElementById('feedback');
    attemptSection = document.getElementById('attemptSection');
    inputNumber = document.getElementById('inputNumber');
    btnSubmit = document.getElementById('btnSubmit');
    btnRetry = document.getElementById('btnRetry');
    guide = document.getElementById('guide');
    remainingAttempts = document.getElementById('remainingAttempts');
    
    const btnStart = document.getElementById('btnStart');

    // Event listener
    attemptsInput.addEventListener("input", checkAttempts);
    btnStart.addEventListener("click", startGame);
    inputNumber.addEventListener("input", checkGuess);
    btnSubmit.addEventListener("click", submitGuess);
    btnRetry.addEventListener("click", restartGame);
};

function startGame() {
    // Generate random number from 1 to 100
    randomNumber = Math.floor(Math.random() * 100) + 1;

    // Validate user attempts input
    attempts = parseInt(attemptsInput.value);
    if (!attempts || attempts <= 0 || attempts > 10) {
        alert('Please enter a valid attempt.');
        return;
    }

    gameSection.classList.remove('hidden'); // Unhide game section
    remainingAttempts.textContent = `Attempts Left: ${attempts}`; // Display remaining attempts
    feedback.textContent = ''; // Delete existing feedback
    attemptSection.classList.add('hidden'); // Hide attempt section

    inputNumber.disabled = false; // Enable input number component
    btnSubmit.classList.remove('hidden'); // Unhide submit button
    btnRetry.classList.add('hidden') // Hide retry button

    guide.textContent = 'Try to guess the secret number.' // Change guide text
}

// Use to validate when user type desired attempts
function checkAttempts() {
    let attemptsInputValue = attemptsInput.value;

    if(attemptsInputValue < 1){
        attemptsInput.value = '';
    } else if(attemptsInputValue > 10){
        attemptsInput.value = attemptsInputValue.slice(0, -1); // Delete last user inputed number
    }
}

function submitGuess() {
    // Validate user input number
    const inputNumberValue = parseInt(inputNumber.value);
    if (!inputNumberValue || inputNumberValue <= 0 || inputNumberValue > 100) {
        alert('Please enter a valid attempt.');
        return;
    }

    // Deduct remaining attempt
    attempts--;

    // Check user number guess
    switch (true){
        case (inputNumberValue < randomNumber) :
            feedback.innerText = 'Try higher number';
            feedback.classList.remove('text-green-700');
            feedback.classList.add('text-red-700');
            break;
        case (inputNumberValue > randomNumber) :
            feedback.innerText = 'Try lower number';
            feedback.classList.remove('text-green-700');
            feedback.classList.add('text-red-700');
            break;
        default :
            feedback.innerText = `Correct! The number is ${randomNumber}.`;
            feedback.classList.add('text-green-700');
            feedback.classList.remove('text-red-700');
            btnSubmit.classList.add('hidden'); // Hide submit button
            btnRetry.classList.remove('hidden'); // Apply retry button
    }

    // Update remaining attempts
    document.getElementById('remainingAttempts').innerText = `Remaining Attempts: ${attempts}`;
    
    // Check remaining attempt and user number guess
    if(attempts === 0 && inputNumberValue != randomNumber){
        feedback.textContent = `Game Over! The number was ${randomNumber}.`;
        inputNumber.disabled = true;
        btnSubmit.classList.add('hidden'); // Hide submit button
        btnRetry.classList.remove('hidden'); // Apply retry button
    }

    inputNumber.value = '';
}

// Use to validate when user type guess
function checkGuess() {
    let inputValue = inputNumber.value;

    if(inputValue < 1){
        inputNumber.value = '';
    } else if(inputValue > 100){
        inputNumber.value = inputValue.slice(0, -1); // Delete last user inputed number
    }
}

function restartGame() {
    gameSection.classList.add('hidden'); // Hide game section
    attemptSection.classList.remove('hidden'); // Unhide attempt section

    attemptsInput.value = ''; // Set attempt input value to empty
    guide.textContent = 'Set your number of attempts.' // Change guide text
}