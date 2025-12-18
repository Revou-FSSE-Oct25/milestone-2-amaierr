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

function startGame() {
    const seconds = parseInt(document.getElementById('timeInput').value);
    if (!seconds || seconds <= 0 || seconds > 30) {
        alert('Please enter a valid time.');
        return;
    }

    score = 0;
    timeRemaining = seconds;

    document.getElementById('score').textContent = score;
    document.getElementById('timeLeft').textContent = timeRemaining;
    document.getElementById('gameSection').classList.remove('hidden');
    document.getElementById('setupSection').classList.add('hidden');
    document.getElementById('btnRetry').classList.add('hidden');
    document.getElementById('clickButton').disabled = false;

    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timeLeft').textContent = timeRemaining;

        if (timeRemaining <= 0) {
            endGame(seconds);
        }
    }, 1000);
}

function checkTimeInput() {
    const input = document.getElementById("timeInput")
    let inputValue = input.value;

    if(inputValue < 1){
        input.value = '';
    } else if(inputValue > 30){
        input.value = inputValue.slice(0, -1);
    }
}

function increaseScore() {
    score++;
    document.getElementById('score').textContent = score;
}

function endGame(timePlayed) {
    clearInterval(timer);
    document.getElementById('clickButton').disabled = true;
    document.getElementById('btnRetry').classList.remove('hidden');
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
    document.getElementById('gameSection').classList.add('hidden');
    document.getElementById('setupSection').classList.remove('hidden');
}

renderScores();
