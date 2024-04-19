// Define trash items
const trashItems = [
    "Bio",
    "Pārtikas atliekas",
    "Kafijas vai tējas biezumi",
    "Tējas maisiņi",
    "Dārza atkritumi",
    "Papīra dvieļi un salvetes",
    "Stikls",
    "Vīna pudeles",
    "Alus pudeles",
    "Stikla burkas",
    "Smaržu pudeles",
    "Dzeramās glāzes",
    "Plastmasa",
    "Ūdens pudeles",
    "Dzērienu pudeles",
    "Veļas mazgāšanas līdzekļu un ziepju pudeles",
    "Plastmasas maisiņi",
    "Plastmasas iepakojums",
    "Papīrs",
    "Laikraksti",
    "Žurnāli",
    "Biroja papīrs",
    "Kartona kastes",
    "Aploksnes"
];

// Select elements
const trashBinElements = document.querySelectorAll('.trash-bin');
const trashElement = document.getElementById('trash');
const scoreElement = document.getElementById('score-value');
const highscoreElement = document.getElementById('highscore-value');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let highscore = 0;
let remainingItems = 20; // Number of items to be dragged

// Initialize game
initializeGame();

// Function to initialize game
function initializeGame() {
    generateTrash();
    restartBtn.addEventListener('click', restartGame);
}

// Function to generate trash
function generateTrash() {
    if (remainingItems === 0) {
        endGame();
        return;
    }
    const randomIndex = Math.floor(Math.random() * trashItems.length);
    const trashType = trashItems[randomIndex];
    
    // Create new trash element with image
    const newTrashElement = document.createElement('div');
    newTrashElement.className = 'trash';
    const trashImage = document.createElement('img');
    trashImage.src = trashType.toLowerCase().replace(/ /g, '-') + '.jpg';
    trashImage.alt = trashType;
    newTrashElement.appendChild(trashImage);

    // Replace old trash element with new one
    trashElement.innerHTML = '';
    trashElement.appendChild(newTrashElement);
}

// Drag start event listener
function dragStart(event) {
    event.dataTransfer.setData('text', event.target.textContent);
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
    const binType = this.textContent;
    if (trashType === binType) {
        score++;
        scoreElement.textContent = score;
        remainingItems--;
        if (score > highscore) {
            highscore = score;
            highscoreElement.textContent = highscore;
        }
    }
    generateTrash();
}

// Function to end the game
function endGame() {
    alert('Spēle beigusies! Jūsu rezultāts: ' + score);
    score = 0;
    scoreElement.textContent = score;
    remainingItems = 20;
    generateTrash();
}

// Function to restart the game
function restartGame() {
    score = 0;
    scoreElement.textContent = score;
    remainingItems = 20;
    generateTrash();
}
