// Please review LICENSE.md for usage limitations

// to do
// draw "section" line on original walker path to imply thickness 
// experiement with shearing the noise and strokes found in the openProcessing library
// Remove all glyph options except for random walker
// All other glyphs can stand alone, no need for this many options
// animate the render
// add better noise and colors - last step
// directional hatch needs to be strictly at 45 degrees and can change spacing
// masking circles need more control and / or variance
// project colors are undecided
// shear noise and vary sizes
// colour masks can be bigger 
// line streaks like the image you found > using different color blending mode

let n = fxrand();
let lineCount = 20; //2 + Math.floor(fxrand()*20);
let amplitude = 20 + Math.floor(fxrand() * 75);
let rowCount = 3 + Math.floor(fxrand() * 10);
let ySpacing = 50;
let resolution = 50; // + Math.floor(fxrand()*75)
let period = 1 + Math.floor(fxrand() * 10);
let xGridSpacing = 2 + Math.floor(fxrand() * 20); // 1 to 10
let yGridSpacing = 2 + Math.floor(fxrand() * 20);
let padding = 200;
let x1, y1;
let color1, color2, color3, color4, color5, color6, color7, color8, color9;
let noiseRand = fxrand();
let noiseCount = 50000 + fxrand() * 300000;
let glyphOption;
let randomWalkCount;
let randomWalkSpacing;
let x;
let y;
let xRand, yRand;
let paddingFrame;
let columnNum;
let rowHeight0, rowHeight1, rowHeight2, rowHeight3, rowHeight4
let graphicsLayer;
let spacingX = 5;
let spacingY = 5;
let spacing;
let glyphArrayCount; 
let bgColorList = ["Gold", "White", "Black", "Brown", "Yellow", "Red", "Blue"];
let glyphKey; 
let glyphStrokeWeight;

function setup() { 
    //createCanvas(innerWidth, innerHeight);
    createCanvas(2500, 2500);
    graphicsLayer = createGraphics(width*2, height*2);
    graphicsLayer.colorMode(HSB, 360, 100, 100, 100);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    angleMode(DEGREES);
    imageMode(CENTER);

    // color background function
    setBackgroundColor(n);
    background(bg);
    print("Background Color = " + optionNum);

    // positioning variables
    x1 = fxrand() * graphicsLayer.width;
    y1 = fxrand() * graphicsLayer.height;
    x = graphicsLayer.width / 2;
    y = graphicsLayer.height / 2;
    xRand = fxrand() * graphicsLayer.width;
    yRand = fxrand() * graphicsLayer.height;
    columnNum = Math.floor(1 + fxrand() * 4);
    rowHeight0 = fxrand() * height;
    rowHeight1 = fxrand() * height;
    rowHeight2 = fxrand() * height;
    rowHeight3 = fxrand() * height;
    glyphKey = Math.floor(fxrand() * 3); // controls the glyph call
    paddingFrame = 100 + fxrand() * 400;
}

function draw() {

    graphicsLayer.rectMode(CENTER);

    // let fillProbability = fxrand();
    // if(fillProbability >= 0.5){
    //     graphicsLayer.noFill();
    // } else if(fillProbability < 0.5){
    //     graphicsLayer.fill(0);
    // }
    // print(fillProbability);

    // add a grid bg

    graphicsLayer.noFill();

    let glyphCount = Math.floor(2 + fxrand() * 6);
    for(let i = 0; i < glyphCount; i++){
        randomWalkCount = 100 + fxrand() * 10000;
        randomWalkSpacing = Math.floor(2.5 + fxrand() * 100);
        glyphStrokeWeight = 0.05 + fxrand() * 10;
        randomWalkerLinesColor(100 - i * 5); 
        glyphs(1000 + fxrand() * graphicsLayer.width/2, 1000 + fxrand() * graphicsLayer.height/2, randomWalkSpacing, randomWalkCount, glyphStrokeWeight);
        print(randomWalkSpacing);
    }
    print(glyphCount);

    // should each glyph have its own graphics layer?
    // it still needs a single glyph path on top

    print(strokeOption);
    push();
    translate(width/2, height/2);
    rotate(45);

    spacing = Math.floor(1 + fxrand() * 10);
    glyphArrayCount = 5 + fxrand() * 30;
    for(let i = 0; i < glyphArrayCount; i++){
        let tintReductionStep = 100/glyphArrayCount;
        tint(255, 100 - tintReductionStep * i);
        image(graphicsLayer, spacing * i, spacing * i); 
    }
    pop();

    //noFill();
    //stroke(bg);
    //strokeWeight(100 + fxrand() * paddingFrame);
    //rect(width / 2, height / 2, width, height);


    //createColumns();
    //createHorizontalDivisions();

    noLoop();

    // Erased Parts
    //blendMode(BLEND);

    //stroke(bg);
    //directionalHatch();
    //randomWalkerLinesMask(xRand, yRand, 5 + fxrand() * 25);
    //fill(360,100,100,100);
    //randomWalkerCircle(10, xRand, yRand, 5 + fxrand() * 25);
    //randomWalkerRect(10, xRand, yRand, 5 + fxrand() * 25);
    // add noise
    //stroke(360, 100, 100, 100);
    //noisey(noiseCount, 0.05 + fxrand() * 1, noiseRand);

    //blend shapes 
    blendMode(BLEND);
    //blendMode(SOFT_LIGHT);
    //fill(bg);
    shapeGradient();
    noStroke();
    //rect(width/2, height/2, width, height);
    rect(fxrand() * width, fxrand() * height, 100 + fxrand() * width, 100 + fxrand() * height);
    //shapeGradient();
    //blendMode(OVERLAY);
    //ellipse(fxrand() * width, fxrand() * height, 300 + fxrand() * width);

}

