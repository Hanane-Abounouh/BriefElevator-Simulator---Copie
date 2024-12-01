let d = []; // Liste des étages demandés
let t = 1; // Temps pour bouger entre les étages
let i = 0; // L'étage actuel
let n_les_tage = 0; // Nombre total d'étages parcourus
let is_move = false; // Si l'ascenseur est en mouvement ou pas
let s = true; // Si l'ascenseur a démarré ou pas

const porte1 = document.getElementById('porte1'); // Récupérer la porte 1
const porte2 = document.getElementById('porte2'); // Récupérer la porte 2
const elevator = document.querySelector('.Elevator'); // Récupérer l'élévateur
const cadre = document.querySelector('.cadre'); // Récupérer le cadre d'affichage
let nbr = document.querySelector('#nbr'); // Récupérer l'affichage du nombre d'étages parcourus

// Fonction pour ouvrir les portes
function ouvrirPortes() {
  porte1.animate([{ width: '100px' }, { width: '10px' }], { duration: 3000, fill: "forwards" });
  porte2.animate([{ width: '100px' }, { width: '10px' }], { duration: 3000, fill: "forwards" });
}

// Fonction pour fermer les portes
function fermerPortes() {
  porte1.animate([{ width: '10px' }, { width: '100px' }], { duration: 3000, fill: "forwards" });
  porte2.animate([{ width: '10px' }, { width: '100px' }], { duration: 3000, fill: "forwards" });
}

// Fonction pour déplacer l'ascenseur
function move() {
  elevator.animate([{ bottom: `calc(${i}% + 15px)` }, { bottom: `calc(${d[0]}% + 15px)` }], { duration: t * 1000, fill: "forwards" });
}

// Événement sur le clic des boutons d'étages
let btnR = document.querySelectorAll('.btnR');
btnR.forEach((e, i) => {
  e.addEventListener("click", function () {
    cadre.textContent += 'R' + i; 
    d.push(i * 20); // Ajouter l'étage demandé à la liste
    if (!is_move) { 
      az(); 
    }
  });
});

// Événement sur le bouton Start
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
    t = Math.abs(d[0] - i) / 10; // Calcul du temps pour le déplacement
    fermerPortes(); 
    setTimeout(() => {
      move(); 
    }, 2000);
    setTimeout(() => {
      ouvrirPortes(); 
      let x = Math.abs(d[0] - i);
      n_les_tage += x / 20; 
      nbr.textContent = "Steps: " + n_les_tage; 
      setTimeout(() => {
        i = d[0]; 
        d.shift(); 
        is_move = false;
        if (d.length > 0) {
          az(); 
        }
      }, 5000);
    }, (t + 2) * 1000);
  }
}

// Bouton Reset pour recharger la page
let resetButton = document.querySelector('#Reset');
resetButton.addEventListener("click", function () {
  location.reload();
});
