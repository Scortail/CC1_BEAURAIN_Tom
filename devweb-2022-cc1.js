"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;


// Fonction qui lance le jeu de la recherche dichotomique
function launchGame(_evt) {
  const valeurMax = $maxUsr.value;
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.floor(Math.random() * valeurMax)+1;
  $output.textContent = "Un nouveau jeu a été lancé. Vous avez "+ maxGuesses + " essais pour deviner le nombre entre 1 et "+ valeurMax + ".";
  $guessBtn.disabled = false;
  $startBtn.disabled = true;

  $guessBtn.addEventListener("click",checkGuess); // Clique sur le boutton
  $numUsr.addEventListener("keydown", function(event) { // Touche Enter
    if ("Enter" === event.key) {
      event.preventDefault();
      checkGuess();
    }
  });
}


// Fonction si l'utilisateur clique sur vérifier
function checkGuess() {
  let userGuess = $numUsr.value;
  if (isNaN(userGuess)) {
    $output.innerHTML += '<br>'+"Veuillez entrer un nombre valide.";
    
  } else {
    nbGuesses++;
    if (userGuess == secretNumber) {
      $output.innerHTML += '<br>'+"Félicitations ! Vous avez deviné le nombre en " + nbGuesses + " essais.";
      $guessBtn.disabled = true;
      $startBtn.disabled = false;
    } else if (nbGuesses >= maxGuesses) {
      $output.innerHTML += '<br>'+"Dommage, vous avez épuisé toutes vos tentatives. Le nombre secret était " + secretNumber + ".";
      $guessBtn.disabled = true;
      $startBtn.disabled = false;
    } else {
      const message = userGuess < secretNumber ? '<br>'+"Trop bas. Essayez à nouveau." : '<br>'+"Trop élevé. Essayez à nouveau.";
      $output.innerHTML += message;
    }
  }
}


$startBtn.addEventListener("click", launchGame);


// Ajoute une image de vache sur la page
function addCow(evt) {
  

  console.debug(evt.x, evt.y);
  const cowImage = document.createElement("img");
  cowImage.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";

  // Calculez la position de l'image en fonction des coordonnées du clic
  cowImage.style.position = "absolute";
  cowImage.style.left = (evt.clientX + window.scrollX - 25) + "px"; // Décalage de 25 pixels pour centrer l'image
  cowImage.style.top = (evt.clientY + window.scrollY - 25) + "px"; // Décalage de 25 pixels pour centrer l'image

  // Appliquez une rotation aléatoire à l'image
  const randomRotation = Math.floor(Math.random() * 360); 
  cowImage.style.transform = `rotate(${randomRotation}deg)`;

  cowImage.classList.add("cow");
  document.body.appendChild(cowImage);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}


$cowBtn.addEventListener("click", toggleCow);

