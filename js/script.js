// Déclaration des variables
let d = []; // Tableau pour stocker les étages demandés
let t = 1; // Temps de déplacement de l'ascenseur entre les étages
let i = 0; // Étage actuel de l'ascenseur
let n_les_tage = 0; // Nombre total d'étages parcourus
let is_move; // Indicateur de mouvement de l'ascenseur
let s = true; // Indicateur de démarrage de l'ascenseur

// Récupération des éléments DOM
const porte1 = document.getElementById('porte1');
const porte2 = document.getElementById('porte2');
const elevator = document.querySelector('.Elevator');
const cadre = document.querySelector('.cadre');
let nbr = document.querySelector('#nbr');

// Fonction pour ouvrir les portes de l'ascenseur
function ouvrirPortes() {
  porte1.animate([
    { width: '100px' },
    { width: `10px` }
  ], {
    duration: 3000,
    fill: "forwards"
  });

  porte2.animate([
    { width: '100px' },
    { width: `10px` }
  ], {
    duration: 3000,
    fill: "forwards"
  });
}

// Fonction pour fermer les portes de l'ascenseur
function fermerPortes() {
  porte1.animate([
    { width: '10px' },
    { width: `100px` }
  ], {
    duration: 3000,
    fill: "forwards"
  });

  porte2.animate([
    { width: '10px' },
    { width: `100px` }
  ], {
    duration: 3000,
    fill: "forwards"
  });
}




// Fonction pour déplacer l'ascenseur à une position donnée
function moveElevator(currentFloor, targetFloor) {
  const floorHeight = 20; // Hauteur d'un étage en pourcentage
  const distance = Math.abs(targetFloor - currentFloor) * floorHeight; // Distance à parcourir

  // Calcul de la durée de l'animation en fonction de la distance
  const animationDuration = distance * 1000 / 20; // 20% d'un étage par seconde

  // Animation du déplacement de l'ascenseur
  elevator.animate([
    { bottom: `calc(${currentFloor * floorHeight}% + 15px)` },
    { bottom: `calc(${targetFloor * floorHeight}% + 15px)` }
  ], {
    duration: animationDuration,
    fill: "forwards"
  });
}

// Événement de clic sur les boutons des étages
document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.querySelector('#Start');
  startButton.addEventListener("click", function(event) {
    // Accéder au bouton de démarrage
    let clickedStartButton = event.target;
    // Exécuter le reste du code ici
    s = true;
    az();
    clickedStartButton.disabled = true; // Désactiver le bouton de démarrage après avoir cliqué dessus
  });
});

// Événement de clic sur le bouton de démarrage de l'ascenseur
let Start = document.querySelector('#Start');
Start.addEventListener("click", function () {
  s = true;
  az();
  Start.disabled = true;
});

// Fonction pour déplacer l'ascenseur vers les étages demandés
function az() {
  if (s) {
    is_move = true;
    const targetFloor = d[0] / 20; // Étage cible en pourcentage
    const currentFloor = i / 20; // Étage actuel en pourcentage
    t = Math.abs(targetFloor - currentFloor) / 10; // Calcul du temps de déplacement entre les étages
    fermerPortes(); // Fermeture des portes de l'ascenseur
    setTimeout(() => {
      moveElevator(currentFloor, targetFloor); // Déplacement de l'ascenseur vers l'étage demandé
    }, 2000);
    setTimeout(() => {
      ouvrirPortes(); // Ouverture des portes de l'ascenseur
      const distance = Math.abs(d[0] - i);
      n_les_tage += distance / 20; // Calcul du nombre total d'étages parcourus
      nbr.textContent = n_les_tage;
      setTimeout(() => {
        i = d[0]; // Mise à jour de l'étage actuel de l'ascenseur
        d.shift(); // Suppression de l'étage demandé du tableau d[]
        is_move = false;
        if (d.length > 0) {
          az(); // Appel récursif pour traiter les autres demandes d'étages
        }
      }, 5000);
    }, (t + 2) * 1000);
    
  }
  
}




// Récupération du bouton Reset
let resetButton = document.querySelector('#Reset');

// Événement de clic sur le bouton Reset
resetButton.addEventListener("click", function () {
  // Recharger la page
  location.reload();
});


