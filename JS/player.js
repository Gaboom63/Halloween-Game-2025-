import { drawGround, groundY } from "./world.js";
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export let frameX = 0;
export let frameY = 0;
const spriteWidth = 160;
const spriteHeight = 160;
const coordinates = document.getElementById('coordinates');

let gravity = 0.5;
let jumpStrength = -7;

export const player = {
    x: 0,
    y: 0,
    vy: 0,
    src: 'Images/Pumko.png',
    sx: frameX * spriteWidth,
    sy: frameY * spriteHeight,
    scale: 1,
    speed: 5,
    onGround: false
}


const pumpko = new Image();
pumpko.src = player.src;

console.log(groundY)

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && player.x != 0) { player.x -= player.speed; if (frameX <= 2) { frameX++; player.sx = frameX * spriteWidth } else (frameX = 0, player.sx = frameX * spriteWidth); };
    if (e.key === 'ArrowRight' && player.x != 285) { player.x += player.speed; if (frameX <= 2) { frameX++; player.sx = frameX * spriteWidth } else (frameX = 0, player.sx = frameX * spriteWidth); }; // Set to 2 since it goes Ok 1, Ok 2, Ok 2 = 2 so 3 then 3 != 2 so return to 0  
    if (e.key === 'ArrowUp' && player.y != 0 && player.onGround === true) { player.vy = jumpStrength; player.onGround = false; };
    // if (e.key === 'ArrowDown') { if (frameX <= 2) { frameX++; player.sx = frameX * spriteWidth } else (frameX = 0, player.sx = frameY * spriteWidth); console.table(player) };
});

function applyGravity() {
    player.vy += gravity;        // gravity pulls down
    player.y += player.vy;       // apply velocity

    // Ground collision
    if (player.y + 19 * player.scale >= groundY) {
        player.y = groundY - 19 * player.scale;
        player.vy = 0;           // stop falling
        player.onGround = true;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    applyGravity();
    ctx.drawImage(pumpko, player.sx, player.sy, spriteWidth, spriteHeight, player.x, player.y, 16 * player.scale, 16 * player.scale);
    coordinates.innerHTML = `X: ${player.x}, Y: ${player.y}`

    drawGround();
    requestAnimationFrame(gameLoop);
}

gameLoop();

