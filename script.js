function startGame() {
    window.location.href = "index2.html";
}

// Define trash items
const trashItems = ["paper", "plastic", "organic", "glass"];

// Select elements
const trashBinElements = document.querySelectorAll('.trash-bin');
const trashElement = document.getElementById('trash');
const scoreElement = document.getElementById('score-value');
const highscoreElement = document.getElementById('highscore-value');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let highscore = 0;

// Initialize game
initializeGame();

// Function to initialize game
function initializeGame() {
    generateTrash();
    restartBtn.addEventListener('click', restartGame);
}

// Function to generate trash
function generateTrash() {
    const randomIndex = Math.floor(Math.random() * trashItems.length);
    const trashType = trashItems[randomIndex];
    trashElement.className = '';
    trashElement.classList.add(trashType);
    trashElement.draggable = true;
    trashElement.addEventListener('dragstart', dragStart);
}

// Drag start event listener
function dragStart(event) {
    event.dataTransfer.setData('text', event.target.className);
}

// Add event listeners to trash bins
trashBinElements.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', drop);
});

// Drag over event listener
function dragOver(event) {
    event.preventDefault();
}

// Drop event listener
function drop(event) {
    event.preventDefault();
    const trashType = event.dataTransfer.getData('text');
    const binType = this.id.split('-')[0];
    if (trashType === binType) {
        score++;
        scoreElement.textContent = score;
        if (score > highscore) {
            highscore = score;
            highscoreElement.textContent = highscore;
        }
        generateTrash();
    } else {
        endGame();
    }
}

// Function to end the game
function endGame() {
    alert('Game over! Your score: ' + score);
    score = 0;
    scoreElement.textContent = score;
    generateTrash();
}

// Function to restart the game
function restartGame() {
    score = 0;
    scoreElement.textContent = score;
    generateTrash();
}