// <----------------------------------------------- Draw Functions ----------------------------------------------------> //

// Description: Sets the color for BG
// TODO: Fix colors so they aren't so easter looking
function setBackgroundColor(n) {
    // special rare bg
    if (n >= 0.99) {
        // color_1
        bg = color(53,53,99,100);
        return optionNum = 0;
    } else if (n < 0.99 && n >= 0) {
        // color_2
        bg = color(191,62,100,100);
        return optionNum = 1;
    } else if(n < 0.825 && n >= 0.66){
        // Black Color
        bg = color(0);
        return optionNum = 2;
    } else if(n < 0.66 && n >= 0.495){
        // Brown Color
        bg = color(23, 3, 95, 100);
        return optionNum = 3;
    } else if(n < 0.495 && n >= 0.33){
        // Yellow Color
        bg = color(49, 5, 100, 100);
        return optionNum = 4;
    } else if(n < 0.33 && n >= 0.165){
        // Red Color
        bg = color(360, 5, 100, 100);
        return optionNum = 5;
    } else if(n < 0.165 && n >= 0){
        // Blue Color
        bg = color(180, 5, 100, 100);
        return optionNum = 6;
    }
}

// Description: main graphical function calling random walker algorithm 
function glyphs(xPos, yPos, randomWalkSpacing, randomWalkCount, sw) {

    graphicsLayer.strokeWeight(sw);
    //graphicsLayer.noFill();

    let vertexType = fxrand();
    if(vertexType >= 0.5){
        randomWalkerLines(xPos, yPos, randomWalkSpacing, randomWalkCount);
    } else {
        randomWalkerCurveLines(xPos, yPos, randomWalkSpacing, randomWalkCount);
    }
    // debug 
    // print("calling from glyphs: X = " + xPos);
    // print("calling from glyphs: Y = " + yPos);
    // graphicsLayer.fill(360,100,100,100);
    // graphicsLayer.ellipse(xPos, yPos, 100);
}

function randomWalkerLines(xPos, yPos, randomWalkSpacing, randomWalkCount) {

    graphicsLayer.beginShape();
    graphicsLayer.strokeJoin(MITER);

    for (i = 0; i < randomWalkCount; i++) {
        let randKey = Math.floor(fxrand()*4);
        graphicsLayer.vertex(xPos, yPos);
        const r = randKey;
        switch (r) {
            case 0:
                if (xPos >= graphicsLayer.width || xPos <= 0) {
                    xPos = graphicsLayer.width / 2;
                } else {
                    xPos = xPos + randomWalkSpacing;
                }
                break;
            case 1:
                xPos = xPos - randomWalkSpacing;
                break;
            case 2:
                if (yPos >= graphicsLayer.height || yPos <= 0) {
                    yPos = graphicsLayer.height / 2;
                } else {
                    yPos = yPos + randomWalkSpacing;
                }
                break;
            case 3:
                yPos = yPos - randomWalkSpacing;
                break;
        }
    }
    graphicsLayer.endShape();
}

