let segments;
let x = 10;
let y;

function setup() {
    createCanvas(600, 600);
    y = height / 2;
}

function draw() {
    segments = 5;
    background(250);
    stroke(0);
    strokeWeight(5);

    for (let i = 0; i < segments; i++) {
        point(x, y);
        x = x + i; 
    }
}
