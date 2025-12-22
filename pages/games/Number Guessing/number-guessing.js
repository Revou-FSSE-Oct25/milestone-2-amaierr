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
    randomNumber = Math.floor(Math.random() * 100) + 1;
    
    attempts = parseInt(attemptsInput.value);
    if (!attempts || attempts <= 0 || attempts > 10) {
        alert('Please enter a valid attempt.');
        return;
    }

    gameSection.classList.remove('hidden');
    remainingAttempts.textContent = `Attempts Left: ${attempts}`;
    feedback.textContent = '';
    attemptSection.classList.add('hidden');

    inputNumber.disabled = false;
    btnSubmit.classList.remove('hidden');
    btnRetry.classList.add('hidden')

    guide.textContent = 'Try to guess the secret number.'
}

function checkAttempts() {
    let attemptsInputValue = attemptsInput.value;

    if(attemptsInputValue < 1){
        attemptsInput.value = '';
    } else if(attemptsInputValue > 10){
        attemptsInput.value = attemptsInputValue.slice(0, -1);
    }
}

function submitGuess() {
    const inputNumberValue = parseInt(inputNumber.value);
    if (!inputNumberValue || inputNumberValue <= 0 || inputNumberValue > 100) {
        alert('Please enter a valid attempt.');
        return;
    }

    attempts--;


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

    document.getElementById('remainingAttempts').innerText = `Remaining Attempts: ${attempts}`;
    
    if(attempts === 0 && inputNumberValue != randomNumber){
        feedback.textContent = `Game Over! The number was ${randomNumber}.`;
        inputNumber.disabled = true;
        btnSubmit.classList.add('hidden'); // Hide submit button
        btnRetry.classList.remove('hidden'); // Apply retry button
    }

    inputNumber.value = '';
}

function checkGuess() {
    let inputValue = inputNumber.value;

    if(inputValue < 1){
        inputNumber.value = '';
    } else if(inputValue > 100){
        inputNumber.value = inputValue.slice(0, -1);
    }
}

function restartGame() {
    gameSection.classList.add('hidden');
    attemptSection.classList.remove('hidden');

    attemptsInput.value = '';
    guide.textContent = 'Set your number of attempts.'
}