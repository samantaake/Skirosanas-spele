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

// Izvēlas HTML elementus
const trashBinElements = document.querySelectorAll('.trash-bin');
const trashElement = document.getElementById('trash');
const scoreElement = document.getElementById('score-value');
const highscoreElement = document.getElementById('highscore-value');
const restartBtn = document.getElementById('restart-btn');
const messageElement = document.getElementById('message');

let score = 0;
let highscore = 0;
let remainingItems = 20; // Kopējais atkritumu skaits

// Inicializē spēli
initializeGame();

// Funkcija, lai inicializētu spēli
function initializeGame() {
    generateTrash();
    restartBtn.addEventListener('click', restartGame);
}

// Funkcija, lai izveidotu atkritumus
function generateTrash() {
    if (remainingItems === 0) {
        endGame();
        return;
    }
    const randomIndex = Math.floor(Math.random() * trashItems.length);
    const trashItem = trashItems[randomIndex];
    
    // Izveido jaunu atkritumu elementu
    const newTrashElement = document.createElement('div');
    newTrashElement.className = 'trash';
    newTrashElement.textContent = trashItem.name;
    newTrashElement.dataset.category = trashItem.category; // Pievieno kategoriju kā dataset atribūtu
    newTrashElement.draggable = true;
    newTrashElement.addEventListener('dragstart', dragStart);

    // Aizstāj veco atkritumu elementu ar jauno
    trashElement.innerHTML = '';
    trashElement.appendChild(newTrashElement);
}

// Notikums, kad sākas vilkšana
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    event.dataTransfer.setData('category', event.target.dataset.category); // Pievieno kategoriju pārnešanas datiem
}

// Pievieno notikumu klausītājus atkritumu konteineriem
trashBinElements.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', drop);
});

// Notikums, kad pārvilkts pār konteineri
function dragOver(event) {
    event.preventDefault();
}

// Notikums, kad pārvilkts uz konteineri
function drop(event) {
    event.preventDefault();
    const trashCategory = event.dataTransfer.getData('category');
    const binCategory = this.dataset.category; // Iegūst konteinerī esošo atkritumu kategoriju

    // Pārbauda, vai pārvilktā atkrituma kategorija atbilst konteinerī esošajai kategorijai
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

// Funkcija, lai beigtu spēli
function endGame() {
    alert('Spēle beigusies! Jūsu rezultāts: ' + score);
    score = 0;
    scoreElement.textContent = score;
    remainingItems = 20;
    generateTrash();
}

// Funkcija, lai restartētu spēli
function restartGame() {
    score = 0;
    scoreElement.textContent = score;
    remainingItems = 20;
    generateTrash();
}

// Funkcija, lai rādītu ziņojumu
function showMessage(msg) {
    messageElement.textContent = msg;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 5000); // Noņem ziņojumu pēc 5 sekundēm
}
