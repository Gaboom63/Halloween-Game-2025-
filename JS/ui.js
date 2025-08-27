const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const inventory = document.getElementById('inventory')
let menuOpen = false;

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (menuOpen === false) {
            inventory.style.display = 'block';
            menuOpen = true;
        } else if (menuOpen === true) {
            inventory.style.display = 'none';
            menuOpen = false
        }
    }
});

