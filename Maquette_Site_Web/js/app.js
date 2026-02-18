/**
 * Fonction pour charger un composant HTML (Header/Footer) dans un placeholder
 * @param {string} id - L'ID de la balise div où injecter le code
 * @param {string} file - Le chemin vers le fichier fragment
 */
function loadComponent(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur réseau : impossible de charger " + file);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => {
      console.error("Erreur lors du chargement du composant :", error);
    });
}

// On attend que la page soit prête avant de charger les composants
document.addEventListener("DOMContentLoaded", () => {
  // Note : On utilise des chemins relatifs à la racine
  loadComponent('header-placeholder', '/header-fragment.html');
  loadComponent('footer-placeholder', '/footer-fragment.html');
});
