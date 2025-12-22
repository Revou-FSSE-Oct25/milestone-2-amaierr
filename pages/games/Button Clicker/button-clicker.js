let timer;
let timeRemaining = 0;
let score = 0;

const scoreBoard = [];

class Board {
  constructor(time, score) {
    this.time = time;
    this.score = score;
  }
}

// HTML Component Variable
let playerScore;
let timeLeft;
let gameSection;
let setupSection;
let btnRetry;
let clickButton;
let timeInput;

window.onload = () => {
    playerScore = document.getElementById('playerScore');
    timeLeft = document.getElementById('timeLeft');
    gameSection = document.getElementById('gameSection');
    setupSection = document.getElementById('setupSection');
    btnRetry = document.getElementById('btnRetry');
    clickButton = document.getElementById('clickButton');
    timeInput = document.getElementById('timeInput');

    const btnStart = document.getElementById('btnStart');

    // Event Listener
    timeInput.addEventListener("input", checkTimeInput);
    btnStart.addEventListener("click", startGame);
    clickButton.addEventListener("click", increaseScore);
    btnRetry.addEventListener("click", restartGame);
};

function startGame() {
    const seconds = parseInt(document.getElementById('timeInput').value);
    if (!seconds || seconds <= 0 || seconds > 30) {
        alert('Please enter a valid time.');
        return;
    }

    score = 0;
    timeRemaining = seconds;

    playerScore.textContent = score;
    timeLeft.textContent = timeRemaining;
    gameSection.classList.remove('hidden');
    setupSection.classList.add('hidden');
    btnRetry.classList.add('hidden');
    clickButton.disabled = false;

    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        timeLeft.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            endGame(seconds);
        }
    }, 1000);
}

function checkTimeInput() {
    let timeInputValue = timeInput.value;

    if(timeInputValue < 1){
        timeInput.value = '';
    } else if(timeInputValue > 30){
        timeInput.value = timeInputValue.slice(0, -1);
    }
}

function increaseScore() {
    score++;
    playerScore.textContent = score;
}

function endGame(timePlayed) {
    clearInterval(timer);
    clickButton.disabled = true;
    btnRetry.classList.remove('hidden');
    saveScore(timePlayed, score);
    renderScores();
}

function saveScore(time, score) {
    scoreBoard.push(new Board(time, score));
    scoreBoard.sort((a, b) => b.score - a.score);

    const startIndex = 5;
    const deleteCount = Infinity;

    scoreBoard.splice(startIndex, deleteCount);
}

function renderScores() {
    const table = document.getElementById('scoreTable');
    table.innerHTML = '';

    scoreBoard.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2">${entry.score}</td>
            <td class="py-2">${entry.time}</td>
        `;
        table.appendChild(row);
    });
}

function restartGame() {
    gameSection.classList.add('hidden');
    setupSection.classList.remove('hidden');
}
