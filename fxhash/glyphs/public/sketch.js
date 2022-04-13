// Please review LICENSE.md for usage limitations

// to do 
// design review:
// move new if statements into a function to tidy up draw
// draw random walker on graphics with rotation 
// draw random walker extrusion with alpha decreasing with each iteration
// draw "section" line on original walker path to imply thickness 
// experiement with shearing the noise and strokes found in the openProcessing library
// Remove all glyph options except for random walker
// All other glyphs can stand alone, no need for this many options
// Random walker edits:
//  - extrude and reduce alpha 
// animate the render
// add better noise and colors - last step
// directional hatch needs to be strictly at 45 degrees and can change spacing
// masking circles need more control and / or variance
// controls for CurveVertex v Vertex
// project colors are undecided
// needs a couple colour pallets
// shear noise and vary sizes
// colour masks can be bigger 
// line streaks like the image you found > using different color blending mode
// restructure glyphs to host a fxrand hash, strokeweight and stroke (alpha is most important) then put glyphs in a for loop driven by another rand

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
let count = 100000; // <--- reduce this for quicker renderings
let x;
let y;
let xRand, yRand;
let paddingFrame = 300;
let columnNum;
let rowHeight0, rowHeight1, rowHeight2, rowHeight3, rowHeight4
let graphicsLayer;
let spacingX = 5;
let spacingY = 5;
let glphyStrokeWidth;
let spacing;
let glyphCount;

function setup() { 
    //createCanvas(innerWidth, innerHeight);
    createCanvas(2500, 2500);
    graphicsLayer = createGraphics(width*2, height*2);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    angleMode(DEGREES);
    imageMode(CENTER);

    // color background function
    setBackgroundColor(n);
    background(bg);
    x1 = fxrand() * graphicsLayer.width;
    y1 = fxrand() * graphicsLayer.height;
    x = graphicsLayer.width / 2;
    y = graphicsLayer.height / 2;
    xRand = fxrand() * graphicsLayer.width;
    yRand = fxrand() * graphicsLayer.height;
    // columnNum = 4;
    columnNum = Math.floor(2 + fxrand() * 3);
    rowHeight0 = fxrand() * height;
    rowHeight1 = fxrand() * height;
    rowHeight2 = fxrand() * height;
    rowHeight3 = fxrand() * height;
}

function draw() {
    glphyStrokeWidth = 1;

    graphicsLayer.rectMode(CENTER);
    graphicsLayer.strokeWeight(glphyStrokeWidth);
    graphicsLayer.fill(0);
    glyphs();
    graphicsLayer.fill(255);
    glyphs();
    push();
    translate(width/2, height/2);
    rotate(45);

    spacing = Math.floor(5 + fxrand() * 30); 
    glyphCount = Math.floor(3 + fxrand() * 20);
    for(let i = 0; i < glyphCount; i++){
        //tint(255, 100 - (i*10)); // <---- TINT IS SUPER SLOW
        image(graphicsLayer, spacing * i, spacing * i); 
    }
    pop();

    noFill();
    stroke(bg);
    strokeWeight(paddingFrame * 0.5);
    rect(width / 2, height / 2, width, height);

    for (let i = 0; i <= columnNum; i++) {
        let lineX = (i * width) / columnNum;
        stroke(bg);
        strokeWeight(paddingFrame * 0.25);
        line(lineX, 0, lineX, height);
    }

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
        strokeCap(SQUARE);
        stroke(bg);
        strokeWeight(paddingFrame * 0.25);
        // line 1
        line(0, rowHeight0, width / 3, rowHeight0);

        // line 2
        line(width * 0.33, rowHeight1, width * 0.66, rowHeight1);

        // line 3
        line(width * 0.66, rowHeight2, width, rowHeight2);
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

    noLoop();

    // Erased Parts
    blendMode(BLEND);

    stroke(bg);
    //directionalHatch();
    //randomWalkerLinesMask(xRand, yRand, 5 + fxrand() * 25);
    fill(360,100,100,100);
    //randomWalkerCircle(10, xRand, yRand, 5 + fxrand() * 25);
    randomWalkerRect(10, xRand, yRand, 5 + fxrand() * 25);
    // add noise
    stroke(360, 100, 100, 100);
    noisey(noiseCount, 0.05 + fxrand() * 1, noiseRand);

    //blend shapes 
    blendMode(SOFT_LIGHT);
    fill(bg);
    shapeGradient();
    noStroke();
    rect(width/2, height/2, width, height);
    //rect(fxrand() * width, fxrand() * height, 100 + fxrand() * width, 100 + fxrand() * height);
    shapeGradient();
    blendMode(OVERLAY);
    //ellipse(fxrand() * width, fxrand() * height, 300 + fxrand() * width);

}

// <----------------------------------------------- Draw Functions ----------------------------------------------------> //

// Description: Sets the color for BG
function setBackgroundColor(n) {
    // special rare bg
    let hue = 50;
    let saturation = 10;
    let brightness = 100;
    let maxAlpha = 100;
    if (n >= 0.99) {
        // Special Gold Background
        bg = color(hue, saturation, brightness, maxAlpha);
        return optionNum = 0;
    } else if (n < 0.99 && n >= 0.01) {
        // 50/50 for Black BG
        bg = color(255);
        return optionNum = 1;
    } else if (n < 0.01 && n >= 0) {
        // 50/50 for White BG
        bg = color(0, 2, 100, 100);
        return optionNum = 2;
    }
}

function glyphs() {

    randomWalkerLines(x, y, 5 + fxrand() * 20);
    return glyphOption = 0;
}

function randomWalkerLines(x0, y0, len) {
    noFill();
    graphicsLayer.beginShape();
    graphicsLayer.strokeJoin(MITER);
    console.log(optionNum);
    if (optionNum == 0) {
        // gold bg
        graphicsLayer.stroke(50, 10, 0, 80);
    } else if (optionNum == 1) {
        // black bg
        graphicsLayer.stroke(0);
    } else if (optionNum == 2) {
        // white bg
        stroke(200, 0, 0, 80);
    }
    for (i = 0; i < count; i++) {
        graphicsLayer.curveVertex(x0, y0);
        const r = floor(random(4));
        switch (r) {
            case 0:
                if (x0 > graphicsLayer.width || x0 < 0) {
                    x = graphicsLayer.width / 2;
                } else {
                    x0 = x0 + len;
                }
                break;
            case 1:
                x0 = x0 - len;
                break;
            case 2:
                if (y0 > graphicsLayer.height || y < 0) {
                    y0 = graphicsLayer.height / 2;
                } else {
                    y0 = y0 + len;
                }
                break;
            case 3:
                y0 = y0 - len;
                break;
        }
    }
    graphicsLayer.endShape();
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
    //noLoop();
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
    //noLoop();
}

function randomWalkerRect(x0, y0, len) {
    let rectPts = [];
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
        rectPts.push(x0, y0)
    }
    strokeWeight(5);
    rect(rectPts.x0, rectPts.y0, 100, 100);
    //noLoop();
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