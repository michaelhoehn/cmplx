// Please review LICENSE.md for usage limitations

// <----- To Do -----> 
// refine probabilities
// refine counts for things
// fix color issues : color should be removed from the methods and brought into their own gridColor() + hotlineColor() methods respectively
// the issue is that bc colors are being called throughout, the colors are being manipulated in unpredictable ways
// add back in the directional * -1 in the Hotlines method
// landscape / horizontal / square composition function setting 33% each

// integrate with fxhash
// fxrand() will control the seed <-- some testing required to make this work as is.
// fxrand() to be used in all random() instances 

let i;
let canvasDraw;
let x, y;
let x1, y1;
let bg;
let shapeProb, bgProb, gridProb, randShapeProb, thicknessProb;
let gridDir;
let noiseScale = 0.02;
let gridSegments = [3, 4, 5, 10, 20, 50];
let shapeCount = [1, 2, 3, 4, 5];
let segmentCounts = [5, 10, 15, 20, 50];
let lineWeights = [0.05, 0.15, 0.5, 1, 5, 10, 20];
let rectSizes = [10, 20, 50, 100, 200, 300, 500];
let alphaOptions = [50, 100, 200];
let thicknessDir = [45, 90];
let offsetDist = [0, 10, 25, 100];
let lineThicknesses = [0, 10, 50, 100, 500];
let noiseCount;
let seed;
let repeatNum;
let formatWidth = 800;
let formatHeight = 1500;

function setup() {
 
    createCanvas(formatWidth, formatHeight);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    canvasDraw = createGraphics(formatWidth, formatHeight);
    //seed = randomSeed(1684); <-- this needs integration with FXhash
    x1 = random(formatWidth);
    y1 = random(formatHeight);
    gridProb = floor(random(4));
    noiseCount = random(25000, 50000);
}

function draw() {
    // Background layer
    bgSet();
    background(bg);

    // Layer 1 - Create draw layer. All drawings need to happen here if wanting to be clipped by mask.
    //canvasDraw.background(50, 100);
    canvasDraw.stroke(lineColor);
    canvasDraw.strokeWeight(random(0.05, 0.75));
    lineTexture(random(1000, 10000)); // Look at this function, the CG is modified in the core code.

    // Layer 2 - Create mask layer
    mLayer = createGraphics(formatWidth, formatHeight);
    mLayer.translate(0, 0); // move the mask into place. 0,0 for full sized CG.

    // <----- make any shapes you like to use as a mask below here ----->
    shapeCount = ceil(random(shapeCount.length));

    let shapeType = shapeSet();

    if (shapeType == 0) {
        for (i = 0; i < shapeCount; i++) {
            rectSizeIndex();
            let rectSize1 = rs;
            rectSizeIndex();
            let rectSize2 = rs;
            mLayer.rect(random(formatWidth), random(formatHeight), rectSize1, rectSize2);
        }
    } else {
        for (i = 0; i < shapeCount; i++) {
            mLayer.ellipse(random(formatWidth), random(formatHeight), random(20, 350));
        }
    }

    // Make the mask layer an actual mask.
    drawClone = canvasDraw.get();
    drawClone.mask(mLayer.get());

    // Instantiate the mask layer.
    image(drawClone, 0, 0);

    // <----- Draw anything you want on top of this mask layer and below this line ----->

    let gridType = gridSet();
    gridSegmentIndex();
    let gridSegs = gs;
    segmentIndex();
    let segCount = sc;
    strokeIndex();
    let lWeight = lw;
    alphaValue();
    let alphaVal = av;

    if (gridType == 0) {
        gridX();
        print("grid type X");
    } else if (gridType == 1) {
        gridY();
        print("grid type Y");
    } else if (gridType == 2) {
        gridXY();
        print("grid type XY");
    } else {
        gridNull();
        print("grid type None");
    }

    drawLineGradient();
    shapeGradient();
    rareShapeDrop();
    hotLines(sc, lw, av);
    noisey(noiseCount, random(0.5, 3.5));
    blendMode(SOFT_LIGHT);
    noLoop();

    // <----- Debugging Messages -----> 
    print("Alpha Value: " + av);
    print("LineWeight Value: " + lw);
    print("Segment Count Value: " + sc);
}

// <----- Functions -----> //

