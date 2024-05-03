
// Define trash items
const trashItems = [
  {
    name: "Vīna pudeles",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Dārza atliekas",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/bio/darza lapas.jpg",
  },
  {
    name: "Kafijas vai tējas biezumi",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/bio/Kafijas biezumi.jpg",
  },
  {
    name: "Dzeramās glāzes",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/dzerama stikla pudele.jpg",
  },
  {
    name: "Smaržu pudeles",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/smarzu pudele.jpg",
  },
  {
    name: "Marinēto gurķu burka",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/stikla burka.jpg",
  },
  {
    name: "Alus pudeles",
    category: "Stikls",
    path: "bildes/atkritumi/stikli/alus pudele.jpg",
  },
  {
    name: "Dārza atkritumi",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/stikli/vina pudele.jpg",
  },
  {
    name: "Pārtikas mizas",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/bio/Partikas atliekas( kartupelu mizas).jpg",
  },
  {
    name: "Tējas maisiņi",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/bio/tejas maisini.jpg",
  },
  {
    name: "Papīra dvieļi un salvetes",
    category: "Organiskie atkritumi",
    path: "bildes/atkritumi/bio/papira dvieli.jpg",
  },
  {
    name: "Ūdens pudeles",
    category: "Plastmasa",
    path: "bildes/atkritumi/plastmas/udens pudele.jpg",
  },
  {
    name: "Dzērienu pudeles",
    category: "Plastmasa",
    path: "bildes/atkritumi/plastmas/dzeruenu pudele.jpg",
  },
  {
    name: "Veļas mazgāšanas līdzekļu un ziepju pudeles",
    category: "Plastmasa",
    path: "bildes/atkritumi/plastmas/velas mazgasanas lidzeklu.jpg",
  },
  {
    name: "Plastmasas maisiņi",
    category: "Plastmasa",
    path: "bildes/atkritumi/plastmas/plastmasa maisini.jpg",
  },
  {
    name: "Plastmasas iepakojums",
    category: "Plastmasa",
    path: "bildes/atkritumi/plastmas/konteinera iepakojums.jpg",
  },
  {
    name: "Laikraksti",
    category: "Papīrs",
    path: "bildes/atkritumi/papirs/laikrakati.jpg",
  },
  {
    name: "Žurnāli",
    category: "Papīrs",
    path: "bildes/atkritumi/papirs/zurnali.jpg",
  },
  {
    name: "Biroja papīrs",
    category: "Papīrs",
    path: "bildes/atkritumi/papirs/biroja papirs.jpg",
  },
  {
    name: "Kartona kastes",
    category: "Papīrs",
    path: "bildes/atkritumi/papirs/kartona kaste.jpg",
  },
  {
    name: "Aploksnes",
    category: "Papīrs",
    path: "bildes/atkritumi/papirs/aploksne.jpg",
  },
];


// Izvēlas HTML elementus
const trashBinElements = document.querySelectorAll(".trash-bin");
const trashElement = document.getElementById("trash");
const scoreElement = document.getElementById("score-value");
const highscoreElement = document.getElementById("highscore-value");
const restartBtn = document.getElementById("restart-btn");
const messageElement = document.getElementById("message");
const statsElement = document.getElementById("game-stats");

let score = 0;
let highscore = getHighscore();
let remainingItems = 20; // Kopējais atkritumu skaits
let errors = 0; // Pievienojiet kļūdu skaita mainīgo

// Inicializē spēli
initializeGame();

// Saglabāt highscore
function saveHighscore() {
  localStorage.setItem("highscore", highscore);
}

// Iegūt highscore no localStorage
function getHighscore() {
  const storedHighscore = localStorage.getItem("highscore");
  return storedHighscore ? parseInt(storedHighscore) : 0; // Parbaudam, vai ir saglabāts rezultāts
}

// Atjaunot highscore elementu spēles interfeisā
function updateHighscoreElement() {
  highscoreElement.textContent = highscore;
}

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
  const trashItem = chooseTrashItem();
  remainingItems--; // Samazina atlikušo atkritumu skaitu

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
  event.dataTransfer.setData(
    "trash-category",
    event.target.dataset.category
  ); // Pievieno kategoriju pārnešanas datiem
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
    if (score > highscore) {
      highscore = score;
      saveHighscore(); // Saglabā jauno highscore, ja tas ir pārspēts
      updateHighscoreElement(); // Atjaunina highscore interfeisā
    }
  } else {
    errors++; // Pievienojiet kļūdu skaita palielināšanu
    if (errors >= 3) {
      endGame(); // Ja kļūdu skaits pārsniedz 3, izsauciet funkciju, lai beigtu spēli
      return;
    }
  }
  generateTrash();
}

// Funkcija, lai beigtu spēli
function endGame() {
  trashElement.innerHTML = "";
  const stats = `Spēle beigusies! Jūsu rezultāts: ${score}, Highscore: ${highscore}`;
  statsElement.textContent = stats;
  restartBtn.style.display = "block"; // Parāda restart pogu
}

// Funkcija, lai restartētu spēli
function restartGame() {
  score = 0;
  scoreElement.textContent = score;
  remainingItems = 20;
  errors = 0;
  generateTrash();
  statsElement.textContent = "";
  restartBtn.style.display = "none"; // Paslēpj restart pogu
}

// Ielādē highscore, kad dokumenta DOM ir ielādēts
document.addEventListener("DOMContentLoaded", function () {
  updateHighscoreElement();
});

// Izmanto šo funkciju, lai izvēlētos un izņemtu atkritumu no saraksta
function chooseTrashItem() {
  if (trashItems.length === 0) {
    endGame(); // Ja atkritumu saraksts ir tukšs, beidziet spēli
    return;
  }
  const randomIndex = Math.floor(Math.random() * trashItems.length);
  const trashItem = trashItems[randomIndex];
  trashItems.splice(randomIndex, 1); // Izņemiet izvēlēto atkritumu no saraksta
  return trashItem;
}
