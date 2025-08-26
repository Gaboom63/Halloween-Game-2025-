const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

export const groundY = canvas.height - 25;

// Load ground
const groundImage = new Image();
groundImage.src = 'Images/Ground/HalloweenAssets-export.png';

// Load background layers
const backgroundLayers = [];
const numLayers = 6;
for (let i = 1; i < numLayers; i++) {
    const img = new Image();
    img.src = `Images/Backgrounds/Night/Layers/${i}.png`;
    backgroundLayers.push(img);
}

// Make camera mutable
export const camera = { x: 0 };

// Background
export function drawBackground() {
    backgroundLayers.forEach((layer, i) => {
        if (!layer.complete) return;

        const parallax = 0.2 + i * 0.15;

        // Use modulus with canvas.width to loop infinitely in both directions
        let x = -((camera.x * parallax) % canvas.width);
        if (x > 0) x -= canvas.width; // handle negative camera.x

        ctx.drawImage(layer, x, 0, canvas.width, canvas.height);
        ctx.drawImage(layer, x + canvas.width, 0, canvas.width, canvas.height);
    });
}

// Ground
export function drawGround() {
    if (!groundImage.complete) return;

    const tileWidth = groundImage.width;
    const tileHeight = 25;

    let offsetX = -((camera.x) % tileWidth);
    if (offsetX > 0) offsetX -= tileWidth; // handle negative camera.x

    for (let x = offsetX; x < canvas.width; x += tileWidth) {
        ctx.drawImage(groundImage, x, groundY, tileWidth, tileHeight);
    }
}