// Description: Set the line work underlay based on segment count
function lineTexture(n) {
    let numSegments = n;
    for (i = 0; i < numSegments; i++) {
        x2 = random(formatWidth);
        y2 = random(formatHeight);
        canvasDraw.line(x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
    }
}

// Description: Controls the line behavior based on count, strokeweight, and alpha
function hotLines(c, s, a) {
    thicknessDirection();
    offsetDistance();
    lineThickness();
    let offset = od; 
    for (i = 0; i < c; i++) {
        stroke(lineColor, a);
        strokeWeight(s);
        x2 = random(formatWidth);
        y2 = random(formatHeight);
        let hotline = new Lines(x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
        hotline.connect();

        //let direction = td;
        if(td == 45){
            for(j=0; j<lt; j++){
                let thickLine = new Lines(hotline.x1 + offset + j, hotline.y1 + offset + j, hotline.x2 + offset + j, hotline.y2 + offset + j);
                thickLine.connect();
            }
        } else {
            for(j=0; j<lt; j++){
                let thickLine = new Lines(hotline.x1 - offset - j, hotline.y1 - offset - j, hotline.x2 - offset - j, hotline.y2 - offset - j);
                thickLine.connect();
            }
        }
    }
}

// Description: Creates a grid with X Direction offset
function gridX() {
    for (i = 1; i <= gs; i++) {
        let lineX = (i * formatWidth) / gs;
        stroke(lineColor);
        strokeWeight(0.25);
        line(lineX, 0, lineX, formatHeight);
    }
}

// Description: Creates a grid with Y Direction offset
function gridY() {
    for (i = 1; i <= gs; i++) {
        let lineY = (i * formatHeight) / gs;
        stroke(lineColor);
        strokeWeight(0.25);
        line(0, lineY, formatWidth, lineY);
    }
}

// Description: Creates a grid with Y Direction offset
function gridXY() {
    for (i = 1; i <= gs; i++) {
        for (i = 1; i <= gs; i++) {
            let lineX = (i * formatWidth) / gs;
            stroke(lineColor);
            strokeWeight(0.25);
            line(lineX, 0, lineX, formatHeight);

            let lineY = (i * formatHeight) / gs;
            stroke(lineColor);
            strokeWeight(0.25);
            line(0, lineY, formatWidth, lineY);
        }
    }
}

// Description: Null grid
function gridNull() {
    for (i = 1; i <= gs; i++) {
        let lineX = (i * formatWidth) / gs;
        stroke(bg);
        strokeWeight(0.25);
        line(lineX, 0, lineX, formatHeight);
    }
}

// Description: Place random rare shape
function rareShapeDrop() {
    let ps = placeRandShape();
    if (ps == 0) {
        //fill(255, 0, 0);
        noStroke();
        ellipse(random(formatWidth), random(formatHeight), random(20, 200));
    } else if (ps == 1) {
        //fill(255, 0, 0);
        noStroke();
        rect(random(formatWidth), random(formatHeight), random(20, 300), random(20, 300));
    }
}

// Description: Draw the gradient within the shape based on colours
function drawSolidGradient() {
    let gradient = drawingContext.createLinearGradient(
        formatWidth / 2 - 100,
        200,
        formatHeight / 2 + 200,
        300
    );

    gradient.addColorStop(0, color(310, 100, 100, 100));
    gradient.addColorStop(1, color(250, 100, 100, 100));

    drawingContext.fillStyle = gradient;
}

// Description: Draw the gradient within the line based on colours
function drawLineGradient() {
    let color1, color2, color3, color4, color5, color6, color7, color8;
    //colorful
    color1 = color(250, 50, 100, 100);
    color2 = color(200, 50, 100, 100);
    color3 = color(150, 50, 100, 100);
    color4 = color(100, 50, 100, 100);
    color5 = color(50, 50, 100, 100);
    color6 = color(25, 50, 100, 100);

    //monochrome
    color7 = color(0, 0, 80, 0);
    color8 = color(0, 0, 10, 70);

    let colors = [color1, color2, color3, color4, color5, color6, color7, color8];

    // select a random color
    let randomColor1Index = floor(random(colors.length));
    let randomColor2Index = floor(random(colors.length));
    //print(randomColor1Index, randomColor2Index);

    if (randomColor1Index == 0) {
        color1 = colors[0];
    } else if (randomColor1Index == 1) {
        color1 = colors[1];
    } else if (randomColor1Index == 2) {
        color1 = colors[2];
    } else if (randomColor1Index == 3) {
        color1 = colors[3];
    } else if (randomColor1Index == 4) {
        color1 = colors[4];
    } else if (randomColor1Index == 5) {
        color1 = colors[5];
    } else if (randomColor1Index == 6) {
        color1 = colors[6];
    } else {
        color1 = colors[7];
    }

    if (randomColor2Index == 0) {
        color1 = colors[0];
    } else if (randomColor2Index == 1) {
        color1 = colors[1];
    } else if (randomColor2Index == 2) {
        color1 = colors[2];
    } else if (randomColor2Index == 3) {
        color1 = colors[3];
    } else if (randomColor2Index == 4) {
        color1 = colors[4];
    } else if (randomColor2Index == 5) {
        color1 = colors[5];
    } else if (randomColor2Index == 6) {
        color1 = colors[6];
    } else {
        color1 = colors[7];
    }

    let gradient = drawingContext.createLinearGradient(
        formatWidth / 2,
        formatHeight / 2,
        0,
        formatWidth / 2,
        formatHeight / 2,
        360
    );

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    drawingContext.strokeStyle = gradient;
}

// Description: Draw a radial gradient
function shapeGradient() {
    let color1, color2, color3, color4, color5, color6, color7, color8;
    //colorful
    color1 = color(250, 50, 100, 100);
    color2 = color(200, 50, 100, 100);
    color3 = color(150, 50, 100, 100);
    color4 = color(100, 50, 100, 100);
    color5 = color(50, 50, 100, 100);
    color6 = color(25, 50, 100, 100);

    //monochrome
    color7 = color(0, 0, 80, 0);
    color8 = color(0, 0, 10, 70);

    let colors = [color1, color2, color3, color4, color5, color6, color7, color8];

    // select a random color
    let randomColor1Index = floor(random(colors.length));
    let randomColor2Index = floor(random(colors.length));
    //print(randomColor1Index, randomColor2Index);

    if (randomColor1Index == 0) {
        color1 = colors[0];
    } else if (randomColor1Index == 1) {
        color1 = colors[1];
    } else if (randomColor1Index == 2) {
        color1 = colors[2];
    } else if (randomColor1Index == 3) {
        color1 = colors[3];
    } else if (randomColor1Index == 4) {
        color1 = colors[4];
    } else if (randomColor1Index == 5) {
        color1 = colors[5];
    } else if (randomColor1Index == 6) {
        color1 = colors[6];
    } else {
        color1 = colors[7];
    }

    if (randomColor2Index == 0) {
        color1 = colors[0];
    } else if (randomColor2Index == 1) {
        color1 = colors[1];
    } else if (randomColor2Index == 2) {
        color1 = colors[2];
    } else if (randomColor2Index == 3) {
        color1 = colors[3];
    } else if (randomColor2Index == 4) {
        color1 = colors[4];
    } else if (randomColor2Index == 5) {
        color1 = colors[5];
    } else if (randomColor2Index == 6) {
        color1 = colors[6];
    } else {
        color1 = colors[7];
    }

    let gradient = drawingContext.createLinearGradient(
        formatWidth / 2,
        formatHeight / 2,
        0,
        formatWidth / 2,
        formatHeight / 2,
        360
    );

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    drawingContext.fillStyle = gradient;
}

// Description: Draw noise layer based on number and stroke weight
function noisey(n, s) {
    for (let i = 1; i <= n; i++) {
        strokeWeight(s);
        if (bg == 255) {
            stroke(0, 10);
        } else {
            stroke(255, 10);
        }
        let pointX = random(formatWidth);
        let pointY = random(formatHeight);
        point(pointX, pointY);
    }
    noLoop();
}

// <----- User controls -----> 
function keyPressed() {
    switch (key) {
        case 's':
            save("Hotlines" + ".jpg")
            break
    }
}

// <----- Probability controls below this section ----->

// Description: Boolean to set the BG color
function bgSet() {
    let bgProb = floor(random(2));
    if (bgProb == 1) {
        bg = 255;
        lineColor = 0;
    } else {
        bg = 0;
        lineColor = 255;
    }
}

// Description: Boolean to set the composition shapes
function shapeSet() {
    shapeProb = floor(random(2));
    if (shapeProb == 1) {
        return 1; // draw ellipse.
    } else {
        return 0; // draw rect.
    }
}

// Description: Boolean to set the random shape insert
function placeRandShape() {
    let randShapeProb = random(1);
    if (randShapeProb > 0.8) {
        print("Rare shape Ellipse");
        return 0; // draw ellipse
    } else if (randShapeProb >= 0.5 && randShapeProb < 0.8) {
        print("Rare shape Rect")
        return 1; // draw rect.
    } else if (randShapeProb < 0.5) {
        print("Rare shape False")
        return 2; // draw nothing
    }
}

// Description: Boolean to set the grid direction shapes
function gridSet() {
    if (gridProb == 0) {
        return 0; // X direction
    } else if (gridProb == 1) {
        return 1; // Y direction
    } else if (gridProb == 2) {
        return 2; // both X and Y directions
    } else {
        return 3; // no grid
    }
}

// Description: Set rect size value based on index by probability
function rectSizeIndex() {
    //rectSizes = [10, 20, 50, 100, 200, 300, 500];
    let n = random(1);
    if (n > 0.95) {
        rs = rectSizes[6];
    } else if (n >= 0.75 && n < 0.95) {
        rs = rectSizes[5];
    } else if (n >= 0.55 && n < 0.75) {
        rs = rectSizes[4];
    } else if (n >= 0.35 && n < 0.55) {
        rs = rectSizes[3];
    } else if (n >= 0.15 && n < 0.35) {
        rs = rectSizes[2];
    } else if (n >= 0.05 && n < 0.15) {
        rs = rectSizes[1];
    } else {
        rs = rectSizes[0];
    }
}

// Description: Set segment count value based on index by probability
function segmentIndex() {
    //segmentCounts = [5,10,30,50,100];
    let n = random(1);
    if (n > 0.95) {
        sc = segmentCounts[4];
    } else if (n >= 0.85 && n < 0.95) {
        sc = segmentCounts[3];
    } else if (n >= 0.6 && n < 0.75) {
        sc = segmentCounts[2];
    } else if (n >= 0.2 && n < 0.6) {
        sc = segmentCounts[1];
    } else {
        sc = segmentCounts[0];
    }
}

// Description: Set lineweight value based on index by probability
function strokeIndex() {
    //lineWeights = [0.05, 0.15, 0.50, 1, 5, 10, 20];
    let n = random(1);
    if (n > 0.95) {
        lw = lineWeights[0];
    } else if (n >= 0.85 && n < 0.95) {
        lw = lineWeights[1];
    } else if (n >= 0.65 && n < 0.85) {
        lw = lineWeights[2];
    } else if (n >= 0.45 && n < 0.65) {
        lw = lineWeights[3];
    } else if (n >= 0.35 && n < 0.45) {
        lw = lineWeights[4];
    } else if (n >= 0.15 && n < 0.35) {
        lw = lineWeights[5];
    } else {
        lw = lineWeights[6];
    }
}

// Description: Set grid segment value based on index by probability
function gridSegmentIndex() {
    //let gridSegments = [3,4,5,10,20,50];
    let n = random(1);
    if (n > 0.95) {
        gs = gridSegments[5];
    } else if (n >= 0.75 && n < 0.95) {
        gs = gridSegments[4];
    } else if (n >= 0.55 && n < 0.75) {
        gs = gridSegments[3];
    } else if (n >= 0.35 && n < 0.55) {
        gs = gridSegments[2];
    } else if (n >= 0.15 && n < 0.35) {
        gs = gridSegments[1];
    } else {
        gs = gridSegments[0];
    }
}

// Description: Set alpha value based on index by probability
function alphaValue() {
    //let alphaOptions = [100, 200, 250];
    let n = random(1);
    if (n > 0.75) {
        av = alphaOptions[2];
    } else if (n >= 0.45 && n < 0.75) {
        av = alphaOptions[1];
    } else {
        av = alphaOptions[0];
    }
}

// Description: Set alpha value based on index by probability
function thicknessDirection() {
    //let thicknessDir = [45, 90];
    let n = random(1);
    if (n > 0.50) {
        td = thicknessDir[0];
    } else {
        td = thicknessDir[1];
    } 
}

// Description: Set alpha value based on index by probability
function offsetDistance() {
    //let offsetDist = [0, 10, 25, 100];
    let n = random(1);
    if (n > 0.75) {
        od = offsetDist[0];
    } else if(n >= 0.50 && n < 0.75){
        od = offsetDist[1];
    } else if(n >= 0.25 && n < 0.50){
        od = offsetDist[2];
    } else {
        od = offsetDist[3];
    } 
    print("offset distance is " + od);
}

// Description: Set hotline thickness
function lineThickness() {
    //let lineThicknesses = [0, 10, 50, 100, 500];

    let n = random(1);
    if (n > 0.95) {
        lt = lineThicknesses[4];
    } else if(n >= 0.70 && n < 0.95){
        lt = lineThicknesses[3];
    } else if(n >= 0.40 && n < 0.70){
        lt = lineThicknesses[2];
    } else if (n >= 0.15 && n < 0.40){
        lt = lineThicknesses[1];
    } else{
        lt = lineThicknesses[0];
    } 

    print("line thickness is " + lt);
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