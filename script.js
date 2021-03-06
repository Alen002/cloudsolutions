let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
let num_particles = 200;//Change that to your liking

//Helper function to get a random color - but not too dark
function GetRandomColor() {
    let r = 0, g = 0, b = 0;
    while (r < 100 && g < 100 && b < 100)
    {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }

    return "rgb(" + r + "," + g + ","  + b + ")";
}

//Particle object with random starting position, velocity and color
let Particle = function () {
    this.Color = GetRandomColor();

    this.x = canvas.width * Math.random();
    this.y = canvas.height * Math.random();
    // Change speed of movement
    // Higher vx and vy number equals increased speed
    this.vx = 0.2 * Math.random();
    this.vy = 0.2 * Math.random();
   
    // Change size of the elements
    this.r = 10 * Math.random();

}

//Ading two methods
Particle.prototype.Draw = function (ctx) {
    ctx.fillStyle = this.Color;
    /* ctx.fillRect(this.x, this.y, 10, 10);  */
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.r, this.r * Math.PI);
    ctx.fill();
    

  
}
Particle.prototype.Update = function () {
    this.x += this.vx;
    this.y += this.vy;
 
    if (this.x<0 || this.x > canvas.width)
        this.vx = -this.vx;
 
    if (this.y < 0 || this.y > canvas.height)
        this.vy = -this.vy;
}
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    for (var i = 0; i < num_particles; i++) {
        particles[i].Update();
        particles[i].Draw(ctx);
    }
    requestAnimationFrame(loop);
}
//Create particles
for (let i = 0; i < num_particles; i++)
    particles.push(new Particle());
loop();