let segments;
let x = 10;
let y;

function setup() {
    createCanvas(1000, 1000);
    y = height / 2;
    background(250);
}

function draw() {
    segments = 5;

    stroke(0);
    strokeWeight(5);

    for (let i = 0; i < segments; i++) {
        line(0, y, x, y);
        x = x + i;
        if (x > width || x < 0) {
            x = x + 5;
            y = y + 5;
        }
    }
}
