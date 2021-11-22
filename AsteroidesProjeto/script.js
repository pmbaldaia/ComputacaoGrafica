import Ship from './ship.js';

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const W = canvas.width, H = canvas.height;
let angle = 0 

class Asteroid { 
    constructor(x, y, r, d, c, v, angle) { // CONSTRUCTOR
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
    ctx.save();
    ctx.translate(this.x,this.y)
    ctx.rotate(angle * Math.PI / 360)
    ctx.beginPath();
    ctx.lineTo(-5,-40)
    ctx.lineTo(-30,-30)
    ctx.lineTo(-30,-25)
    ctx.lineTo(-45,0)
    ctx.lineTo(-25,10)
    ctx.lineTo(-40,20)
    ctx.lineTo(-30,35)
    ctx.lineTo(-5,35)
    ctx.lineTo(5,25)
    ctx.lineTo(15,40)
    ctx.lineTo(35,5)
    ctx.lineTo(30,-5)
    ctx.lineTo(40,-15)
    ctx.lineTo(35,-35)
    ctx.lineTo(-5,-40)
    ctx.stroke();
    ctx.restore()
    }

    update() {
        this.y += this.dY; // update vertical position
        if (this.y > H - (this.y+50/2) + this.R*2){
            this.y = this.y - (H + this.R*2)
        }
        if (this.y < -(this.y+50/2) - this.R*2){
            this.y = this.y + (H + this.R*2)
        }
        this.x += this.dX; // update horizontal position
        if (this.x > W - (this.x+(-20+25)/2) + this.R*2){
            this.x = this.x - (W + this.R*2)
        }
        if (this.x < - (this.x+(-20+25)/2) -this.R*2){
            this.x = this.x + (W + this.R*2)
        }    
    }
}




// setup asteroids
let asteroids = new Array(); 
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

    asteroids.push(new Asteroid(xInit, yInit, rayo, direction, color, velocity))
}

//setup the ship
let ship = new Ship(W/2, H/2, `rgb(255,255,255)`, 10, ctx,W,H)







function render() {
    // fade Canvas
    ctx.fillStyle = "rgba(19,19,19,0.75)"
    ctx.fillRect(0, 0, W, H);
    // draw & update
    asteroids.forEach( asteroid => {
    asteroid.draw();
    asteroid.update();
    });
    ship.draw();
    ship.update();

    //desenhar balas do player
    ship.drawBullets();

    if (ship.move == 1){
        ship.turnRight();
    } else if (ship.move == -1){
        ship.turnLeft();
    }

    if (ship.speed == 1){
        ship.goForth();
    } else if (ship.speed == -1){
        ship.goBack();

    }

    //atualizar balas do player
    ship.updateBullets();

    angle++;
    //new frame
    window.requestAnimationFrame(render);
    }
    render(); //startthe animation


    /*******************************************
     * CONTROL PLAYER USING KEYS
    *********************************************/
     window.addEventListener('keydown', (e)=>{
        e.preventDefault();
        if (e.key == 'ArrowRight'){ /*seta para direita*/
          ship.move = 1;}
        if (e.key == 'ArrowLeft'){ /*seta para direita*/
          ship.move = -1;}
        if (e.key == 'ArrowUp'){ /*seta para direita*/
          ship.speed = 1;}  
        if (e.key == 'ArrowDown'){ /*seta para direita*/
          ship.speed = -1;}
        if (e.keyCode == 32){ /*space bar*/
          ship.createBullet();}
      }
      );
  
  
      window.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (e.key == 'ArrowRight' && ship.move == 1) /*seta para direita*/
          ship.move = 0;
        if (e.key == 'ArrowLeft' && ship.move == -1)/*seta para esquerda*/
          ship.move = 0;
        if (e.key == 'ArrowUp' && ship.speed == 1) /*seta para direita*/
          ship.speed = 0;
        if (e.key == 'ArrowDown' && ship.speed == -1) /*seta para direita*/
          ship.speed = 0;
          
      });