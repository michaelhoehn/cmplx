// Please review LICENSE.md for usage limitations

let bg = 255;
let yPadding = 100;
let lineCount = 1;
let amplitude = 1 + Math.floor(fxrand()*150);
let rowCount = 5;
let ySpacing = 50;
let resolution = 20 + Math.floor(fxrand()*100);
let period = 1 + Math.floor(fxrand()*10);
// let num = 1 + Math.floor(fxrand()*5);


function setup() {
    createCanvas(1000,1000);
    rectMode(CENTER);
    background(bg);
}

function draw() {
    

    //strokeWeight(100);
    //stroke(bg);
    //rect(width/2, height/2, width, height);
    strokeWeight(1);
    stroke(0);
    noFill();


    // for row count > make lines 
    for(let i = 1; i <= rowCount; i++){
        beginShape();
        // for 
        for(let j = 0; j <= resolution; j++){
            let y = i * height/(rowCount + 1);
            curveVertex((j * width/resolution), y + fxrand() * amplitude);
            noLoop();
        }
        endShape();
    }

    // for(let i = 0; i<lineCount; i++){
    //     beginShape();
    //     for(let i = 0; i<=num; i++){
    //         curveVertex(i * width/num * spacing, yPadding + fxrand() * amplitude);
    //         noLoop();
    //     }
    //     endShape();
    // }

    // masking
    noStroke();
    let gridSpacing = 5;
    for(let i = 0; i <= gridSpacing; i++){
        let lineX = (i * width) / gridSpacing;
        strokeWeight(75);
        stroke(bg);
        line(lineX, 0, lineX, height);
    }

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