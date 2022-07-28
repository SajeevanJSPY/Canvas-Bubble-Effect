"use strict";
// Canvas API
// Canvas Element
const canvas = document.getElementById('canvas');
// Context
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
// Mouse
let mouse = {
    x: 0,
    y: 0
};
// Window Resizing
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});
// Mouse Out
window.addEventListener('mouseout', () => {
    mouse.x = 0;
    mouse.y = 0;
});
let maxRadius = 40;
let minRadius = 2;
let range = 50;
let colorArray = ['#ffaa33', '#99ffaa', '#00ff00', '#4411aa', '#ff1100'];
// Event Handlers
window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});
// Circle
class Circle {
    radius;
    x;
    y;
    dx;
    dy;
    color;
    constructor() {
        this.radius = minRadius;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = (Math.random() - 0.5) * 1 + 0.1;
        this.dy = (Math.random() - 0.5) * 1 + 0.1;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        // Interactivity
        if (mouse.x && mouse.y) {
            if (mouse.x - this.x < range && mouse.x - this.x > -range && mouse.y - this.y < range && mouse.y - this.y > -range) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
            }
            else if (this.radius > minRadius) {
                this.radius -= 1;
            }
        }
        this.draw();
    }
}
let circleArray = [];
for (let i = 0; i < 1000; i++) {
    circleArray.push(new Circle());
}
// Animating Things
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    circleArray.forEach(v => {
        v.update();
    });
}
animate();
