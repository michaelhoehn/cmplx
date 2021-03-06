// Please review LICENSE.md for usage limitations

let i;
let canvasDraw;
let x, y;
let x1, y1;
let bg;
let bgProb, randShapeProb, thicknessProb;
let gridDir;
let gridSegments = [3, 4, 5, 10, 20, 50];
let segmentCounts = [1, 3, 5, 8, 10];
let lineWeights = [0.5, 1, 1.5, 3, 5, 10, 20];
let rectSizes = [50, 100, 200, 250, 300, 400, 500];
let alphaOptions = [50, 100, 200];
let thicknessDir = [315, 225, 135, 45, 0];
let offsetDist = [5, 25, 50, 100];
let lineThicknesses = [10, 25, 50, 100, 500];
let formatWidth = [1080, 720, 1080];
let formatHeight = [720, 1080, 1080];
let sizeMin = 100;
let sizeMax = 500;
let noiseCount;
let repeatNum;
let hotlineColor;
let gridLineColor; 
let bgLineColor; 
let rareStroke;
let optionNum;
let n = fxrand();
let shapeCount = (1 + Math.floor(n * 10));
let gridProb = Math.floor(n * 4);
let gridType;
let shapeProb = Math.floor(n * 2);
let lineTextureCount = 10 + fxrand() * 10000;
let noiseTextureCount = 50000 + fxrand() * 300000;
let bgStrokeWeight = 0.05 + fxrand() * 0.75;
let color1, color2, color3, color4, color5, color6, color7, color8, color9;

function setup() {
    canvasFormat(n);
    getFormat(n);
    createCanvas(formatWidth, formatHeight);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    strokeCapStyle(n);
    getHotlineStyleFeature(n);
    canvasDraw = createGraphics(formatWidth, formatHeight);
    noiseCount = noiseTextureCount;
    rareStrokeColor = color(45, 60, 80, 100);
}