function randomWalkerCurveLines(xPos, yPos, randomWalkSpacing, randomWalkCount) {

    graphicsLayer.beginShape();
    graphicsLayer.strokeJoin(MITER);

    for (i = 0; i < randomWalkCount; i++) {
        let randKey = Math.floor(fxrand()*4);
        graphicsLayer.curveVertex(xPos, yPos);
        const r = randKey;
        switch (r) {
            case 0:
                if (xPos >= graphicsLayer.width || xPos <= 0) {
                    xPos = graphicsLayer.width / 2;
                } else {
                    xPos = xPos + randomWalkSpacing;
                }
                break;
            case 1:
                xPos = xPos - randomWalkSpacing;
                break;
            case 2:
                if (yPos >= graphicsLayer.height || yPos <= 0) {
                    yPos = graphicsLayer.height / 2;
                } else {
                    yPos = yPos + randomWalkSpacing;
                }
                break;
            case 3:
                yPos = yPos - randomWalkSpacing;
                break;
        }
    }
    graphicsLayer.endShape();
}

function randomWalkerLinesColor(alpha) {
    // structure this so there's multiple color combinations for each case that work with the bg color. See case 0 for example
    // stroke options are controlled here for graphicsLayer
    // let bgColorList = ["Gold", "White", "Black", "Brown", "Yellow", "Red", "Blue"];
    // strokeOptions are for fxFeature and debugging help
    let randomNum = fxrand();
    switch (optionNum) {
        case 0:
            if(randomNum >= 0.75){
                graphicsLayer.stroke(191,62,100,alpha);
                strokeOption = "Gold BG + Blue Stroke"
            } else if(randomNum >= 0.50 && randomNum < 0.75){
                graphicsLayer.stroke(23,62,98,alpha);
                strokeOption = "Gold BG + Orange Stroke"
            } else if(randomNum >= 0.25 && randomNum < 0.50){
                graphicsLayer.stroke(252,2,96,alpha);
                strokeOption = "Gold BG + WhiteGrey Stroke"
            } else if(randomNum < 0.25){
                graphicsLayer.stroke(53,53,95,alpha);
                strokeOption = "Gold BG + Red Stroke"
            }
            break;
        case 1: 
            if(randomNum >= 0.75){
                graphicsLayer.stroke(53,53,99,alpha);
                strokeOption = "Blue BG + Yellow Stroke"
            } else if(randomNum >= 0.50 && randomNum < 0.75){
                graphicsLayer.stroke(23,62,98,alpha);
                strokeOption = "Blue BG + Orange Stroke"
            } else if(randomNum >= 0.25 && randomNum < 0.50){
                graphicsLayer.stroke(252,2,96,alpha);
                strokeOption = "Blue BG + WhiteGrey Stroke"
            } else if(randomNum < 0.25){
                graphicsLayer.stroke(274,33,77,alpha);
                strokeOption = "Blue BG + Purple Stroke"
            }
            break;
        case 2: 
            graphicsLayer.stroke(255);
            strokeOption = "Black BG + White Stroke"
            print("IS THIS WORKING?!?!?!?!?!");
            break;
        case 3:
            graphicsLayer.stroke(360, 0, 0, alpha);
            strokeOption = "Brown BG + Black Stroke"
            break;
        case 4: 
            graphicsLayer.stroke(360, 0, 0, alpha);
            strokeOption = "Yellow BG + Black Stroke"
            break;
        case 5: 
            graphicsLayer.stroke(360, 20, 50, alpha);
            strokeOption = "Red BG + Black Stroke"
            break;
        case 6:
            graphicsLayer.stroke(200, 20, 50, alpha);
            strokeOption = "Blue BG + Dark blue stroke"
            // add red option
            break;
    }
}

function randomWalkerLinesMask(x0, y0, len) {
    noFill();
    beginShape();
    for (i = 0; i < count; i++) {
        vertex(x0, y0);
        const r = floor(random(4));
        switch (r) {
            case 0:
                x0 = x0 + len;
                break;
            case 1:
                x0 = x0 - len;
                break;
            case 2:
                y0 = y0 + len;
                break;
            case 3:
                y0 = y0 - len;
                break;
        }
    }
    endShape();
}

function randomWalkerCircle(n, x0, y0, len) {
    noFill();
    beginShape();
    strokeWeight(n);
    for (i = 0; i < count; i++) {
        point(x0, y0);
        const r = floor(random(4));
        switch (r) {
            case 0:
                x0 = x0 + len;
                break;
            case 1:
                x0 = x0 - len;
                break;
            case 2:
                y0 = y0 + len;
                break;
            case 3:
                y0 = y0 - len;
                break;
        }
    }
    endShape();
}

