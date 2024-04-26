// Define trash items
const trashItems = [
  {
    name: "Vīna pudeles",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Pārtikas atliekas",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/bio/Partikas_atliekas.jpg",
  },
  {
    name: "Kafijas vai tējas biezumi",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Dzeramās glāzes",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Smaržu pudeles",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Marinēto gurķu burka",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Alus pudeles",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Dārza atkritumi",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Pārtikas mizas",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Tējas maisiņi",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Papīra dvieļi un salvetes",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Ūdens pudeles",
    category: "Plastmasa",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Dzērienu pudeles",
    category: "Plastmasa",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Veļas mazgāšanas līdzekļu un ziepju pudeles",
    category: "Plastmasa",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Plastmasas maisiņi",
    category: "Plastmasa",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Plastmasas iepakojums",
    category: "Plastmasa",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Laikraksti",
    category: "Papīrs",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Žurnāli",
    category: "Papīrs",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Biroja papīrs",
    category: "Papīrs",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Kartona kastes",
    category: "Papīrs",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Aploksnes",
    category: "Papīrs",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
];

// Izvēlas HTML elementus
const trashBinElements = document.querySelectorAll(".trash-bin");
const trashElement = document.getElementById("trash");
const scoreElement = document.getElementById("score-value");
const highscoreElement = document.getElementById("highscore-value");
const restartBtn = document.getElementById("restart-btn");
const messageElement = document.getElementById("message");

let score = 0;
let highscore = 0;
let remainingItems = 20; // Kopējais atkritumu skaits

// Inicializē spēli
initializeGame();

// Funkcija, lai inicializētu spēli
function initializeGame() {
  generateTrash();
  restartBtn.addEventListener("click", restartGame);
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
  const newTrashElement = document.createElement("div");
  newTrashElement.className = "trash";
  newTrashElement.dataset.category = trashItem.category; // Pievieno kategoriju kā dataset atribūtu
  newTrashElement.draggable = true;
  newTrashElement.addEventListener("dragstart", dragStart);

  // Add img to the newTrashElement with src trashItem.path
  const trashImg = document.createElement("img");
  trashImg.className = "trash-img";
  trashImg.src = trashItem.path;
  trashImg.dataset.category = trashItem.category; // Pievieno kategoriju kā dataset atribūtu
  trashImg.draggable = true;
  trashImg.addEventListener("dragstart", dragStart);

  newTrashElement.appendChild(trashImg);

  // Add text to the newTrashElement
  const trashText = document.createElement("div");
  trashText.textContent = trashItem.name;
  newTrashElement.appendChild(trashText);

  // Aizstāj veco atkritumu elementu ar jauno
  trashElement.innerHTML = "";
  trashElement.appendChild(newTrashElement);
}

// Notikums, kad sākas vilkšana
function dragStart(event) {
  event.dataTransfer.setData("trash-name", event.target.textContent);
  event.dataTransfer.setData("trash-category", event.target.dataset.category); // Pievieno kategoriju pārnešanas datiem
}

// Pievieno notikumu klausītājus atkritumu konteineriem
trashBinElements.forEach((bin) => {
  bin.addEventListener("dragover", dragOver);
  bin.addEventListener("drop", drop);
});

// Notikums, kad pārvilkts pār konteineri
function dragOver(event) {
  event.preventDefault();
}

// Notikums, kad pārvilkts uz konteineri
function drop(event) {
  event.preventDefault();

  const trashCategory = event.dataTransfer.getData("trash-category");
  const binCategory = event.target.alt; // Iegūst konteinerī esošo atkritumu kategoriju

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
    showMessage("Nepareizs konteiners!");
  }
  generateTrash();
}

// Funkcija, lai beigtu spēli
function endGame() {
  alert("Spēle beigusies! Jūsu rezultāts: " + score);
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
    messageElement.textContent = "";
  }, 5000); // Noņem ziņojumu pēc 5 sekundēm
}
