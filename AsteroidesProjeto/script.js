import Ship from './ship.js';
import Asteroid from './asteroid.js'
import EnemyShip from './enemyShip.js';

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const W = canvas.width, H = canvas.height; 

let interval;
let spaceTimer = 20

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
    let rotationSide = Math.random() > 0.5 ? 1 : -1

    asteroids.push(new Asteroid(xInit, yInit, rayo, direction, color, velocity, angle, ctx, W, H, rotationSide))
}

let enemyShip = new Array(); 
for (let i = 0; i < 2; i++) {

    let color = `rgb(255,0,0)`; // randomcolor
    // randomposition (inside Canvas)
    let xInit = 20 + Math.random() * (W - 2 * 20);
    let yInit = 20 + Math.random() * (H - 2 * 20);
    // randomdirection
    let direction = Math.random() * 2 * Math.PI;
    //random size
    let rayo = 25;
    //random velocity
    let velocity = 2 + Math.random() * (1);

    enemyShip.push(new EnemyShip(xInit, yInit, rayo, direction, color, velocity, ctx, W, H))
}

//starting nbr of enemies
let nbr_enemies = 5

//setup the ship
let ship = new Ship(W/2, H/2, `rgb(255,255,255)`, ctx,W,H)

function render() {
    
    //fade canvas
    ctx.fillStyle = "rgba(19,19,19,0.75)"
    ctx.fillRect(0, 0, W, H);

    //verify lives and level
    score();

    //verifica colisões ANTES de desenhar
    checkCollisionsBulletsAsteroids();
    checkCollisionsBulletsEnemy();
    checkCollisionsShipsAsteroids();
    checkCollisionsShipsEnemy();
    checkCollisionsShipBulletsEnemy();

    //verify if ship has lives
    if (ship.state >= 0){
      ship.draw();
    }
    ship.update();

    //check if asteroids are alive
    if(asteroids.length > 0){
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
    }
    
    //check if enemies are alive
    if(enemyShip.length > 0){
      for (let i = 0; i < enemyShip.length; i++) {
        if (enemyShip[i].state == "alive"){
          enemyShip[i].draw();
          enemyShip[i].update();
          enemyShip[i].drawEnemyBullets();
          enemyShip[i].updateEnemyBullets();
          }
        else {
          // remove inimigo se tiver sido detetada colisão c/1 bala
          enemyShip.splice(i, 1);
          i--;
        }
      }
    }
    

    //desenhar e atualizar balas do ship
    ship.drawBullets();
    ship.updateBullets();


    //check movements
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
    
    // verify if you lost or go to next level
    if(ship.state >= 0 && asteroids.length + enemyShip.length > 0){
    window.requestAnimationFrame(render);
    } else if (asteroids.length + enemyShip.length == 0) {
      for (let i = 0; i < nbr_enemies; i++) {
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
        //rotation side
        let rotationSide = Math.random() > 0.5 ? 1 : -1
    
        asteroids.push(new Asteroid(xInit, yInit, rayo, direction, color, velocity, angle, ctx, W, H, rotationSide))
      }
      for (let i = 0; i < nbr_enemies/3; i++) {

        let color = `rgb(255,0,0)`; // randomcolor
        // randomposition (inside Canvas)
        let xInit = 20 + Math.random() * (W - 2 * 20);
        let yInit = 20 + Math.random() * (H - 2 * 20);
        // randomdirection
        let direction = Math.random() * 2 * Math.PI;
        //random size
        let rayo = 25;
        //random velocity
        let velocity = 2 + Math.random() * (1);

        enemyShip.push(new EnemyShip(xInit, yInit, rayo, direction, color, velocity, ctx, W, H))
    }
      nbr_enemies++
      window.requestAnimationFrame(render);
    } else if(ship.state < 0) {
        ctx.fillStyle = "white";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 40px Revamped';
        ctx.fillText("YOU LOST", W / 2, H / 2);
    }

    spaceTimer++   
    }
  
    render(); //startthe animation
    intervalFunc();

    function intervalFunc(){
      interval = setInterval(createEnemyShipBullets , 2000)
    }
    
    function createEnemyShipBullets(){
      if(enemyShip.length > 0){
      for (let i = 0; i < enemyShip.length; i++) {
        enemyShip[i].createEnemyBullet();
        if(enemyShip[i].orientation == 360){
        enemyShip[i].orientation =  0
        } else{
          enemyShip[i].orientation =  enemyShip[i].orientation + 90
        }
      } 
    }}

    //set score and level
    function score(){
        ctx.fillStyle = "white";
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '16px Revamped';
        let vidas = "Vidas: "+ ship.state;
        let nivel = "Nivel: " + (nbr_enemies - 4)
        ctx.fillText(vidas, 5, 5);
        ctx.fillText(nivel, 5, 25);
    }
    //set collisions
    //asteroids - bulletsFriend
    function checkCollisionBulletAsteroids(asteroid, bullet) {
      // verifica colisão entre 1 inimigo e 1 bala
      if (Math.sqrt((asteroid.x - bullet.x)*(asteroid.x - bullet.x) + (asteroid.y - bullet.y)*(asteroid.y - bullet.y)) > asteroid.R
      ) {
        return false;
      } else {
      return true;
      }
    }

    function checkCollisionsBulletsAsteroids() {
      //percorre o array de inimigos 
      for (let i = 0; i < asteroids.length; i++) {
        //percorre o array de balas 
        for (let j = 0; j < ship.bullets.length; j++)
          //verifica se há colisão entre dois objetos (1 inimigo e 1 bala)
          if (checkCollisionBulletAsteroids(asteroids[i], ship.bullets[j])) {
            //sinaliza futura remoção da bala
            ship.bullets[j].state = "dead";
            //sinaliza futura remoção do inimigo
            asteroids[i].state = "dead";
        }
      }
    }

    //enemy - bulletsFriend
    function checkCollisionBulletEnemy(Enemy, bullet) {
      // verifica colisão entre 1 inimigo e 1 bala
      if (Math.sqrt((Enemy.x - bullet.x)*(Enemy.x - bullet.x) + (Enemy.y - bullet.y)*(Enemy.y - bullet.y)) > Enemy.R
      ) {
        return false;
      }
      return true;
    }

    function checkCollisionsBulletsEnemy() {
      //percorre o array de inimigos 
      for (let i = 0; i < enemyShip.length; i++) {
        //percorre o array de balas 
        for (let j = 0; j < ship.bullets.length; j++)
          //verifica se há colisão entre dois objetos (1 inimigo e 1 bala)
          if (checkCollisionBulletEnemy(enemyShip[i], ship.bullets[j])) {
            //sinaliza futura remoção da bala
            ship.bullets[j].state = "dead";
            //sinaliza futura remoção do inimigo
            enemyShip[i].state = "dead";
        }
      }
    }

    // asteroids - ship
    function checkCollisionShipAsteroids(asteroid, ship) {
      // verifica colisão entre 1 inimigo e 1 bala
      if (Math.sqrt((asteroid.x - (ship.x))*(asteroid.x - ship.x) + (asteroid.y - ship.y)*(asteroid.y - ship.y)) - 15 > asteroid.R
      ) {
        return false;
      } else {
        return true;
      }
      
    }

    function checkCollisionsShipsAsteroids() {
      for (let i = 0; i < asteroids.length; i++) {
          if (checkCollisionShipAsteroids(asteroids[i], ship)) {
            ship.state = ship.state - 1;
            asteroids[i].state = "dead";
          }
      }
    }

    //enemy - ship
    function checkCollisionShipEnemy(enemy, ship) {
      // verifica colisão entre 1 inimigo e 1 bala
      if (Math.sqrt((enemy.x - (ship.x))*(enemy.x - ship.x) + (enemy.y - ship.y)*(enemy.y - ship.y)) - 15 > enemy.R
      ) {
        return false;
      }
      return true;
    }

    function checkCollisionsShipsEnemy() {
      for (let i = 0; i < enemyShip.length; i++) {
          if (checkCollisionShipEnemy(enemyShip[i], ship)) {
            ship.state = ship.state - 1;
            enemyShip[i].state = "dead";
          }
      }
    }

    //ship - bulletsEnemy
    function checkCollisionShipBulletEnemy(ship, bullet) {
      if (Math.sqrt((bullet.x - ship.x)*(bullet.x - ship.x) + (bullet.y - ship.y)*(bullet.y - ship.y))> ship.r) {
        ;
        return false;
      } else {
        return true;
      }
      
    }

    function checkCollisionsShipBulletsEnemy() {
      for (let i = 0; i < enemyShip.length; i++) {
        for (let j = 0; j < enemyShip[i].bullets.length; j++)
          if (checkCollisionShipBulletEnemy(ship, enemyShip[i].bullets[j])) {
            enemyShip[i].bullets[j].state = "dead";
            ship.state = ship.state - 1;
        }
      }
    }

    //CONTROL ship USING KEYS
     window.addEventListener('keydown', (e)=>{
        e.preventDefault();
        if (e.key == " " && spaceTimer > 20){ /*space bar*/
          spaceTimer = 0
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