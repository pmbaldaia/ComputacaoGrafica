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
    ctx.strokeStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
    ctx.stroke();
    }

    update() {
    this.y += this.dY; // update vertical position
    if (this.y > H + this.R*2){
        this.y = this.y - (H + this.R*2)
    } 
    if (this.y < -this.R*2){
        this.y = this.y + (H + this.R*2)
    }
    this.x += this.dX; // update horizontal position
    if (this.x > W + this.R*2){
        this.x = this.x - (W + this.R*2)
    }
    if (this.x < -this.R*2){
        this.x = this.x + (W + this.R*2)
    }    
        
    }
}

class Ship{
    constructor(x,y,c,r){
        this.x = x; // initial X position
        this.y = y; // initial Y position
        this.c = c; // color
        this.r = r; 
    }

    draw(){
        //draw ship
        ctx.strokeStyle = this.c;
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x - 2, this.y - 2);
        ctx.lineTo(this.x,this.y + 3)
        ctx.lineTo(this.x + 2, this.y - 2)
        ctx.stroke();
    }

    update() {
        this.y += this.dY; // update vertical position
        if (this.y > H + this.r){
            this.y = this.y - (H + this.r)
        } 
        if (this.y < -this.r){
            this.y = this.y + (H + this.r)
        }
        this.x += this.dX; // update horizontal position
        if (this.x > W + this.r){
            this.x = this.x - (W + this.r)
        }
        if (this.x < -this.r){
            this.x = this.x + (W + this.r)
        }
    }
}



let b = new Array(); // setup as many balls as wanted
for (let i = 0; i < 5; i++) {

    let color = `rgb(255,255,255)`; // randomcolor
    // randomposition (inside Canvas)
    let xInit = 20 + Math.random() * (W - 2 * 20);
    let yInit = 20 + Math.random() * (W - 2 * 20);
    
    // randomdirection
    let direction = Math.random() * 2 * Math.PI;
    //random size
    let rayo = 5 + Math.random() * (5);
    //random velocity
    let velocity = 0.2 + Math.random() * (0.4);

    b.push(new Ball(xInit, yInit, rayo, direction, color, velocity))
}

let s = new Array();//setup the ship
let xCenter = 150;
let yCenter = 75; 
let color = `rgb(255,255,255)`; // randomcolor
let rayon = 5;

s.push(new Ship(xCenter, yCenter, color, rayon))




console.log(s);
console.log(b);
function render() {
    // fade Canvas
    ctx.fillStyle = "rgba(19,19,19,0.75)"
    ctx.fillRect(0, 0, W, H);
    // draw & update
    b.forEach( ball => {
    ball.draw();
    ball.update();
    });
    s.forEach( ship => {
    ship.draw();
    ship.update();
    });
    ;
    //new frame
    window.requestAnimationFrame(render);
    }
    render(); //startthe animation