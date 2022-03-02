// Please review LICENSE.md for usage limitations

// <----- To Do -----> 
// refine probabilities
// add a different background and line color option
// add more color pallets
// random seed is not working and this also needs to work with fxrand()

// integrate with fxhash
// fxrand() will control the seed <-- some testing required to make this work as is.
// fxrand() to be used in all random() instances 

let i;
let canvasDraw;
let x, y;
let x1, y1;
let bg;
let shapeProb, bgProb, gridProb, randShapeProb;
let gridDir;
let noiseScale = 0.02;
let gridSegments = [3, 4, 5, 10, 20, 50];
let shapeCount = [1, 2, 3, 4, 5];
let segmentCounts = [5, 10, 15, 20, 50];
let lineWeights = [0.05, 0.15, 0.5, 1, 5, 10, 20];
let rectSizes = [10, 20, 50, 100, 200, 300, 500];
let alphaOptions = [100, 200, 250];
let noiseCount;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    canvasDraw = createGraphics(width, height);
    x1 = random(width);
    y1 = random(height);
    bgProb = floor(random(2));
    shapeProb = floor(random(2));
    gridProb = floor(random(4));
    randShapeProb = random(1);
    noiseCount = random(500, 50000);
    //randomSeed(100);
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
    mLayer = createGraphics(width, height);
    mLayer.translate(0, 0); // move the mask into place. 0,0 for full sized CG.

    // <----- make any shapes you like to use as a mask below here ----->

    // for loop with random quantity generator needed.

    // set shape count based on random number
    shapeCount = ceil(random(shapeCount.length));

    // set shape style by calling shapeSet()
    let shapeType = shapeSet();

    if (shapeType == 0) {
        // Draw rectangles
        for (i = 0; i < shapeCount; i++) {
            rectSizeIndex();
            let rectSize1 = rs;
            rectSizeIndex();
            let rectSize2 = rs;
            //print(rectSize1, rectSize2);
            mLayer.rect(random(width), random(height), rectSize1, rectSize2);
        }
    } else {
        // Draw ellipses
        for (i = 0; i < shapeCount; i++) {
            mLayer.ellipse(random(width), random(height), random(20, 350));
        }
    }

    // Make the mask layer an actual mask.
    drawClone = canvasDraw.get();
    drawClone.mask(mLayer.get());

    // Instantiate the mask layer.
    image(drawClone, 0, 0);

    // <----- Draw anything you want on top of this mask layer and below this line ----->

    // Draw a grid in the background
    // Declare grid direction type.
    let gridType = gridSet();
    gridSegmentIndex();
    let gridSegs = gs;

    // Set segment count based on probabilities
    segmentIndex();
    let segCount = sc;
    strokeIndex();
    let lWeight = lw;
    alphaValue();
    let alphaVal = av;

    if (gridType == 0) {
        gridX();
        //print("GRID X");
    } else if (gridType == 1) {
        gridY();
        //print("GRID Y");
    } else if (gridType == 2) {
        gridXY();
        //print("GRID X AND Y");
    } else {
        //drawLineGradient();
        //lines(sc, lw, av);
    }

    drawLineGradient();
    lines(sc, lw, av);
    print(
        "Segment Count: " + sc,
        "Lineweight Value: " + lw,
        "Alpha Value: " + av
    );

    // Add rare coloured shape if possible
    // Call random shape placer

    // Draw gradient in rare shape
    //drawSolidGradient();
    radialGradient();

    // Draw the random shape
    rareShapeDrop();
    stroke(lineColor, 100);
    //blendMode(SOFT_LIGHT);
    noisey(noiseCount, random(0.5, 3.5));

    // No loop set by default.
    noLoop();
}

// <----- Functions -----> //
// Notes //
// You have to specify calling the correct graphics canvas from within the function.
// Then simply call the function in line with the rest of the code.

