function loadComponent(id, file) {
  const isSubDir = window.location.pathname.includes('/html/');
  const finalPath = isSubDir ? '../' + file : file;

  fetch(finalPath)
    .then(response => {
      if (!response.ok) throw new Error("Erreur de chargement : " + finalPath);
      return response.text();
    })
    .then(data => {
      const placeholder = document.getElementById(id);
      placeholder.innerHTML = data;

      if (isSubDir && id === 'header-placeholder') {
        const elements = placeholder.querySelectorAll('a, img');
        elements.forEach(el => {
          const attr = el.tagName === 'IMG' ? 'src' : 'href';
          let val = el.getAttribute(attr);

          if (val && !val.startsWith('http') && !val.startsWith('#')) {
            if (val.startsWith('html/')) {
              el.setAttribute(attr, val.replace('html/', ''));
            }
            else if (val === 'index.html' || val.startsWith('img/')) {
              el.setAttribute(attr, '../' + val);
            }
          }
        });
      }
    })
    .catch(error => console.error("Erreur Fatale :", error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent('header-placeholder', 'header-fragment.html');
  loadComponent('footer-placeholder', 'footer-fragment.html');
});

const modal = document.getElementById("upload-modal");
const btn = document.querySelector(".btn-small-gold");
const span = document.getElementsByClassName("close")[0];

if(btn) {
  btn.onclick = () => modal.style.display = "block";
}
if(span) {
  span.onclick = () => modal.style.display = "none";
}
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
}
