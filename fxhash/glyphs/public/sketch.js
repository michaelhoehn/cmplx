// Please review LICENSE.md for usage limitations

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
let textureRand = fxrand();
let tintProbability = fxrand();
let originalPlacement = fxrand();
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
let textureStrokeWeight;
let optionNum;
let bgColorFeature; 
const glyphCount = Math.floor(5 + fxrand() * 10);

function setup() { 
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
    //print("Background Color = " + optionNum);

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
    textureStrokeWeight = 0.05 + fxrand() * 10;
}

function draw() {
    getBgColorOption();
    getFadedFeature();

    graphicsLayer.rectMode(CENTER);
    graphicsLayer.noFill();

    for(let i = 0; i < glyphCount; i++){
        randomWalkCount = 100 + fxrand() * 500;
        randomWalkSpacing = Math.floor(10 + fxrand() * 100);
        glyphStrokeWeight = 0.05 + fxrand() * 10;
        randomWalkerLinesColor(100 - i * 5); 
        glyphs(1000 + fxrand() * graphicsLayer.width/2, 1000 + fxrand() * graphicsLayer.height/2, randomWalkSpacing, randomWalkCount, glyphStrokeWeight);
        //print(randomWalkSpacing);
    }

    push();
    translate(width/2, height/2);
    rotate(45);
    //spacing = 10;
    //glyphArrayCount = 100;
    spacing = Math.floor(glyphStrokeWeight + fxrand() * 10);
    glyphArrayCount = 5 + fxrand() * 100;

    print("this is the tent = " + tintProbability);
    for(let i = 0; i < glyphArrayCount; i++){
        let tintReductionStep = 100/glyphArrayCount;
        if(tintProbability <= 0.5){
            tint(255, 100 - tintReductionStep * i);
        }
        image(graphicsLayer, spacing * i, spacing * i); 
    }

    let originalSpacing = -50 + fxrand();

    if(originalPlacement >= 0.5){
        tint(255,100);
        image(graphicsLayer, originalSpacing, originalSpacing);
    }

    pop();
    noLoop();

    stroke(360, 100, 100, 100);
    noisey(noiseCount, 0.75, noiseRand);

    if(textureRand >= 0.5){
        blendMode(OVERLAY);
        verticalLinesTexture(textureStrokeWeight);
    }
}

// <----------------------------------------------- Draw Functions ----------------------------------------------------> //

// Description: Sets the color for BG
function setBackgroundColor(n) {
    // special rare bg
    if (n >= 0.9091) { 
        // color_1
        bg = color(53,53,99,100);
        return optionNum = 0;
    } else if (n < 0.9091 && n >= 0.8182) { 
        // color_2
        bg = color(191,62,100,100);
        return optionNum = 1;
    } else if(n < 0.8182 && n >= 0.7273){ 
        // color_3
        bg = color(23,62,98,100);
        return optionNum = 2;
    } else if(n < 0.7273 && n >= 0.6364){
        // color_4
        bg = color(252,2,96,100);
        return optionNum = 3;
    } else if(n < 0.6364 && n >= 0.5455){
        // color_5
        bg = color(274,33,77,100);    
        return optionNum = 4;
    } else if(n < 0.5455 && n >= 0.4546){
        // color_6
        bg = color(353,67,89,100);
        return optionNum = 5;
    } else if(n < 0.4546 && n >= 0.3637){
        // color_7
        bg = color(238,69,82,100);
        return optionNum = 6;
    } else if(n < 0.3637 && n >= 0.2728){
        // color_8
        bg = color(346,17,96,100);
        return optionNum = 7;
    } else if(n < 0.2728 && n >= 0.1819){
        // color_9
        bg = color(0,0,100,100);
        return optionNum = 8;
    } else if(n < 0.1819 && n >= 0.091){
        // color_10
        bg = color(0,0,0,100);
        return optionNum = 9;
    } else if(n < 0.091){
        // color_11
        bg = color(252,2,96,100);
        return optionNum = 10;
    }
}

function getBgColorOption(n){
    // special rare bg
    if (n >= 0.9091) { 
        return "color_1";
    } else if (n < 0.9091 && n >= 0.8182) { 
        return "color_2";
    } else if(n < 0.8182 && n >= 0.7273){ 
        return "color_3";
    } else if(n < 0.7273 && n >= 0.6364){
        return "color_4";
    } else if(n < 0.6364 && n >= 0.5455){   
        return "color_5";
    } else if(n < 0.5455 && n >= 0.4546){
        return "color_6";
    } else if(n < 0.4546 && n >= 0.3637){
        return "color_7";
    } else if(n < 0.3637 && n >= 0.2728){
        return "color_8";
    } else if(n < 0.2728 && n >= 0.1819){
        return "color_9";
    } else if(n < 0.1819 && n >= 0.091){
        return "color_10";
    } else if(n < 0.091){
        return "color_11";
    }
}

function getFadedFeature(n){
    // special rare bg
    if (n <= 0.5) { 
        return "True";
    } else { 
        return "False";}
}

