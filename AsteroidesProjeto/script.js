import Ship from './ship.js';
import Asteroid from './asteroid.js'

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const W = canvas.width, H = canvas.height; 


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
    let rayo = 40;
    //random velocity
    let velocity = 1 + Math.random() * (1);
    //rotation 
    let angle = 0

    asteroids.push(new Asteroid(xInit, yInit, rayo, direction, color, velocity, angle, ctx, W, H))
}

//setup the ship
let ship = new Ship(W/2, H/2, `rgb(255,255,255)`, 10, ctx,W,H)


  




function render() {
    // fade Canvas
    
    ctx.fillStyle = "rgba(19,19,19,0.75)"
    ctx.fillRect(0, 0, W, H);


    score();
    //verifica colisões ANTES de desenhar
    checkCollisionsBullets();
    checkCollisionsShips();


    if (ship.state == "alive"){
      ship.draw();
      ship.update();}

    for (let i = 0; i < asteroids.length; i++) {
      if (asteroids[i].state == "alive"){
        asteroids[i].draw();
        asteroids[i].update();}
      else {
        // remove inimigo se tiver sido detetada colisão c/1 bala
        asteroids.splice(i, 1);
        i--;
      }
    }
    //desenhar balas do ship
    ship.drawBullets();

    //atualizar balas do ship
    ship.updateBullets();

    if (ship.move == "R"){
        ship.turnRight();
    }
    if (ship.move == "L"){
        ship.turnLeft();
    }
    if (ship.speed == "F"){
        ship.goForth();
    }
    if (ship.speed == "B"){
        ship.goBack();
    }
    //new frame
    
    if(ship.state == 'alive' && asteroids.length > 0){
    window.requestAnimationFrame(render);}
    else if (asteroids.length == 0) {
      ctx.fillStyle = "white";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 40px arial';
      ctx.fillText("YOU WIN", W / 2, H / 2);
    }
    else {
      ctx.fillStyle = "white";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 40px arial';
        ctx.fillText("YOU LOST", W / 2, H / 2);
    }
    }
    
    render(); //startthe animation

    function score(){
      ctx.fillStyle = "white";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'left';
        ctx.font = 'bold 20px arial';
        ctx.fillText("YOU LOST", 0, 0);
    }


    function checkCollisionBullet(asteroid, bullet) {
      // verifica colisão entre 1 inimigo e 1 bala
      if (Math.sqrt((asteroid.x - bullet.x)*(asteroid.x - bullet.x) + (asteroid.y - bullet.y)*(asteroid.y - bullet.y)) > asteroid.R
      ) {
        return false;
      }
      return true;
    }

    function checkCollisionsBullets() {
      //percorre o array de inimigos 
      for (let i = 0; i < asteroids.length; i++) {
        //percorre o array de balas 
        for (let j = 0; j < ship.bullets.length; j++)
          //verifica se há colisão entre dois objetos (1 inimigo e 1 bala)
          if (checkCollisionBullet(asteroids[i], ship.bullets[j])) {
            //sinaliza futura remoção da bala
            ship.bullets[j].state = "dead";
            //sinaliza futura remoção do inimigo
            asteroids[i].state = "dead";
        }
      }
    }



    function checkCollisionShip(asteroid, ship) {
      // verifica colisão entre 1 inimigo e 1 bala
      if (Math.sqrt((asteroid.x - ship.x)*(asteroid.x - ship.x) + (asteroid.y - ship.y)*(asteroid.y - ship.y)) > asteroid.R
      ) {
        return false;
      }
      return true;
    }

    function checkCollisionsShips() {
      //percorre o array de inimigos 
      for (let i = 0; i < asteroids.length; i++) {
        //percorre o array de balas 
          if (checkCollisionShip(asteroids[i], ship)) {
            //sinaliza futura remoção da bala
            ship.state = "dead";
            //sinaliza futura remoção do inimigo
            asteroids[i].state = "dead";
          }
      }
    }


    //CONTROL ship USING KEYS
     window.addEventListener('keydown', (e)=>{
        e.preventDefault();
        if (e.key == " "){ /*space bar*/
          ship.createBullet();}
        if (e.key == 'ArrowRight'){ /*seta para direita*/
          ship.move = "R";}
        if (e.key == 'ArrowLeft'){ /*seta para direita*/
          ship.move = "L";}
        if (e.key == 'ArrowUp'){ /*seta para direita*/
          ship.speed = "F";}
        if (e.key == 'ArrowDown'){ /*seta para direita*/
          ship.speed = "B";}
        }
      );
  
      window.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (e.key == 'ArrowRight' && ship.move == "R") /*seta para direita*/
          ship.move = "";
        if (e.key == 'ArrowLeft' && ship.move == "L")/*seta para esquerda*/
          ship.move = "";
        if (e.key == 'ArrowUp' && ship.speed == "F") /*seta para direita*/
          ship.speed = "";
        if (e.key == 'ArrowDown' && ship.speed == "B") /*seta para direita*/
          ship.speed = "";
      });