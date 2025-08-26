import { drawGround, drawBackground, groundY, camera } from "./world.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export let frameX = 0;
export let frameY = 0;
const spriteWidth = 160;
const spriteHeight = 161;
const coordinates = document.getElementById('coordinates');

let gravity = 0.5;
let jumpStrength = -7;

export const player = {
    x: 50,
    y: 0,
    vy: 0,
    src: 'Images/Pumko.png',
    sx: frameX * spriteWidth,
    sy: frameY * spriteHeight,
    scale: 1,
    speed: 5,
    onGround: false
};

const pumpko = new Image();
pumpko.src = player.src;

const moveThreshold = canvas.width / 2; // when camera starts moving

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        if (player.x > moveThreshold / 2) {
            player.x -= player.speed;
        } else {
            camera.x -= player.speed; // moving left is now fine
        }

        frameX = (frameX + 1) % 3;
        player.sx = frameX * spriteWidth;
    }

    if (e.key === 'ArrowRight') {
        if (player.x < moveThreshold) {
            player.x += player.speed;
        } else {
            camera.x += player.speed;
        }

        frameX = (frameX + 1) % 3;
        player.sx = frameX * spriteWidth;
    }

    if (e.key === 'ArrowUp' && player.onGround) {
        player.vy = jumpStrength;
        player.onGround = false;
        player.sy = 2 * spriteHeight;
    }
});

function applyGravity() {
    player.vy += gravity;
    player.y += player.vy;

    if (player.y + 16 * player.scale >= groundY) {
        player.y = groundY - 16 * player.scale;
        player.vy = 0;
        player.onGround = true;
        player.sy = 0;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    applyGravity();

    drawBackground();
    ctx.drawImage(
        pumpko,
        player.sx, player.sy, spriteWidth, spriteHeight,
        player.x, player.y,
        16 * player.scale, 16 * player.scale
    );

    drawGround();
    requestAnimationFrame(gameLoop);
}

gameLoop();
