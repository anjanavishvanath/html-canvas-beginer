const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth; //make sure canvas takes entier parent width vise
canvas.height = window.innerHeight; // same as width

const ctx = canvas.getContext('2d'); //or could be webGL

const particlesArray = []
let hue = 0 

mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

canvas.addEventListener('mousemove', (event) => {
    // drawCircle()
    mouse.x = event.x
    mouse.y = event.y
    for(let i=0;i<5;i++){
        particlesArray.push(new Particle())

    }
})

canvas.addEventListener(('click'), function(event) {
    for(let i=0;i<10;i++){
        particlesArray.push(new Particle())

    }
})

class Particle {
    constructor() {
        this.x = mouse.x
        this.y = mouse.y
        // this.x = Math.random() * canvas.width//mouse.x
        // this.y = Math.random() * canvas.height//mouse.y
        this.size = Math.random() * 10 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `hsl(${hue}, 100%, 50%)`
    }
    update() {
        this.x += this.speedX
        this.y -= this.speedY
        if(this.size > 0.2) this.size -= 0.1
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}


function handleParticles(){
    for(let i=0;i<particlesArray.length;i++){
        particlesArray[i].update()
        particlesArray[i].draw()
        
        //draw lines connecting particles if they are within a certain length
        for(let j=i;j<particlesArray.length;j++){
            const dx = particlesArray[i].x - particlesArray[j].x //x axis length
            const dy = particlesArray[i].y - particlesArray[j].y
            const distance = Math.sqrt(dx*dx+dy*dy)
            if(distance<100){
                ctx.beginPath()
                ctx.strokeStyle = particlesArray[i].color
                ctx.lineWidth = 0.2
                //setting starting and ending points
                ctx.moveTo(particlesArray[i].x,particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x,particlesArray[j].y)
                ctx.stroke() //acctually draws the line
                ctx.closePath()
            }
        }

        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1)
            i-- //when we remove 1 element of an array, the rest shifts to left. In order t0
            //make sure we don't skip elements,we go back 1 
        }
    }
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height) //Clear the canvas
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height)//draw a transparent rect every frame
    handleParticles()
    hue++
    requestAnimationFrame(animate)
}

animate()
