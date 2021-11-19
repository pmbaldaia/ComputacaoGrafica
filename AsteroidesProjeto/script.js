const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x - 20, this.y + 10)
    ctx.lineTo(this.x - 20, this.y + 15)
    ctx.lineTo(this.x - 25, this.y + 25)
    ctx.lineTo(this.x - 25, this.y + 30)
    ctx.lineTo(this.x - 10, this.y + 35)
    ctx.lineTo(this.x - 20, this.y + 40)
    ctx.lineTo(this.x - 15, this.y + 45)
    ctx.lineTo(this.x - 10, this.y + 50)
    ctx.lineTo(this.x, this.y + 50)
    ctx.lineTo(this.x + 5, this.y + 45)
    ctx.lineTo(this.x + 10, this.y + 50)
    ctx.lineTo(this.x + 25, this.y + 30)
    ctx.lineTo(this.x + 20, this.y + 25)
    ctx.lineTo(this.x + 25, this.y + 20)
    ctx.lineTo(this.x + 20, this.y + 10)
    ctx.lineTo(this.x + 10, this.y + 5)
    ctx.lineTo(this.x, this.y + 5)
    ctx.lineTo(this.x, this.y)
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
        ctx.save()
        ctx.translate(W/2,H/2)
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x + 10, this.y + 10);
        ctx.lineTo(this.x,this.y - 20);
        ctx.lineTo(this.x - 10, this.y + 10);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
    }

    update() {
        // update vertical position
        if (this.y > H + this.r){
            this.y = this.y - (H + this.r)
        }
        if (this.y < -this.r){
            this.y = this.y + (H + this.r)
        }
       // update horizontal position
        if (this.x > W + this.r){
            this.x = this.x - (W + this.r)
        }
        if (this.x < -this.r){
            this.x = this.x + (W + this.r)
        } 
    }
}


// setup asteroids
let b = new Array(); 
for (let i = 0; i < 5; i++) {

    let color = `rgb(255,255,255)`; // randomcolor
    // randomposition (inside Canvas)
    let xInit = 20 + Math.random() * (W - 2 * 20);
    let yInit = 20 + Math.random() * (H - 2 * 20);
    
    // randomdirection
    let direction = Math.random() * 2 * Math.PI;
    //random size
    let rayo = 30;
    //random velocity
    let velocity = 1 + Math.random() * (1);

    b.push(new Ball(xInit, yInit, rayo, direction, color, velocity))
}

//setup the ship
let s = new Array();
{let xCenter = 0;
let yCenter = 0; 
let color = `rgb(255,255,255)`; // randomcolor
let rayon = 5;

s.push(new Ship(xCenter, yCenter, color, rayon))
}






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