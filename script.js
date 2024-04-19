// Define trash items
const trashItems = [
    { name: "Vīna pudeles", category: "Stikls" },
    { name: "Pārtikas atliekas", category: "Organiskie atkritumi" },
    { name: "Kafijas vai tējas biezumi", category: "Organiskie atkritumi" },
    { name: "Dzeramās glāzes", category: "Stikls" },
    { name: "Smaržu pudeles", category: "Stikls" },
    { name: "Marinēto gurķu burka", category: "Stikls" },
    { name: "Alus pudeles", category: "Stikls" },
    { name: "Dārza atkritumi", category: "Organiskie atkritumi" },
    { name: "Pārtikas mizas", category: "Organiskie atkritumi" },
    { name: "Tējas maisiņi", category: "Organiskie atkritumi" },
    { name: "Papīra dvieļi un salvetes", category: "Organiskie atkritumi" },
    { name: "Ūdens pudeles", category: "Plastmasa" },
    { name: "Dzērienu pudeles", category: "Plastmasa" },
    { name: "Veļas mazgāšanas līdzekļu un ziepju pudeles", category: "Plastmasa" },
    { name: "Plastmasas maisiņi", category: "Plastmasa" },
    { name: "Plastmasas iepakojums", category: "Plastmasa" },
    { name: "Laikraksti", category: "Papīrs" },
    { name: "Žurnāli", category: "Papīrs" },
    { name: "Biroja papīrs", category: "Papīrs" },
    { name: "Kartona kastes", category: "Papīrs" },
    { name: "Aploksnes", category: "Papīrs" }
];

// Select elements
const trashBinElements = document.querySelectorAll('.trash-bin');
const trashElement = document.getElementById('trash');
const scoreElement = document.getElementById('score-value');
const highscoreElement = document.getElementById('highscore-value');
const restartBtn = document.getElementById('restart-btn');
const messageElement = document.getElementById('message');

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
    const trashItem = trashItems[randomIndex];
    
    // Create new trash element
    const newTrashElement = document.createElement('div');
    newTrashElement.className = 'trash';
    newTrashElement.textContent = trashItem.name;
    newTrashElement.dataset.category = trashItem.category; // Add category as dataset attribute
    newTrashElement.draggable = true;
    newTrashElement.addEventListener('dragstart', dragStart);

    // Replace old trash element with new one
    trashElement.innerHTML = '';
    trashElement.appendChild(newTrashElement);
}

// Drag start event listener
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    event.dataTransfer.setData('category', event.target.dataset.category); // Add category to data transfer
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
    const trashName = event.dataTransfer.getData('text/plain');
    const trashCategory = event.dataTransfer.getData('category');
    const binCategory = this.id; // Get the ID of the trash bin

    // Check if the dragged trash item's category matches the bin category
    if (trashCategory === binCategory) {
        score++;
        scoreElement.textContent = score;
        remainingItems--;
        if (score > highscore) {
            highscore = score;
            highscoreElement.textContent = highscore;
        }
    } else {
        showMessage('Nepareizs konteiners!');
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

// Function to show message
function showMessage(msg) {
    messageElement.textContent = msg;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 5000); // Remove message after 2 seconds
}
