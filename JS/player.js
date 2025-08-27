import { drawGround, drawBackground, groundY, camera } from "./world.js";
import { spawnEnemy } from "./enemies.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export let frameX = 0;
export let frameY = 0;
export let idleTimer = true; // true = On false = Off (Start Idle Spritesheet) 
let idleTimeout = null;
let isMoving = false;
let frameCounter = 0;
let swordMode = true;
const frameSpeed = 10; // higher = slower animation

const spriteWidth = 160;
const spriteHeight = 161;
const pumpko_swordSpriteWidth = 32;
const pumpko_swordSpriteHeight = 32;

const coordinates = document.getElementById('coordinates');

let gravity = 0.5;
let jumpStrength = -7;

export const player = {
    x: 50,
    y: 0,
    vy: 0,
    src: 'Images/Pumpko.png',
    idlesrc: 'Images/Pumpko_idle.png',
    sx: frameX * spriteWidth,
    sy: frameY * spriteHeight,
    scale: 1,
    speed: 5,
    onGround: false
};

export const pumpko_sword = {
    x: 50,
    y: 0,
    vy: 0,
    src: 'Images/Pumpko_sword.png',
    idlesrc: 'Images/Pumpko_idle.png',
    sx: frameX * pumpko_swordSpriteWidth,
    sy: frameY * pumpko_swordSpriteHeight,
    scale: 1,
    speed: 5,
    onGround: false
};

const pumpko = new Image();
pumpko.src = player.src;

const pumpko_swordImage = new Image();
pumpko_swordImage.src = "Images/Pumpko_sword.png";


const pumpko_idle = new Image();
pumpko_idle.src = player.idlesrc;

const moveThreshold = canvas.width / 2; // when camera starts moving

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        if (swordMode === false) {
            if (player.x > moveThreshold / 2) {
                player.x -= player.speed;
            } else {
                camera.x -= player.speed; // moving left is now fine
            }

            frameX = (frameX + 1) % 3;
            player.sx = frameX * spriteWidth;
        } else if (swordMode === true) {
            if (pumpko_sword.x > moveThreshold / 2) {
                pumpko_sword.x -= pumpko_sword.speed;
            } else {
                camera.x -= pumpko_sword.speed; // moving left is now fine
            }

            frameX = (frameX + 1) % 4;
            pumpko_sword.sx = frameX * pumpko_swordSpriteWidth;
        }
    }

    if (e.key === 'ArrowRight') {
        if (swordMode === false) {
            if (player.x < moveThreshold) {
                player.x += player.speed;
            } else {
                camera.x += player.speed;
            }

            frameX = (frameX + 1) % 3;
            player.sx = frameX * spriteWidth;
        } else if (swordMode === true) {
            if (pumpko_sword.x < moveThreshold) {
                pumpko_sword.x += pumpko_sword.speed;
            } else {
                camera.x += pumpko_sword.speed;
            }

            frameX = (frameX + 1) % 4;
            pumpko_sword.sx = frameX * pumpko_swordSpriteWidth;
        }
    }

    if (e.key === 'ArrowUp' && player.onGround) {
        if (swordMode === false) {
            player.vy = jumpStrength;
            player.onGround = false;
            frameY = (frameX + Y) % 3;
            player.sy = 2 * spriteHeight;
        }

        if (swordMode === true) {
            pumpko_sword.vy = jumpStrength;
            pumpko_sword.onGround = false;
            frameY = (frameX + Y) % 4;
            pumpko_sword.sy = 1 * pumpko_swordSpriteHeight;
        }
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        isMoving = true;
        idleTimer = false;

        // reset idle timeout when key is pressed
        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
            if (!isMoving) idleTimer = true;
        }, 2000);
    }
});

document.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        isMoving = false;

        // start idle countdown when movement stops
        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
            if (!isMoving) idleTimer = true;
        }, 2000);
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

    pumpko_sword.vy += gravity;
    pumpko_sword.y += pumpko_sword.vy;

    if (pumpko_sword.y + 32 * pumpko_sword.scale >= groundY) {
        pumpko_sword.y = groundY - 26 * pumpko_sword.scale;
        pumpko_sword.vy = 0;
        pumpko_sword.onGround = true;
        pumpko_sword.sy = 0;
    }
}

function playerDraw() {
    if (idleTimer && swordMode === false) {
        frameCounter++;

        if (frameCounter % frameSpeed === 0) {
            frameX = (frameX + 1) % 9; // cycle 0–8
            player.sx = frameX * spriteWidth;
        }
        ctx.drawImage(
            pumpko_idle,
            player.sx, player.sy, spriteWidth, spriteHeight,
            player.x, player.y,
            16 * player.scale, 16 * player.scale
        );
    } else if (idleTimer && swordMode === true) {
        frameCounter++;

        if (frameCounter % frameSpeed === 0) {
            frameX = (frameX + 1) % 9; // cycle 0–8
            pumpko_sword.sx = frameX * spriteWidth;
        }
        ctx.drawImage(
            pumpko_idle,
            pumpko_sword.sx, pumpko_sword.sy, spriteWidth, spriteHeight,
            pumpko_sword.x, pumpko_sword.y + 10,
            16 * pumpko_sword.scale, 16 * pumpko_sword.scale
        );
    } else if (swordMode === true) {
        ctx.drawImage(
            pumpko_swordImage,
            pumpko_sword.sx, pumpko_sword.sy, pumpko_swordSpriteWidth, pumpko_swordSpriteHeight, // source
            pumpko_sword.x, pumpko_sword.y, // position
            32 * pumpko_sword.scale, 32 * pumpko_sword.scale // size on canvas
        );
    } else {
        ctx.drawImage(
            pumpko,
            player.sx, player.sy, spriteWidth, spriteHeight,
            player.x, player.y,
            16 * player.scale, 16 * player.scale
        );
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    applyGravity();

    drawBackground();

    playerDraw();
    spawnEnemy(0, 'bat');
    drawGround();
    requestAnimationFrame(gameLoop);
}

gameLoop();
