const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export const groundY = canvas.height - 25; // 50 pixels from the bottom

export function drawGround() {
    ctx.beginPath();
    ctx.moveTo(0, groundY)
    ctx.lineTo(canvas.width, groundY);
    ctx.strokeStyle = 'green'; // Or any desired color
    ctx.lineWidth = 4;
    ctx.stroke();
}
// Drawn Via GameLoop Currently. 