function randomWalkerRect(x0, y0, len) {
    let rectPts = [];
    for (i = 0; i < count; i++) {
        vertex(x0, y0);
        const r = randKey;
        switch (r) {
            case 0:
                x0 = x0 + len;
                break;
            case 1:
                x0 = x0 - len;
                break;
            case 2:
                y0 = y0 + len;
                break;
            case 3:
                y0 = y0 - len;
                break;
        }
        rectPts.push(x0, y0)
    }
    strokeWeight(5);
    rect(rectPts.x0, rectPts.y0, 100, 100);

}

// Description: Creates a grid with Y Direction offset
function gridY() {
    let sw = 5 + fxrand() * 25;
    for (i = 0; i <= yGridSpacing; i++) {
        let lineY = (i * height) / yGridSpacing;
        strokeCap(SQUARE);
        stroke(bg);
        strokeWeight(sw);
        line(0, lineY, width, lineY);
    }
}

function gridX() {
    let sw = 5 + fxrand() * 25;
    for (let i = 0; i <= xGridSpacing; i++) {
        let lineX = (i * width) / xGridSpacing;
        strokeCap(SQUARE);
        strokeWeight(sw);
        stroke(bg);
        line(lineX, 0, lineX, height);
    }
}

// Description: fxrand driven placement of shapes origins
function randomPlacement() {
    rX = fxrand() * width;
    rY = fxrand() * height;
}

function randomSizing() {
    s = 20 + fxrand() * 350;
}

// Description: Sets probability of directional hatch
function directionalHatch() {
    let n = fxrand();
    let padding = 5;
    let spacingMax = 500;
    let spacingMin = 100;
    let strokeWeightMin = 0.5;
    let strokeWeightMax = 10;
    if (n <= 0.90) {
        for (let i = 0; i < height; i++) {
            line(0, 0, width + padding, i);
            i += spacingMin + fxrand() * spacingMax;
            strokeWeight(strokeWeightMin + fxrand() * strokeWeightMax);
        }
        for (let i = 0; i < height; i++) {
            line(width, 0, -padding, i);
            i += spacingMin + fxrand() * spacingMax;
            strokeWeight(strokeWeightMin + fxrand() * strokeWeightMax);
        }
        for (let i = 0; i < height; i++) {
            line(0, height, width + padding, i);
            i += spacingMin + fxrand() * spacingMax;
            strokeWeight(strokeWeightMin + fxrand() * strokeWeightMax);
        }
        for (let i = 0; i < height; i++) {
            line(width, height, padding, i);
            i += spacingMin + fxrand() * spacingMax;
            strokeWeight(strokeWeightMin + fxrand() * strokeWeightMax);
        }
    } else if (n >= 0.675 && n < 0.90) {
        for (let i = 0; i < height; i++) {
            line(0, 0, width + padding, i);
            i += spacingMin + fxrand() * spacingMax;
            strokeWeight(strokeWeightMin + fxrand() * strokeWeightMax);
        }
    } else if (n >= 0.45 && n < 0.675) {
        for (let i = 0; i < height; i++) {
            line(width, 0, -padding, i);
            i += spacingMin + fxrand() * spacingMax;
            strokeWeight(strokeWeightMin + fxrand() * strokeWeightMax);
        }
    } else if (n >= 22.5 && n < 0.45) {
        for (let i = 0; i < height; i++) {
            line(0, height, width + padding, i);
            i += spacingMin + fxrand() * spacingMax;
            strokeWeight(strokeWeightMin + fxrand() * strokeWeightMax);
        }
    } else {
        for (let i = 0; i < height; i++) {
            line(width, height, padding, i);
            i += spacingMin + fxrand() * spacingMax;
            strokeWeight(strokeWeightMin + fxrand() * strokeWeightMax);
        }
    }
}

// Description: Draw noise layer based on number and stroke weight
function noisey(count, strokeW, noiseRand) {
    for (let i = 1; i <= count; i++) {
        strokeWeight(strokeW);
        if (noiseRand >= 0.75) {
            stroke(250, 90, 100, 20);
        } else if (noiseRand >= 0.50 && noiseRand < 0.75) {
            stroke(250, 50, 100, 20);
        } else if (noiseRand >= 0.25 && noiseRand < 0.50) {
            stroke(0, 0, 100, 20);
        } else {
            stroke(360, 50, 100, 20);
        }
        let pointX = fxrand() * width;
        let pointY = fxrand() * height;
        point(pointX, pointY);
    }
    noLoop();
}