function draw() {
    setBackgroundColor(n);
    background(bg);
    let m = fxrand();
    let l = fxrand();
    let noiseRand = fxrand();
    print(noiseRand);
    setBackgroundLineColor(m);
    getBackgroundFeature(n);

    // Layer 1 - Create draw layer. All drawings need to happen here if wanting to be clipped by mask.
    canvasDraw.stroke(bgLineColor);
    canvasDraw.strokeWeight(bgStrokeWeight);
    lineTexture(lineTextureCount);

    // Layer 2 - Create mask layer
    mLayer = createGraphics(formatWidth, formatHeight);
    mLayer.translate(0, 0); // move the mask into place. 0,0 for full sized CG.

    // <----- make any shapes you like to use as a mask below here ----->

    let shapeType = shapeSet();
    getShapeTypeFeature(shapeProb);

    if (shapeType == 0) {
        for (i = 0; i < shapeCount; i++) {
            rectSizeIndex(fxrand());
            let rectSize1 = rs;
            rectSizeIndex(fxrand());
            let rectSize2 = rs;
            randomPlacement();
            let x = rX; 
            let y = rY; 
            mLayer.rect(rX, rY, rectSize1, rectSize2);
        }
        
    } else {
        for (i = 0; i < shapeCount; i++) {
            randomPlacement();
            randomSizing();
            let x = rX; 
            let y = rY; 
            mLayer.ellipse(x, y, s);
        }
    }

    // Make the mask layer an actual mask.
    drawClone = canvasDraw.get();
    drawClone.mask(mLayer.get());

    // Instantiate the mask layer.
    image(drawClone, 0, 0);

    // <-------------------------------- Draw anything you want on top of this mask layer and below this line ------------------------------------------>
    noisey(noiseCount, 0.05 + fxrand() * 1, noiseRand);
    gridType = gridSet(gridProb); 
    gridSegmentIndex(n);
    setGridLineColor(n);
    getGridLineColor(n);
    if (gridType == 0) {
        gridX(gridLineColor);
    } else if (gridType == 1) {
        gridY(gridLineColor);
    } else if (gridType == 2) {
        gridXY(gridLineColor);
    } else {
        gridNull();
    }
    getGridTypeFeature(gridProb);
    shapeGradient();
    rareShapeDrop(n);
    getRareShapeFeature(n);
    segmentIndex(n);
    getSegmentCountFeature(n);
    strokeIndex(n);
    getStrokeFeature(n);
    stroke(0);

    randomPlacement();
    x1 = rX;
    y1 = rY;

    hotLines(l);
    getDirectionFeature(n);
    getHotlineThicknessFeature(n);
    noiseStyle(n);
    getFrameFeature(n);
    noLoop();
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

// Description: Portrait 3:2 {1080x720}, Landscape 2:3 {720x1080}, Square 1:1 {1080x1080}
function canvasFormat(n){
    //formatWidth = [1080, 720, 1080];
    //formatHeight = [720, 1080, 1080];
    if (n > 0.667) {
        formatWidth = formatWidth[0];
        formatHeight = formatHeight[0];
    } else if (n >= 0.334 && n < 0.667) {
        formatWidth = formatWidth[1];
        formatHeight = formatHeight[1];
    } else {
        formatWidth = formatWidth[2];
        formatHeight = formatHeight[2];
    }
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getFormat(n){
    if (n > 0.667) {
        return "Landscape";
    } else if (n >= 0.334 && n < 0.667) {
        return "Portrait";
    } else {
        return "Square";
    }
}

// Description: Set the line work underlay based on segment count
function lineTexture(n) {
    let numSegments = n;
    for (i = 0; i < numSegments; i++) {
        randomPlacement();
        x2 = rX;
        y2 = rY;
        canvasDraw.line(x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
    }
}

// Description: Controls the line behavior based on count, strokeweight, and alpha
// Notes: colors are not working and I'm going to try removing the functionality from this function to try and debug
function hotLines(n) {
    strokeWeight(lineWeight);
    let blendProb = n;
    let rareblend = fxrand();
    if(optionNum == 0 && blendProb >= 0.50){
        //gold
        if(rareblend >= 0.98){
            blendMode(EXCLUSION);
        }
    } else if(optionNum == 1 && blendProb >= 0.50){
        //black
        if(rareblend >= 0.50){
            blendMode(HARD_LIGHT);
        }
    } 
    setHotLineColor();
    thicknessDirection(n);
    offsetDistance(n);
    lineThickness(n);
    let offset = od; 
    for (i = 0; i < segmentCount; i++) {
        x2 = fxrand() * formatWidth;
        y2 = fxrand() * formatHeight;
        let hotline = new Lines(x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
        hotline.connect();

        //let thicknessDir = [315, 225, 135, 45];
        if(td == 315){
            for(j=0; j<lt; j++){
                let thickLine = new Lines(hotline.x1 + offset + j, hotline.y1 + offset + j, hotline.x2 + offset + j, hotline.y2 + offset + j);
                thickLine.connect();
            }
        } else if(td == 225){
            for(j=0; j<lt; j++){
                let thickLine = new Lines(hotline.x1 - offset - j, hotline.y1 + offset + j, hotline.x2 - offset - j, hotline.y2 + offset + j);
                thickLine.connect();
            }
        } else if(td == 135){
            for(j=0; j<lt; j++){
                let thickLine = new Lines(hotline.x1 - offset - j, hotline.y1 - offset - j, hotline.x2 - offset - j, hotline.y2 - offset - j);
                thickLine.connect();
            }
        } else if(td == 135){
            for(j=0; j<lt; j++){
                let thickLine = new Lines(hotline.x1 + offset + j, hotline.y1 - offset - j, hotline.x2 + offset + j, hotline.y2 - offset - j);
                thickLine.connect();
            } 
        } else {
            for(j=0; j<lt; j++){
                let thickLine = new Lines(hotline.x1 + offset + j, hotline.y1 + offset + j, hotline.x2 - offset - j, hotline.y2 - offset - j);
                thickLine.connect();
            } 
        }
    }
    
}

// Description: Creates a grid with X Direction offset
function gridX(s) {
    for (i = 1; i <= gs; i++) {
        let lineX = (i * formatWidth) / gs;
        stroke(s);
        strokeWeight(0.25);
        line(lineX, 0, lineX, formatHeight);
    }
}

// Description: Creates a grid with Y Direction offset
function gridY(s) {
    for (i = 1; i <= gs; i++) {
        let lineY = (i * formatHeight) / gs;
        stroke(s);
        strokeWeight(0.25);
        line(0, lineY, formatWidth, lineY);
    }
}

// Description: Creates a grid with Y Direction offset
function gridXY(s) {
    for (i = 1; i <= gs; i++) {
        for (i = 1; i <= gs; i++) {
            stroke(s);
            let lineX = (i * formatWidth) / gs;
            strokeWeight(0.25);
            line(lineX, 0, lineX, formatHeight);
            let lineY = (i * formatHeight) / gs;
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
function rareShapeDrop(n) {
    let ps = placeRandShape(n);
    if (ps == 0) {
        noStroke();
        randomPlacement();
        randomSizing();
        let x = rX; 
        let y = rY; 
        ellipse(x, y, s);
    } else if (ps == 1) {
        noStroke();
        randomPlacement();
        randomSizing();
        let x = rX; 
        let y = rY; 
        rect(x, y, s);
    }
}

// Description: Draw the gradient within the line based on colours
function setHotLineColor() {
    let av = alphaValue(n);
    //colorful
    color1 = color(250, 50, 100, av);
    color2 = color(200, 50, 100, av);
    color3 = color(150, 50, 100, av);
    color4 = color(360, 50, 100, av);
    color5 = color(50, 50, 100, av);
    color6 = color(25, 60, 100, av);
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
        formatWidth,
        formatHeight
    );

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    drawingContext.strokeStyle = gradient;
}

// Description: Draw a radial gradient
function shapeGradient() {
    let av = alphaValue(n);
    //colorful
    color1 = color(250, 50, 100, av);
    color2 = color(200, 50, 100, av);
    color3 = color(150, 50, 100, av);
    color4 = color(360, 50, 100, av);
    color5 = color(50, 50, 100, av);
    color6 = color(25, 60, 100, av);
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
        formatWidth,
        formatHeight
    );

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    drawingContext.fillStyle = gradient;
}

// Description: Draw noise layer based on number and stroke weight
function noisey(count, s, noiseRand) {
    for (let i = 1; i <= count; i++) {
        strokeWeight(s);
        if (noiseRand >= 0.75) {
            stroke(250,90,100,20);
        } else if (noiseRand >= 0.50 && noiseRand < 0.75){
            stroke(250, 50, 100, 20);
        } else if(noiseRand >= 0.25 && noiseRand < 0.50){
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

function strokeCapStyle(n){
    if (n >= 0.9){
        strokeCap(PROJECT);
    } else{
        strokeCap(ROUND);
    }
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getHotlineStyleFeature(n){
    if (n >= 0.9){
        return "Square";
    } else{
        return "Round";
    }
}

function randomNoiseHighlightSizing(){
    s = 100 + fxrand() * width;
}

function randomNoiseDifferenceSizing(){
    s = 50 + fxrand() * 200;
}

function noiseStyle(n){
    let noiseHighlight = n;
    if (noiseHighlight >= 0.75){
        randomPlacement();
        x = rX; 
        y = rY; 
        randomNoiseHighlightSizing();
        blendMode(SOFT_LIGHT);
        ellipse(x, y, s);
    }
    let noiseDifference = n;
    if(noiseDifference >= 0.90){
        randomPlacement();
        x = rX; 
        y = rY; 
        randomNoiseDifferenceSizing();
        blendMode(DIFFERENCE);
        ellipse(x, y, s);
    }
    let exclusionFrame = n; 
    if (exclusionFrame >= 0.98){
        rectMode(CENTER);
        blendMode(EXCLUSION);
        rect(width/2, height/2, width-200, height-200);
    }
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getFrameFeature(n){
    if (n >= 0.98) {
        return true;
    } else {
        return false;
    }
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

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getBackgroundFeature(n){
    if (n >= 0.90) {
        return "Gold";
    } else if(n < 0.90 && n >= 0.45){
        return "Black";
    } else {
        return "White";
    }
}

function setBackgroundLineColor(n){
    if(optionNum == 0 && n >= 0.50){
        // Gold BG + White Lines
        bgLineColor = color(255);
    } else if(optionNum == 0 && n >= 0 && n < 0.50){
        // Gold BG + Black Lines 
        bgLineColor = color(0);
    } else if(optionNum == 1 && n >= 0.80) {
        // Black BG + Gold Lines
        bgLineColor = rareStrokeColor;
    } else if(optionNum == 1 && n >= 0 && n < 0.80){
        // Black BG + White Lines
        bgLineColor = color(255);
    } else if(optionNum == 2 && n >= 0.80) {
        // White BG + Gold Lines
        bgLineColor = rareStrokeColor;
    } else if(optionNum == 2 && n >= 0 && n < 0.80){
        // White BG + Black Lines
        bgLineColor = color(0);
    } 
}

// Description: Sets the color for Gridlines 
function setGridLineColor(n){
    let rareProb = 0.85;

    if (optionNum == 0 && n >= rareProb){
        // Gold BG + Gold Lines
        gridLineColor = rareStrokeColor;
    } else if(optionNum == 0 && n >= 0.425 && n < rareProb) {
        // Gold BG + White Lines
        gridLineColor = color(255);
    } else if(optionNum == 0 && n >= 0 && n < 0.425){
        // Gold BG + Black Lines
        gridLineColor = color(0);
    } else if(optionNum == 1 && n >= rareProb){
        // Black BG + Gold Lines
        gridLineColor = rareStrokeColor;
    } else if(optionNum == 1 && n >= 0 && n < rareProb){
        // Black BG + White Lines 
        gridLineColor = color(255);
    } else if(optionNum == 2 && n >= rareProb){
        // White BG + Gold Lines
        gridLineColor = rareStrokeColor;
    } else {
        // White BH + Black Lines
        gridLineColor = color(0);
    }
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getGridLineColor(n){
    let rareProb = 0.85
    if (optionNum == 0 && n >= 0.85){
        return "Gold";
    } else if(optionNum == 0 && n >= 0.425 && n < rareProb) {
        return "White";
    } else if(optionNum == 0 && n >= 0 && n < 0.425){
        return "Black";
    } else if(optionNum == 1 && n >= rareProb){
        return "Gold";
    } else if(optionNum == 1 && n >= 0 && n < rareProb){
        return "White";
    } else if(optionNum == 2 && n >= rareProb){
        return "Gold";
    } else {
        return "Black";
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

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getShapeTypeFeature(n){
    if (n == 1) {
        return "Circle"; // draw ellipse.
    } else {
        return "Rectangle"; // draw rect.
    }
}

// Description: Boolean to set the random shape insert
function placeRandShape(n) {
    if (n > 0.8) {
        return 0; // draw ellipse
    } else if (n >= 0.5 && n < 0.8) {
        return 1; // draw rect.
    } else if (n < 0.5) {
        return 2; // draw nothing
    }
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getRareShapeFeature(n){
    if (n > 0.8) {
        return "Circle"; // draw ellipse
    } else if (n >= 0.5 && n < 0.8) {
        return "Rectangle"; // draw rect.
    } else if (n < 0.5) {
        return "None"; // draw nothing
    }
}

// Description: Boolean to set the grid direction shapes
function gridSet(n) {
    if (n == 0) {
        return 0; // X direction
    } else if (n == 1) {
        return 1; // Y direction
    } else if (n == 2) {
        return 2; // both X and Y directions
    } else {
        return 3; // no grid
    }
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getGridTypeFeature(n){
    if (n == 0) {
        return "X"; // X direction
    } else if (n == 1) {
        return "Y"; // Y direction
    } else if (n == 2) {
        return "XY"; // both X and Y directions
    } else {
        return "Inverted"; // no grid
    }
}

// Description: Set rect size value based on index by probability
function rectSizeIndex(n) {
    //rectSizes = [10, 20, 50, 100, 200, 300, 500];
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
function segmentIndex(n) {
    //segmentCounts = [1, 3, 5, 8, 10];
    if (n > 0.85) {
        segmentCount = segmentCounts[4];
    } else if (n >= 0.65 && n < 0.85) {
        segmentCount = segmentCounts[3];
    } else if (n >= 0.35 && n < 0.65) {
        segmentCount = segmentCounts[2];
    } else if (n >= 0.1 && n < 0.35) {
        segmentCount = segmentCounts[1];
    } else {
        segmentCount = segmentCounts[0];
    }
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getSegmentCountFeature(n){
    if (n > 0.95) {
        feature = segmentCounts[4];
        return feature;
    } else if (n >= 0.85 && n < 0.95) {
        feature = segmentCounts[3];
        return feature;
    } else if (n >= 0.6 && n < 0.75) {
        feature = segmentCounts[2];
        return feature;
    } else if (n >= 0.2 && n < 0.6) {
        feature = segmentCounts[1];
        return feature;
    } else {
        feature = segmentCounts[0];
        return feature;
    }
}

// Description: Set lineweight value based on index by probability
function strokeIndex(n) {
    if (n > 0.95) {
        lineWeight = lineWeights[0];
    } else if (n >= 0.85 && n < 0.95) {
        lineWeight = lineWeights[1];
    } else if (n >= 0.65 && n < 0.85) {
        lineWeight = lineWeights[2];
    } else if (n >= 0.45 && n < 0.65) {
        lineWeight = lineWeights[3];
    } else if (n >= 0.35 && n < 0.45) {
        lineWeight = lineWeights[4];
    } else if (n >= 0.15 && n < 0.35) {
        lineWeight = lineWeights[5];
    } else {
        lineWeight = lineWeights[6];
    }
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getStrokeFeature(n){
    if (n > 0.95) {
        lineWeight = lineWeights[0];
        return lineWeight;
    } else if (n >= 0.85 && n < 0.95) {
        lineWeight = lineWeights[1];
        return lineWeight;
    } else if (n >= 0.65 && n < 0.85) {
        lineWeight = lineWeights[2];
        return lineWeight;
    } else if (n >= 0.45 && n < 0.65) {
        lineWeight = lineWeights[3];
        return lineWeight;
    } else if (n >= 0.35 && n < 0.45) {
        lineWeight = lineWeights[4];
        return lineWeight;
    } else if (n >= 0.15 && n < 0.35) {
        lineWeight = lineWeights[5];
        return lineWeight;
    } else {
        lineWeight = lineWeights[6];
        return lineWeight;
    }
}

// Description: Set grid segment value based on index by probability
function gridSegmentIndex(n) {
    //let gridSegments = [3,4,5,10,20,50];
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
function alphaValue(n) {
    if (n > 0.75) {
        av = alphaOptions[2];
        return av; 
    } else if (n >= 0.45 && n < 0.75) {
        av = alphaOptions[1];
        return av;
    } else {
        av = alphaOptions[0];
        return av;
    }
}

// Description: Set alpha value based on index by probability
function thicknessDirection(n) {
    if (n >= 0.75) {
        td = thicknessDir[0];
    } else if(n >= 0.5 && n < 0.75){
        td = thicknessDir[1];
    } else if(n >= 0.25 && n < 0.50){
        td = thicknessDir[2];
    } else if(n >= 0.07 && n < 0.25){
        td = thicknessDir[2];
    } else {
        td = thicknessDir[4];
    }
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getDirectionFeature(n){
    if (n >= 0.75) {
        return 0;
    } else if(n >= 0.5 && n < 0.75){
        return 1;
    } else if(n >= 0.25 && n < 0.50){
        return 2;
    } else if(n >= 0.07 && n < 0.25){
        return 3;
    } else {
        return 4;
    }
}

// Description: Set alpha value based on index by probability
function offsetDistance(n) {
    //let offsetDist = [0, 10, 25, 100];
    if (n > 0.75) {
        od = offsetDist[0];
    } else if(n >= 0.50 && n < 0.75){
        od = offsetDist[1];
    } else if(n >= 0.25 && n < 0.50){
        od = offsetDist[2];
    } else {
        od = offsetDist[3];
    } 
}

// Description: Set hotline thickness
function lineThickness(n) {
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
}

// <<<-----fxHash Feature Add for a function returning non-compliant variable type (string, number, bool)----->>>
function getHotlineThicknessFeature(n){
    if (n > 0.95) {
        return lineThicknesses[4];
    } else if(n >= 0.70 && n < 0.95){
        return lineThicknesses[3];
    } else if(n >= 0.40 && n < 0.70){
        return lineThicknesses[2];
    } else if (n >= 0.15 && n < 0.40){
        return lineThicknesses[1];
    } else{
        return lineThicknesses[0];
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