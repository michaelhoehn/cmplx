// Please review LICENSE.md for usage limitations

// to do 
// make masking lines all different sizes based on count
// add random lines as an option instead of the squiggles
// add random shapes instead of lines
// add small marker sketch squiggles
// add dot grids

let n = fxrand();
let lineCount = 20; //2 + Math.floor(fxrand()*20);
let amplitude = 20 + Math.floor(fxrand() * 75);
let rowCount = 3 + Math.floor(fxrand() * 10);
let ySpacing = 50;
let resolution = 50; // + Math.floor(fxrand()*75)
let period = 1 + Math.floor(fxrand() * 10);
let xGridSpacing = 5 + Math.floor(fxrand() * 20); // 1 to 10
let yGridSpacing = 5 + Math.floor(fxrand() * 20);
let padding = 200;
let x1, y1;
let color1, color2, color3, color4, color5, color6, color7, color8, color9;
let noiseRand = fxrand();
let noiseCount = 50000 + fxrand() * 300000;
let glyphOption;
let count = 10000;
let x = 500;
let y = 500;

function setup() {
    createCanvas(1000, 1000);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);

    // color background function
    setBackgroundColor(n);
    background(bg);
    x1 = fxrand() * width;
    y1 = fxrand() * height;
}

function draw() {




    noFill();

    glyphs();

    // masking
    if (glyphOption == 0) {
        gridX();
    } else if (glyphOption == 1) {
        gridX();
        gridY();
    } else if (glyphOption == 2){
        gridX();
        gridY();
    }

    // noFill();
    // beginShape();
    // stroke(bg);
    // strokeWeight(5);
    // for (i=0; i<count; i++){
    //   vertex(x,y);
    //   const r = floor(random(4));
    //   switch (r) {
    //     case 0:
    //       x = x + 25;
    //       break;
    //     case 1:
    //       x = x - 25;
    //       break;
    //     case 2:
    //       y = y + 25;
    //       break;
    //     case 3:
    //       y = y - 25;
    //       break;
    //   }
    // }
    // endShape(CLOSE);
    // noLoop();

    // Erased Parts
    blendMode(BLEND);
    
    stroke(bg);
    directionalHatch(0.5 + fxrand() * 5);

    // // add noise
    stroke(360, 100, 100, 100);
    noisey(noiseCount, 0.05 + fxrand() * 1, noiseRand);

    // //blend shapes 
    blendMode(SOFT_LIGHT);
    fill(bg);
    shapeGradient();
    noStroke();
    rect(fxrand() * width, fxrand() * height, 100 + fxrand() * width, 100 + fxrand() * height);
    shapeGradient();
    //blendMode(OVERLAY);
    ellipse(fxrand() * width, fxrand() * height, 300 + fxrand() * width);




}

// <----------------------------------------------- Draw Functions ----------------------------------------------------> //

function glyphs() {
    let n = fxrand();
    if (n >= 0.666) {
        // draw squiggles
        for (let i = 1; i < rowCount; i++) {
            for (let t = 0; t < lineCount; t++) {
                strokeWeight(0.15 * (t + 1));
                if (optionNum == 0) {
                    // gold bg
                    stroke(50, 10, 0, 2 * (t + 20));
                } else if (optionNum == 1) {
                    // black bg
                    stroke(360, 0, 100, 2 * (t + 20));
                } else if (optionNum == 2) {
                    // white bg
                    stroke(200, 0, 0, 2 * (t + 20));
                }
                beginShape();
                for (let j = 0; j <= resolution; j++) {
                    curveVertex((j * width / resolution), ((i * height / rowCount) + fxrand() * amplitude) - amplitude / 2);
                    noLoop();
                }
                endShape();
            }
        }
        return glyphOption = 0;

    } else if (n < 0.666 && n >= 0.333) {
        // draw straight random lines
        let numLines = 20;
        for (let i = 0; i < numLines; i++) {
            strokeWeight(fxrand() * i / 2);
            if (optionNum == 0) {
                // gold bg
                stroke(50, 10, 0, 50);
            } else if (optionNum == 1) {
                // black bg
                stroke(360, 0, 100, 50);
            } else if (optionNum == 2) {
                // white bg
                stroke(200, 0, 0, 50);
            }
            for (let i = 0; i <= numLines; i++) {
                let x2 = fxrand() * width;
                let y2 = fxrand() * height;
                line(x1, y1, x2, y2);
                x1 = x2;
                y1 = y2;
            }
        }
        return glyphOption = 1;
    } else if( n < 0.333){

        // make this a function
        noFill();
        beginShape();
        strokeWeight(0.05 + fxrand()*5);
        if (optionNum == 0) {
            // gold bg
            stroke(50, 10, 0, 50);
        } else if (optionNum == 1) {
            // black bg
            stroke(360, 0, 100, 50);
        } else if (optionNum == 2) {
            // white bg
            stroke(200, 0, 0, 50);
        }
        for (i=0; i<count; i++){
          vertex(x,y);
          const r = floor(random(4));
          switch (r) {
            case 0:
              x = x + 10;
              break;
            case 1:
              x = x - 10;
              break;
            case 2:
              y = y + 10;
              break;
            case 3:
              y = y - 10;
              break;
          }
        }
        endShape();
        //noLoop();
        return glyphOption = 2;
    }
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
function directionalHatch(sw) {
    let n = fxrand();
    let padding = 5;
    let spacingMax = 500;
    let spacingMin = 300;
    strokeWeight(sw);
    if (n <= 0.90) {
        for (let i = 0; i < height; i++) {
            line(0, 0, width + padding, i);
            i += spacingMin + fxrand() * spacingMax;
        }
        for (let i = 0; i < height; i++) {
            line(width, 0, -padding, i);
            i += spacingMin + fxrand() * spacingMax;
        }
        for (let i = 0; i < height; i++) {
            line(0, height, width + padding, i);
            i += spacingMin + fxrand() * spacingMax;
        }
        for (let i = 0; i < height; i++) {
            line(width, height, padding, i);
            i += spacingMin + fxrand() * spacingMax;
        }
    } else if (n >= 0.675 && n < 0.90) {
        for (let i = 0; i < height; i++) {
            line(0, 0, width + padding, i);
            i += spacingMin + fxrand() * spacingMax;
        }
    } else if (n >= 0.45 && n < 0.675) {
        for (let i = 0; i < height; i++) {
            line(width, 0, -padding, i);
            i += spacingMin + fxrand() * spacingMax;
        }
    } else if (n >= 22.5 && n < 0.45) {
        for (let i = 0; i < height; i++) {
            line(0, height, width + padding, i);
            i += spacingMin + fxrand() * spacingMax;
        }
    } else {
        for (let i = 0; i < height; i++) {
            line(width, height, padding, i);
            i += spacingMin + fxrand() * spacingMax;
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
    } else if (n < 0.9 && n >= 0.45) {
        // 50/50 for Black BG
        bg = color(0);
        return optionNum = 1;
    } else if (n < 0.45 && n >= 0) {
        // 50/50 for White BG
        bg = color(0, 2, 100, 100);
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