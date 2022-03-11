// Please review LICENSE.md for usage limitations

let bg = 255;
let lineCount = 2 + Math.floor(fxrand()*20);
let amplitude = 20 + Math.floor(fxrand()*100);
let rowCount = 1+Math.floor(fxrand()*10);
let ySpacing = 50;
let resolution = 40; // + Math.floor(fxrand()*75)
let period = 1 + Math.floor(fxrand()*10);
let gridSpacing = 1 + Math.floor(fxrand()*10);
let padding = 200;


function setup() {
    createCanvas(1000,1000);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    background(bg);
}

function draw() {

    noFill();

    for(let i = 1; i <= rowCount; i++){

        for(let t = 0; t < lineCount; t++){
            strokeWeight(0.10*(t+1));
            stroke(200, 0, 0, 50 * (t+20));
            beginShape();
            for(let j = 0; j <= resolution; j++){
                curveVertex((j * width/resolution), (i * height/(rowCount + 1)) + fxrand() * amplitude);
                noLoop();
            }
            endShape();
        }
    }

    // masking
    let sw = 10 + fxrand() * 50;
    let gridCut = 200; //+ fxrand();
    for(let i = 0; i <= gridSpacing; i++){
        let lineX = (i * width) / gridSpacing;
        strokeCap(SQUARE);
        strokeWeight(sw);
        stroke(bg); //bg
        line(lineX, 0, lineX, height);
    }

    blendMode(OVERLAY);
    let randX = fxrand() * width;
    let randY = fxrand() * height;
    let randW1 = 50 + fxrand() * 500;
    let randW2 = 50 + fxrand() * 500;
    noStroke();
    fill(200,35,100,100);
    rect(randX, randY, randW1, randW2);


    let randX1 = fxrand() * width;
    let randY1 = fxrand() * height;
    let randR = 500 + fxrand() * 2000;
    noStroke();
    fill(200,75,100,100);
    ellipse(randX1, randY1, randR);


    // // Layer 1 - Create draw layer. All drawings need to happen here if wanting to be clipped by mask.
    // canvasDraw.stroke(bgLineColor);
    // canvasDraw.strokeWeight(bgStrokeWeight);
    // lineTexture(lineTextureCount);

    // // Layer 2 - Create mask layer
    // mLayer = createGraphics(formatWidth, formatHeight);
    // mLayer.translate(0, 0); // move the mask into place. 0,0 for full sized CG.

    // // <----- make any shapes you like to use as a mask below here ----->


    // // Make the mask layer an actual mask.
    // drawClone = canvasDraw.get();
    // drawClone.mask(mLayer.get());

    // // Instantiate the mask layer.
    // image(drawClone, 0, 0);

    // <-------------------------------- Draw anything you want on top of this mask layer and below this line ------------------------------------------>

}

// <----------------------------------------------- Draw Functions ----------------------------------------------------> //

// Description: fxrand driven placement of shapes origins
function randomPlacement(){
    rX = fxrand() * width;
    rY = fxrand() * height;
}

function randomSizing(){
    s = 20 + fxrand() * 350;
}

// <-------------------------------------------------- Probability controls below this section ---------------------------------------------------->

// Description: Sets the color for BG
function setBackgroundColor(n) {
    // special rare bg
    let hue = 50;
    let saturation = 10;
    let brightness = 100;
    let maxAlpha = 100; 
    if (n >= 0.9) {
        // Special Gold Background
        bg = color(hue, saturation, brightness, maxAlpha);
        return optionNum = 0; 
    } else if(n < 0.9 && n >= 0.45){
        // 50/50 for Black BG
        bg = color(0);
        return optionNum = 1; 
    }else if(n < 0.45 && n >= 0){
        // 50/50 for White BG
        bg = color(0, 2, 100, 50);
        return optionNum = 2; 
    }
}

// <----- Object Classes below this section ----->
class Lines {
    constructor(x1, y1, x2, y2) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    }
    connect() {
        line(this.x1, this.y1, this.x2, this.y2);
    }
  }

  // <--------------------------------------------------------------- User controls -----------------------------------------------------------------> 

function keyPressed() {
    switch (key) {
        case 's':
            save("Hotlines" + ".png")
            break
    }
}