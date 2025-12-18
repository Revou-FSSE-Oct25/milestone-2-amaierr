let randomNumber;
let remainingAttempts;

function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    
    const attemptsInput = parseInt(document.getElementById('attemptsInput').value);
    if (!attemptsInput || attemptsInput <= 0 || attemptsInput > 10) {
        alert('Please enter a valid attempt.');
        return;
    }

    document.getElementById('gameSection').classList.remove('hidden');
    document.getElementById('remainingAttempts').textContent = `Attempts Left: ${remainingAttempts}`;
    document.getElementById('feedback').textContent = '';
    document.getElementById('attemptSection').classList.add('hidden');

    document.getElementById('inputNumber').disabled = false;
    document.getElementById('btnSubmit').classList.remove('hidden');
    document.getElementById('btnRetry').classList.add('hidden')

    document.getElementById('guide').textContent = 'Try to guess the secret number.'
}

function checkAttempts() {
    const attemptsInput = document.getElementById("attemptsInput")
    let attemptsInputValue = attemptsInput.value;

    if(attemptsInputValue < 1){
        attemptsInput.value = '';
    } else if(attemptsInputValue > 10){
        attemptsInput.value = attemptsInputValue.slice(0, -1);
    }
}

function submitGuess() {
    const inputNumber = parseInt(document.getElementById('attemptsInput').value);
    if (!inputNumber || inputNumber <= 0 || inputNumber > 100) {
        alert('Please enter a valid attempt.');
        return;
    }

    remainingAttempts--;


    switch (true){
        case (inputNumber < randomNumber) :
            document.getElementById("feedback").innerText = 'Try higher number';
            document.getElementById('feedback').classList.remove('text-green-700');
            document.getElementById('feedback').classList.add('text-red-700');
            break;
        case (inputNumber > randomNumber) :
            document.getElementById("feedback").innerText = 'Try lower number';
            document.getElementById('feedback').classList.remove('text-green-700');
            document.getElementById('feedback').classList.add('text-red-700');
            break;
        default :
            document.getElementById("feedback").innerText = `Correct! The number is ${randomNumber}.`;
            document.getElementById('feedback').classList.add('text-green-700');
            document.getElementById('feedback').classList.remove('text-red-700');
            document.getElementById('btnSubmit').classList.add('hidden'); // Hide submit button
            document.getElementById('btnRetry').classList.remove('hidden'); // Apply retry button
    }

    document.getElementById("remainingAttempts").innerText = `Remaining Attempts: ${remainingAttempts}`;
    
    if(remainingAttempts === 0 && inputNumber != randomNumber){
        document.getElementById('feedback').textContent = `Game Over! The number was ${randomNumber}.`;
        document.getElementById('inputNumber').disabled = true;
        document.getElementById('btnSubmit').classList.add('hidden'); // Hide submit button
        document.getElementById('btnRetry').classList.remove('hidden'); // Apply retry button
    }

    document.getElementById('inputNumber').value = '';
}

function checkGuess() {
    const input = document.getElementById("inputNumber")
    let inputValue = input.value;

    if(inputValue < 1){
        input.value = '';
    } else if(inputValue > 100){
        input.value = inputValue.slice(0, -1);
    }
}

function restartGame() {
    document.getElementById('gameSection').classList.add('hidden');
    document.getElementById('attemptSection').classList.remove('hidden');

    document.getElementById('attemptsInput').value = '';
    document.getElementById('guide').textContent = 'Set your number of attempts.'
}