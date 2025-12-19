const choices = ['rock', 'paper', 'scissors'];

let currentStreak = 0;
let highScore = parseInt(localStorage.getItem('rpsHighScore')) || 0;

document.getElementById('highScore').textContent = highScore;

function play(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const result = determineWinner(playerChoice, computerChoice);

    if (result === 'win') {
        currentStreak++;
        document.getElementById('resultText').textContent = 'You Win!';
    } else if (result === 'lose') {
        currentStreak = 0;
        document.getElementById('resultText').textContent = 'You Lose!';
    } else {
        document.getElementById('resultText').textContent = 'Draw!';
    }

    if (currentStreak > highScore) {
        highScore = currentStreak;
        localStorage.setItem('rpsHighScore', highScore);
    }

    document.getElementById('currentStreak').textContent = currentStreak;
    document.getElementById('highScore').textContent = highScore;
    document.getElementById('detailText').textContent =
        `You chose ${playerChoice}. Computer chose ${computerChoice}.`;
}

function determineWinner(player, computer) {
    if (player === computer) return 'draw';

    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }

    return 'lose';
}