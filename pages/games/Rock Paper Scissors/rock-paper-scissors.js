const choices = ['rock', 'paper', 'scissors'];

let currentStreak = 0;
let highScore = parseInt(localStorage.getItem('rpsHighScore')) || 0;

let resultText;

window.onload = () => {
    resultText = document.getElementById('resultText');
    document.getElementById('highScore').textContent = highScore;

    // Player Choice
    const playRock = document.getElementById('playRock');
    const playPaper = document.getElementById('playPaper');
    const playScissors = document.getElementById('playScissors');

    playRock.addEventListener("click", () => {
        play(choices[0]);
    });
    playPaper.addEventListener("click", () => {
        play(choices[1]);
    });
    playScissors.addEventListener("click", () => {
        play(choices[2]);
    });
}

function play(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const result = determineWinner(playerChoice, computerChoice);

    if (result === 'win') {
        currentStreak++;
        resultText.textContent = 'You Win!';
    } else if (result === 'lose') {
        currentStreak = 0;
        resultText.textContent = 'You Lose!';
    } else {
        resultText.textContent = 'Draw!';
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