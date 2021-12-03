export default class EnemyShip{
    constructor(x, y, r, d, c, v, ctx, W, H) { // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        // (constant) horizontal displacement(velocity): d is a direction angle
        this.dX = v * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        this.dY = v * Math.sin(d);
        this.c = c; // color
        this.R = r; // circle radius(constant)
        this.ctx = ctx
        this.W = W
        this.H = H
        this.state = "alive";
        this.bullets = []
        this.orientation = 0
    }

    draw() {
        this.ctx.strokeStyle = "red";
        this.ctx.save()
        this.ctx.translate(this.x,this.y)
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, 0, 1 * Math.PI, true)
        this.ctx.lineTo(-25, 5)
        this.ctx.lineTo(-10, 15)
        this.ctx.lineTo(10, 15)
        this.ctx.lineTo(25, 5)
        this.ctx.lineTo(10, 0)
        this.ctx.lineTo(-10, 0)
        this.ctx.moveTo(-15, 5)
        this.ctx.lineTo(-14, 5)
        this.ctx.moveTo(-10, 5)
        this.ctx.lineTo(-11, 5)
        this.ctx.moveTo(-5, 5)
        this.ctx.lineTo(-4, 5)
        this.ctx.moveTo(0, 5)
        this.ctx.lineTo(1, 5)
        this.ctx.moveTo(5, 5)
        this.ctx.lineTo(6, 5)
        this.ctx.moveTo(10, 5)
        this.ctx.lineTo(11, 5)
        this.ctx.moveTo(15, 5)
        this.ctx.lineTo(16, 5)
        this.ctx.stroke()
        this.ctx.restore()
    }

    updateEnemyBullets() {
        for (let i = 0; i < this.bullets.length; i++) {
          this.bullets[i].y -= this.bullets[i].directionY;        // problem: moves along wiht the ship 
          this.bullets[i].x += this.bullets[i].directionX;
          if (this.bullets[i].y < 0 || this.bullets[i].y > this.H || this.bullets[i].x < 0 || this.bullets[i].x > this.W  || this.bullets[i].state == "dead") {
            this.bullets.splice(i, 1);  // remove bala se esta atingir o topo do Canvas
            i--;
          }
        }
    }

    createEnemyBullet() {
        // acrescenta uma nova bala no array de balas, apartir da posição do player
        this.bullets.push({
          x: this.x + 20*Math.sin(this.orientation * Math.PI),
          y: this.y - 20*Math.cos(this.orientation * Math.PI),
          w: 4,
          h: 4,
          directionY: 3*Math.cos(this.orientation * Math.PI),
          directionX: 3*Math.sin(this.orientation * Math.PI),
          state: 'alive'
        });
    }

    drawEnemyBullets() {
        // desenha todas as balas
        for (let i = 0; i < this.bullets.length; i++) {
          // console.log(this.bullets[i])
          this.ctx.fillStyle = "red";
          this.ctx.fillRect(this.bullets[i].x, this.bullets[i].y, this.bullets[i].w, this.bullets[i].h);
        }
    }

    update() {
        this.y += this.dY; // update vertical position
        if (this.y > this.H - (this.y+50/2) + this.R*2){
            this.y = this.y - (this.H + this.R*2)
        }
        if (this.y < -(this.y+50/2) - this.R*2){
            this.y = this.y + (this.H + this.R*2)
        }
        this.x += this.dX; // update horizontal position
        if (this.x > this.W - (this.x+(-20+25)/2) + this.R*2){
            this.x = this.x - (this.W + this.R*2)
        }
        if (this.x < - (this.x+(-20+25)/2) -this.R*2){
            this.x = this.x + (this.W + this.R*2)
        }  
        this.angle = this.angle + 1
    }
}