// Description: Set the line work underlay based on segment count
function lineTexture(n) {
    let numSegments = n;
    for (i = 0; i < numSegments; i++) {
        x2 = random(width);
        y2 = random(height);
        canvasDraw.line(x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
    }
}

// Description: Controls the line behavior based on count, strokeweight, and alpha
function lines(c, s, a) {
    for (i = 0; i < c; i++) {
        stroke(lineColor, a);
        strokeWeight(s);
        x2 = random(width);
        y2 = random(height);
        line(x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
    }
}

// Description: Creates a grid with X Direction offset
function gridX() {
    for (i = 1; i <= gs; i++) {
        let lineX = (i * width) / gs;
        stroke(lineColor);
        strokeWeight(0.25);
        line(lineX, 0, lineX, height);
    }
}

// Description: Creates a grid with Y Direction offset
function gridY() {
    for (i = 1; i <= gs; i++) {
        let lineY = (i * height) / gs;
        stroke(lineColor);
        strokeWeight(0.25);
        line(0, lineY, width, lineY);
    }
}

// Description: Creates a grid with Y Direction offset
function gridXY() {
    for (i = 1; i <= gs; i++) {
        for (i = 1; i <= gs; i++) {
            let lineX = (i * width) / gs;
            stroke(lineColor);
            strokeWeight(0.25);
            line(lineX, 0, lineX, height);

            let lineY = (i * height) / gs;
            stroke(lineColor);
            strokeWeight(0.25);
            line(0, lineY, width, lineY);
        }
    }
}

// Description: Place random rare shape
function rareShapeDrop() {
    let ps = placeRandShape();
    if (ps == 0) {
        //fill(255, 0, 0);
        noStroke();
        ellipse(random(width), random(height), random(20, 200));
    } else if (ps == 1) {
        //fill(255, 0, 0);
        noStroke();
        rect(random(width), random(height), random(20, 300), random(20, 300));
    }
}

// Description: Draw the gradient within the shape based on colours
function drawSolidGradient() {
    let gradient = drawingContext.createLinearGradient(
        width / 2 - 100,
        200,
        width / 2 + 200,
        300
    );

    gradient.addColorStop(0, color(310, 100, 100, 100));
    gradient.addColorStop(1, color(250, 100, 100, 100));

    drawingContext.fillStyle = gradient;
}

// Description: Draw the gradient within the line based on colours
function drawLineGradient() {
    let color1, color2, color3, color4;
    //colorful
    color1 = color(250, 50, 100, 100);
    color2 = color(200, 50, 100, 100);

    //black white
    color3 = color(0, 0, 80, 0);
    color4 = color(0, 0, 10, 70);

    let colors = [color1, color2, color3, color4];

    let gradient = drawingContext.createLinearGradient(
        width / 2 - 100,
        200,
        width / 2 + 200,
        300
    );

    // select a random color
    let randomColor1Index = floor(random(colors.length));
    let randomColor2Index = floor(random(colors.length));

    if (randomColor1Index == 0) {
        color1 = colors[0];
    } else if (randomColor1Index == 1) {
        color1 = colors[1];
    } else if (randomColor1Index == 2) {
        color1 = colors[2];
    } else {
        color1 = colors[3];
    }

    if (randomColor2Index == 0) {
        color2 = colors[0];
    } else if (randomColor2Index == 1) {
        color2 = colors[1];
    } else if (randomColor2Index == 2) {
        color2 = colors[2];
    } else {
        color2 = colors[3];
    }

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    drawingContext.strokeStyle = gradient;
}

// Description: Draw a radial gradient
function radialGradient() {
    let color1, color2, color3, color4;
    //colorful
    color1 = color(250, 50, 100, 100);
    color2 = color(200, 50, 100, 100);

    //black white
    color3 = color(0, 0, 80, 0);
    color4 = color(0, 0, 10, 70);

    let colors = [color1, color2, color3, color4];

    let gradient = drawingContext.createLinearGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        360
    );

    // select a random color
    let randomColor1Index = floor(random(colors.length));
    let randomColor2Index = floor(random(colors.length));

    if (randomColor1Index == 0) {
        color1 = colors[0];
    } else if (randomColor1Index == 1) {
        color1 = colors[1];
    } else if (randomColor1Index == 2) {
        color1 = colors[2];
    } else {
        color1 = colors[3];
    }

    if (randomColor2Index == 0) {
        color2 = colors[0];
    } else if (randomColor2Index == 1) {
        color2 = colors[1];
    } else if (randomColor2Index == 2) {
        color2 = colors[2];
    } else {
        color2 = colors[3];
    }

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
        let pointX = random(width);
        let pointY = random(height);
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
    if (shapeProb == 1) {
        return 1; // draw ellipse.
    } else {
        return 0; // draw rect.
    }
}

// Description: Boolean to set the random shape insert
function placeRandShape() {
    if (randShapeProb > 0.8) {
        return 0; // draw ellipse
    } else if (randShapeProb >= 0.5 && randShapeProb < 0.8) {
        return 1; // draw rect.
    } else if (randShapeProb < 0.5) {
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