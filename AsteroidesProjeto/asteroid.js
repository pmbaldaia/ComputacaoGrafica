export default class Asteroid { 
    constructor(x, y, r, d, c, v, angle, ctx, W, H) { // CONSTRUCTOR
        this.x = x; // initial X position
        this.y = y; // initial Y position
        // (constant) horizontal displacement(velocity): d is a direction angle
        this.dX = v * Math.cos(d);
        // (constant) vertical displacement (velocity): d is a direction angle
        this.dY = v * Math.sin(d);
        this.c = c; // color
        this.R = r; // circle radius(constant)
        this.angle = angle
        this.ctx = ctx
        this.W = W
        this.H = H
        this.state = "alive";
    }

    draw() {
    this.ctx.strokeStyle = this.c;
    this.ctx.save();
    this.ctx.translate(this.x,this.y)
    this.ctx.rotate(this.angle * Math.PI / 360)
    this.ctx.beginPath();
    this.ctx.lineTo(-5,-40)
    this.ctx.lineTo(-30,-30)
    this.ctx.lineTo(-30,-25)
    this.ctx.lineTo(-45,0)
    this.ctx.lineTo(-25,10)
    this.ctx.lineTo(-40,20)
    this.ctx.lineTo(-30,35)
    this.ctx.lineTo(-5,35)
    this.ctx.lineTo(5,25)
    this.ctx.lineTo(15,40)
    this.ctx.lineTo(35,5)
    this.ctx.lineTo(30,-5)
    this.ctx.lineTo(40,-15)
    this.ctx.lineTo(35,-35)
    this.ctx.lineTo(-5,-40)
    this.ctx.stroke();
    this.ctx.restore()
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