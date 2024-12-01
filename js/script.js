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
let buttonsClicked = [];

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
function move() {
  let Elevator = document.querySelector('.Elevator');
  Elevator.animate([
    { bottom: `calc(${i}% + 15px)` },
    { bottom: `calc(${d[0]}% + 15px)` }
  ], {
    duration: (t + 0) * 1000,
    fill: "forwards"
  });
}

// Événement de clic sur les boutons des étages
let btnR = document.querySelectorAll('.btnR');
btnR.forEach((e, i) => {
  e.addEventListener("click", function () {
    cadre.textContent += 'R' + i;
    d.push(i * 20); // Ajout de l'étage demandé dans le tableau d[]
    if (is_move == false) {
      az();
    }
  });
});

// Événement de clic sur le bouton de démarrage de l'ascenseur
let Start = document.querySelector('#Start');
Start.onclick = function () {
  s = true;
  az();
  Start.disabled = true;
};

// Fonction pour déplacer l'ascenseur vers les étages demandés
function az() {
  if (s) {
    is_move = true;
    t = (d[0] - i) / 10; // Calcul du temps de déplacement entre les étages
    t = t > 0 ? t : t * (-1);
    fermerPortes(); 
    setTimeout(() => {
      move(); // Déplacement de l'ascenseur vers l'étage demandé
    }, 2000);
    setTimeout(() => {
      ouvrirPortes(); 
      let x=(d[0] - i)
        x=x>0?x:x*(-1)
        n_les_tage +=x / 20; // Calcul du nombre total d'étages parcourus
        nbr.textContent = "Steps: " + n_les_tage;
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

resetButton.addEventListener("click", function () {
  // Recharger la page
  location.reload();
});