// Description: Draw a linear gradient
function shapeGradient() {

    //colorful
    color1 = color(250, 50, 100, 100);
    color2 = color(200, 50, 100, 100);
    color3 = color(150, 50, 100, 100);
    color4 = color(360, 50, 100, 100);
    color5 = color(50, 50, 100, 100);
    color6 = color(25, 60, 100, 100);
    //monochrome
    color7 = color(0, 0, 80, 10);
    color8 = color(0, 0, 100, 70);
    color9 = color(0, 0, 100, 100);

    let colors = [color1, color2, color3, color4, color5, color6, color7, color8, color9];

    // select a random color
    let randomColor1Index = floor(fxrand() * colors.length);
    let randomColor2Index = floor(fxrand() * colors.length);

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
    } else if (randomColor1Index == 7) {
        color1 = colors[7];
    } else if (randomColor1Index == 8) {
        color1 = colors[8];
    }

    if (randomColor2Index == 0) {
        color2 = colors[0];
    } else if (randomColor2Index == 1) {
        color2 = colors[1];
    } else if (randomColor2Index == 2) {
        color2 = colors[2];
    } else if (randomColor2Index == 3) {
        color2 = colors[3];
    } else if (randomColor2Index == 4) {
        color2 = colors[4];
    } else if (randomColor2Index == 5) {
        color2 = colors[5];
    } else if (randomColor2Index == 6) {
        color2 = colors[6];
    } else if (randomColor2Index == 7) {
        color2 = colors[7];
    } else if (randomColor2Index == 8) {
        color2 = colors[8];
    }

    let gradient = drawingContext.createLinearGradient(
        0,
        0,
        width,
        height
    );

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    drawingContext.fillStyle = gradient;
}

function createColumns(){
    // create columns
    for (let i = 0; i <= columnNum; i++) {
        let lineX = (i * width) / columnNum;
        stroke(bg);
        strokeWeight(paddingFrame * 0.25);
        line(lineX, 0, lineX, height);
    }
}

function createHorizontalDivisions(){

    // create horizontal divisions 
    if (columnNum == 2) {
        strokeCap(SQUARE);
        stroke(bg);
        strokeWeight(paddingFrame * 0.25);
        // line 1
        line(0, rowHeight0, width / 2, rowHeight0);

        // line 2
        line(width / 2, rowHeight1, width, rowHeight1);
    }

    if (columnNum == 3) {
        let columnWidth = width/3; 
        strokeCap(SQUARE);
        stroke(bg);
        strokeWeight(paddingFrame * 0.25);
        // line 1
        line(0, rowHeight0, columnWidth, rowHeight0);

        // line 2
        line(columnWidth, rowHeight1, columnWidth * 2, rowHeight1);

        // line 3
        line(columnWidth * 2, rowHeight2, width, rowHeight2);
    }

    if (columnNum == 4) {

        strokeCap(SQUARE);
        stroke(bg);
        strokeWeight(paddingFrame * 0.25);
        // line 1
        line(0, rowHeight0, width / 4, rowHeight0);

        // line 2
        line(width * 0.25, rowHeight1, width * 0.5, rowHeight1);

        // line 3
        line(width * 0.5, rowHeight2, width * 0.75, rowHeight2);

        // line 3
        line(width * 0.75, rowHeight3, width, rowHeight3);
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
            save("Glyphs" + ".jpg")
            break
    }
}

// add gradient over the whole thing

// blendMode(OVERLAY);
// let randX = fxrand() * width;
// let randY = fxrand() * height;
// let randW1 = 50 + fxrand() * 500;
// let randW2 = 50 + fxrand() * 500;
// noStroke();
// fill(200,35,100,100);
// rect(randX, randY, randW1, randW2);

// let randX1 = fxrand() * width;
// let randY1 = fxrand() * height;
// let randR = 500 + fxrand() * 2000;
// noStroke();
// fill(200,75,100,100);
// ellipse(randX1, randY1, randR);

// blendMode(NORMAL);
// noFill();
// stroke(360, 0, 50, 10);
// strokeWeight(5);
// rect(width/2, height/2, width, height);




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