const gameContainer = document.getElementById('game-container');
const molesContainer = document.getElementById('moles');
const scoreElement = document.getElementById('score-value');

let score = 0;
let moleInterval;

function startGame() {
    score = 0;
    updateScore();
    moleInterval = setInterval(popRandomMole, 1000);
}

function popRandomMole() {
    const mole = document.createElement('div');
    mole.classList.add('mole');
    mole.style.left = `${getRandomPosition()}px`;
    mole.style.top = `${getRandomPosition()}px`;

    mole.addEventListener('click', whackMole);
    molesContainer.appendChild(mole);

    setTimeout(() => {
        molesContainer.removeChild(mole);
    }, 1000);
}

function whackMole() {
    score++;
    updateScore();
    molesContainer.removeChild(this);
}

function updateScore() {
    scoreElement.textContent = score;
}

function getRandomPosition() {
    const position = Math.floor(Math.random() * 400);
    return position;
}

startGame();
