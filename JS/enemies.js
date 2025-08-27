const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const spriteWidth = 32;
const spriteHeight = 32;

let frameX = 0;
let frameY = 0;
let frameCounter = 0;
let frameSpeed = 10;
let randomInt = randomNumber(50, 250);
let destinationX = null;
let destinationY = null;
let needNewNumber = true;
let newNumber = null;

export const enemie = [
    {
        name: 'Bat',
        x: randomInt,
        y: 0,
        sx: frameX * spriteWidth,
        sy: frameY * spriteHeight,
        scale: 1,
        speed: 5,
        src: 'Images/Enemies/bat.png' // Sprite is 3 things 96x32
    }
]

const bat = new Image();
bat.src = enemie[0].src;

function drawEnemy(enemyID, spriteName) {

    frameCounter++;

    if (frameCounter % frameSpeed === 0) {
        frameX = (frameX + 1) % 3; // cycle 0–3
        enemie[enemyID].sx = frameX * spriteWidth;

        if (enemie[enemyID].x != newNumber) { // Ai Movement 
            if (enemie[enemyID].x < newNumber) {
                enemie[enemyID].x += enemie[enemyID].speed;
            } else if (enemie[enemyID].x > newNumber) {
                enemie[enemyID].x -= enemie[enemyID].speed;
            }
        } else if (enemie[enemyID].x === newNumber) {
            needNewNumber = true;
            moveEnemy();
        }

    }

    ctx.drawImage(
        spriteName, enemie[enemyID].sx, enemie[enemyID].sy,
        spriteWidth, spriteHeight, enemie[enemyID].x, enemie[enemyID].y,
        32 * enemie[enemyID].scale, 32 * enemie[enemyID].scale
    );
}


export function spawnEnemy(spawnID, spriteName) {
    if (spawnID === 0 && spriteName === 'bat') {
        drawEnemy(spawnID, bat);
    } else if (spawnID === 1) {
        //Continue with next enemy. 
    }
}

function moveEnemy(enemyID) {
    if (needNewNumber) {
        newNumber = randomNumber(0, 250);
        needNewNumber = false;
    } else {
        needNewNumber = true;
    }
}


moveEnemy();

function randomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

