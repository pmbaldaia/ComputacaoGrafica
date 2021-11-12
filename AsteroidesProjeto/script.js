const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");

const W = canvas.width, H = canvas.height;


class Ball { 
    constructor(x, y, r, d, c, v) { // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        // (constant) horizontal displacement(velocity): d is a direction angle
        this.dX = v * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        this.dY = v * Math.sin(d);
        this.c = c; // color
        this.R = r; // circle radius(constant)
    }

    draw() {
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
    ctx.fill();
    }

    update() {
    this.y += this.dY; // update vertical position
    if (this.y >= H + this.R){
        this.y = this.R
    }
    this.x += this.dX; // update horizontal position
    if (this.x >= W + this.R){
        this.x = this.R
    }
        
    }
}

let b = new Array(); // setup as many balls as wanted
for (let i = 0; i < 5; i++) {
    let R = Math.floor(Math.random() * 256);
    let G = Math.floor(Math.random() * 256);
    let B = Math.floor(Math.random() * 256);
    let color = `rgb(${R},${G},${B})`; // randomcolor
    // randomposition (inside Canvas)
    let xInit = 20 + Math.random() * (W - 2 * 20);
    
    // randomdirection
    let direction = Math.random() * 1 * Math.PI;
    //random size
    let rayo = 5 + Math.random() * (10 - 1 * 2);
    //random velocity
    let velocity = 0.2 + Math.random() * (W/100 - 0.4 * 0.4);

    b.push(new Ball(xInit, -rayo, rayo, direction, color, velocity))
}

function render() {
    // fade Canvas
    ctx.fillStyle = "rgba(255,255,255,0.25)"
    ctx.fillRect(0, 0, W, H);
    // draw & update
    b.forEach( ball => {
    ball.draw();
    ball.update();
    });
    //new frame
    window.requestAnimationFrame(render);
    }
    render(); //startthe animation