export default class Ship{
    constructor(x,y,c,r,ctx,W,H){
        this.x = x; // initial X position
        this.y = y; // initial Y position
        this.c = c; // color
        this.r = r; //collision
        this.orientation = 0
        this.move = ''
        this.ctx = ctx;
        this.speed = ''
        this.W = W
        this.H = H
        this.bullets = []
        this.bulletsOrientationX = 2
        this.bulletsOrientationY = 2
        this.state = 'alive'
        this.sizeX = 10
        this.sizeY = 15

    }

    draw(){
        //draw ship
        this.ctx.strokeStyle = this.c;
        this.ctx.save()
        this.ctx.translate(this.x,this.y)
        this.ctx.rotate(this.orientation * Math.PI / 180)
        this.ctx.beginPath();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(10, 10);
        this.ctx.lineTo(0, -20);
        this.ctx.lineTo(-10, 10);
        this.ctx.lineTo(0, 0);
        this.ctx.lineTo(0,-20)
        this.ctx.stroke();        
        this.ctx.restore();
        
    }

    turnRight() {
        this.orientation = this.orientation + 3
    }
    turnLeft() {
        this.orientation = this.orientation - 3
    }
    goForth(){
        this.y = this.y - 3*Math.cos(this.orientation * Math.PI / 180)
        this.x = this.x + 3*Math.sin(this.orientation * Math.PI / 180)
    }
    goBack(){
        this.y = this.y + 3*Math.cos(this.orientation * Math.PI / 180)
        this.x = this.x - 3*Math.sin(this.orientation * Math.PI / 180)
    }

    updateBullets() {
        for (let i = 0; i < this.bullets.length; i++) {
          this.bullets[i].y -= this.bullets[i].directionY;        // problem: moves along wiht the ship 
          this.bullets[i].x += this.bullets[i].directionX;
          if (this.bullets[i].y < 0 || this.bullets[i].y > this.H || this.bullets[i].x < 0 || this.bullets[i].x > this.W ) {
            this.bullets.splice(i, 1);  // remove bala se esta atingir o topo do Canvas
            i--;
          }
        }
      }

    createBullet() {
        // acrescenta uma nova bala no array de balas, apartir da posição do player
        
        this.bullets.push({
          x: this.x + 20*Math.sin(this.orientation * Math.PI / 180),
          y: this.y - 20*Math.cos(this.orientation * Math.PI / 180),
          w: 4,
          h: 4,
          directionY: 6*Math.cos(this.orientation * Math.PI / 180),
          directionX: 6*Math.sin(this.orientation * Math.PI / 180)
        });
      }

      drawBullets() {
        // desenha todas as balas
        for (let i = 0; i < this.bullets.length; i++) {
          // console.log(this.bullets[i])
          this.ctx.fillStyle = "white";
          this.ctx.fillRect(this.bullets[i].x, this.bullets[i].y, this.bullets[i].w, this.bullets[i].h);
        }
      }

    update() {
        // update vertical position
        if (this.y > this.H + this.r){
            this.y = this.y - (this.H + this.r)
        }
        if (this.y < - this.r){
            this.y = this.y + (this.H + this.r)
        }
       // update horizontal position
        if (this.x > this.W + this.r){
            this.x = this.x - (this.W + this.r)
        }
        if (this.x < - this.r){
            this.x = this.x + (this.W + this.r)
        }

    }
}