// Description: main graphical function calling random walker algorithm 
function glyphs(xPos, yPos, randomWalkSpacing, randomWalkCount, sw) {

    graphicsLayer.strokeWeight(sw);

    let vertexType = fxrand();
    if(vertexType >= 0.5){
        randomWalkerLines(xPos, yPos, randomWalkSpacing, randomWalkCount);
    } else {
        randomWalkerCurveLines(xPos, yPos, randomWalkSpacing, randomWalkCount);
    }
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
            if(randomNum >= 0.75){
                graphicsLayer.stroke(53,53,99,alpha);
                strokeOption = "Orange BG + Yellow Stroke"
            } else if(randomNum >= 0.50 && randomNum < 0.75){
                graphicsLayer.stroke(191,62,100,alpha);
                strokeOption = "Orange BG + Blue Stroke"
            } else if(randomNum >= 0.25 && randomNum < 0.50){
                graphicsLayer.stroke(252,2,96,alpha);
                strokeOption = "Orange BG + WhiteGrey Stroke"
            } else if(randomNum < 0.25){
                graphicsLayer.stroke(274,33,77,alpha);
                strokeOption = "Orange BG + Purple Stroke"
            }
            break;
        case 3:
            if(randomNum >= 0.83){
                graphicsLayer.stroke(23,62,98,alpha);
                strokeOption = "Orange BG + Orange Stroke"
            } else if(randomNum >= 0.66 && randomNum < 0.83){
                graphicsLayer.stroke(191,62,100,alpha);
                strokeOption = "Orange BG + Blue Stroke"
            } else if(randomNum >= 0.50 && randomNum < 0.66){
                graphicsLayer.stroke(274,33,77,alpha);
                strokeOption = "Blue BG + Purple Stroke"
            } else if(randomNum >= 0.33 && randomNum < 0.50){
                graphicsLayer.stroke(238,69,82,alpha);
                strokeOption = "Orange BG + Dark Blue Stroke"
            } else if(randomNum >= 0.17 && randomNum < 0.33){
                graphicsLayer.stroke(353,67,98,alpha);
                strokeOption = "Orange BG + Red Stroke"
            } else if(randomNum < 0.17){
                graphicsLayer.stroke(173,64,87,alpha);
                strokeOption = "Orange BG + Mint Green Stroke"
            }
            break;
        case 4:
            if(randomNum >= 0.75){
                graphicsLayer.stroke(191,62,100,alpha);
                strokeOption = "Purple BG + Blue Stroke"
            } else if(randomNum >= 0.50 && randomNum < 0.75){
                graphicsLayer.stroke(23,62,98,alpha);
                strokeOption = "Purple BG + Orange Stroke"
            } else if(randomNum >= 0.25 && randomNum < 0.50){
                graphicsLayer.stroke(252,2,96,alpha);
                strokeOption = "Purple BG + WhiteGrey Stroke"
            } else if(randomNum < 0.25){
                graphicsLayer.stroke(274,33,10,alpha);
                strokeOption = "Purple BG + Dark Purple Stroke"
            }
            break;
        case 5:
            if(randomNum >= 0.75){
                graphicsLayer.stroke(238,69,82,alpha);
                strokeOption = "Red BG + Dark Blue Stroke"
            } else if(randomNum >= 0.50 && randomNum < 0.75){
                graphicsLayer.stroke(173,64,87,alpha);
                strokeOption = "Red BG + Mint Green Stroke"
            } else if(randomNum >= 0.25 && randomNum < 0.50){
                graphicsLayer.stroke(252,2,96,alpha);
                strokeOption = "Red BG + WhiteGrey Stroke"
            } else if(randomNum < 0.25){
                graphicsLayer.stroke(353,67,75,alpha);
                strokeOption = "Red BG + Dark Red Stroke"
            }
            break;
        case 6:
            if(randomNum >= 0.75){
                graphicsLayer.stroke(346,17,96,alpha);
                strokeOption = "Blue BG + Pink Stroke"
            } else if(randomNum >= 0.50 && randomNum < 0.75){
                graphicsLayer.stroke(173,64,87,alpha);
                strokeOption = "Blue BG + Mint Green Stroke"
            } else if(randomNum >= 0.25 && randomNum < 0.50){
                graphicsLayer.stroke(252,2,96,alpha);
                strokeOption = "Blue BG + WhiteGrey Stroke"
            } else if(randomNum < 0.25){
                graphicsLayer.stroke(353,67,98,alpha);
                strokeOption = "Blue BG + Red Stroke"
            }
            break;
        case 7:
            if(randomNum >= 0.75){
                graphicsLayer.stroke(238,69,82,alpha);
                strokeOption = "Pink BG + Dark Blue Stroke"
            } else if(randomNum >= 0.50 && randomNum < 0.75){
                graphicsLayer.stroke(173,64,87,alpha);
                strokeOption = "Pink BG + Mint Green Stroke"
            } else if(randomNum >= 0.25 && randomNum < 0.50){
                graphicsLayer.stroke(252,2,96,alpha);
                strokeOption = "Pink BG + WhiteGrey Stroke"
            } else if(randomNum < 0.25){
                graphicsLayer.stroke(353,67,98,alpha);
                strokeOption = "Pink BG + Red Stroke"
            }
            break;
        case 8:
            if(randomNum >= 0.67){
                graphicsLayer.stroke(0,0,0,alpha);
                strokeOption = "White BG + Red Stroke"
            } else if(randomNum >= 0.34 && randomNum < 0.67){
                graphicsLayer.stroke(210,3,46,alpha);
                strokeOption = "White BG + Red Stroke"
            } else if(randomNum < 0.34){
                graphicsLayer.stroke(210,1,85,alpha);
                strokeOption = "White BG + Red Stroke"
            } 
            break;
        case 9:
            if(randomNum >= 0.67){
                graphicsLayer.stroke(0,0,100,100);
                strokeOption = "Black BG + Black Stroke"
            } else if(randomNum >= 0.34 && randomNum < 0.67){
                graphicsLayer.stroke(0,0,80,100);
                strokeOption = "Black BG + Gray Stroke"
            } else if(randomNum < 0.34){
                graphicsLayer.stroke(0,0,60,100);
                strokeOption = "Black BG + Light Gray Stroke"
            } 
            break;
        case 10:
            if(randomNum >= 0.9167){
                graphicsLayer.stroke(0,0,0,alpha);
                strokeOption = "White BG + Blue Stroke"
            } else if(randomNum >= 0.8334 && randomNum < 0.9167){
                graphicsLayer.stroke(0,0,80,alpha);
                strokeOption = "White BG + Orange Stroke"
            } else if(randomNum >= 0.7501 && randomNum < 0.8334){
                graphicsLayer.stroke(0,0,60,alpha);
                strokeOption = "White BG + WhiteGrey Stroke"
            } else if(randomNum >= 0.6668 && randomNum < 0.7501){
                graphicsLayer.stroke(53,53,99,alpha);
                strokeOption = "GoWhiteld BG + Red Stroke"
            } else if(randomNum >= 0.5835 && randomNum < 0.6668){
                graphicsLayer.stroke(191,62,100,alpha);
                strokeOption = "White BG + Red Stroke"
            } else if(randomNum >= 0.5002 && randomNum < 0.5835){
                graphicsLayer.stroke(23,62,98,alpha);
                strokeOption = "White BG + Red Stroke"
            } else if(randomNum >= 0.4169 && randomNum < 0.5002){
                graphicsLayer.stroke(252,2,96,alpha);
                strokeOption = "White BG + Red Stroke"
            } else if(randomNum >= 0.3336 && randomNum < 0.4169){
                graphicsLayer.stroke(274,33,77,alpha);
                strokeOption = "GoWhiteld BG + Red Stroke"
            } else if(randomNum >= 0.2503 && randomNum < 0.3336){
                graphicsLayer.stroke(353,67,98,alpha);
                strokeOption = "White BG + Red Stroke"
            } else if(randomNum >= 0.167 && randomNum < 0.2503){
                graphicsLayer.stroke(238,69,82,alpha);
                strokeOption = "White BG + Red Stroke"
            } else if(randomNum >= 0.837 && randomNum < 0.167){
                graphicsLayer.stroke(346,17,96,alpha);
                strokeOption = "White BG + Red Stroke"
            } else if(randomNum < 0.837){
                graphicsLayer.stroke(173,64,87,alpha);
                strokeOption = "White BG + Mint Green Stroke"
            } 
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

function verticalLinesTexture(textureStrokeWeight){
    let verticalX1Pos = 0;
    let verticalY1Pos = 0;
    let verticalX2Pos = 0;
    let verticalY2Pos = height;
    strokeWeight(textureStrokeWeight);
    lineCount = width / textureStrokeWeight; 
    for(i = 0; i <= lineCount; i++){
        let textureMaxAlpha = 30;
        let textureAlpha = fxrand() * textureMaxAlpha;
        stroke(0, textureAlpha);
        line(verticalX1Pos, verticalY1Pos, verticalX2Pos, verticalY2Pos);
        verticalX1Pos = verticalX1Pos + textureStrokeWeight;
        verticalX2Pos = verticalX2Pos + textureStrokeWeight;
    }
    noLoop();
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

// function resize() {

//     var canvas = document.getElementById('GLYPHS');
//     var canvasRatio = canvas.height / canvas.width;
//     var windowRatio = window.innerHeight / window.innerWidth;
//     var width;
//     var height;

//     if (windowRatio < canvasRatio) {
//         height = window.innerHeight;
//         width = height / canvasRatio;
//     } else {
//         width = window.innerWidth;
//         height = width * canvasRatio;
//     }

//     canvas.style.width = width + 'px';
//     canvas.style.height = height + 'px';
// };

// window.addEventListener('resize', resize, false);