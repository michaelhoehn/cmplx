let i,canvasDraw,x,y,x1,y1,bg,bgProb,randShapeProb,thicknessProb,gridDir,noiseCount,repeatNum,hotlineColor,gridLineColor,bgLineColor,rareStroke,optionNum,gridType,color1,color2,color3,color4,color5,color6,color7,color8,color9,gridSegments=[3,4,5,10,20,50],segmentCounts=[1,3,5,8,10],lineWeights=[.5,1,1.5,3,5,10,20],rectSizes=[50,100,200,250,300,400,500],alphaOptions=[50,100,200],thicknessDir=[315,225,135,45,0],offsetDist=[5,25,50,100],lineThicknesses=[10,25,50,100,500],formatWidth=[1080,720,1080],formatHeight=[720,1080,1080],sizeMin=100,sizeMax=500,n=fxrand(),shapeCount=1+Math.floor(10*n),gridProb=Math.floor(4*n),shapeProb=Math.floor(2*n),lineTextureCount=10+1e4*fxrand(),noiseTextureCount=5e4+3e5*fxrand(),bgStrokeWeight=.05+.75*fxrand();function setup(){canvasFormat(n),getFormat(n),createCanvas(formatWidth,formatHeight),colorMode(HSB,360,100,100,100),rectMode(CENTER),strokeCapStyle(n),getHotlineStyleFeature(n),canvasDraw=createGraphics(formatWidth,formatHeight),noiseCount=noiseTextureCount,rareStrokeColor=color(45,60,80,100)}function draw(){setBackgroundColor(n),background(bg);let e=fxrand(),o=fxrand(),t=fxrand();print(t),setBackgroundLineColor(e),getBackgroundFeature(n),canvasDraw.stroke(bgLineColor),canvasDraw.strokeWeight(bgStrokeWeight),lineTexture(lineTextureCount),mLayer=createGraphics(formatWidth,formatHeight),mLayer.translate(0,0);let r=shapeSet();if(getShapeTypeFeature(shapeProb),0==r)for(i=0;i<shapeCount;i++){rectSizeIndex(fxrand());let e=rs;rectSizeIndex(fxrand());let o=rs;randomPlacement(),rX,rY,mLayer.rect(rX,rY,e,o)}else for(i=0;i<shapeCount;i++){randomPlacement(),randomSizing();let e=rX,o=rY;mLayer.ellipse(e,o,s)}drawClone=canvasDraw.get(),drawClone.mask(mLayer.get()),image(drawClone,0,0),noisey(noiseCount,.05+1*fxrand(),t),gridType=gridSet(gridProb),gridSegmentIndex(n),setGridLineColor(n),getGridLineColor(n),0==gridType?gridX(gridLineColor):1==gridType?gridY(gridLineColor):2==gridType?gridXY(gridLineColor):gridNull(),getGridTypeFeature(gridProb),shapeGradient(),rareShapeDrop(n),getRareShapeFeature(n),segmentIndex(n),getSegmentCountFeature(n),strokeIndex(n),getStrokeFeature(n),stroke(0),randomPlacement(),x1=rX,y1=rY,hotLines(o),getDirectionFeature(n),getHotlineThicknessFeature(n),noiseStyle(n),getFrameFeature(n),noLoop()}function randomPlacement(){rX=fxrand()*width,rY=fxrand()*height}function randomSizing(){s=20+350*fxrand()}function canvasFormat(e){e>.667?(formatWidth=formatWidth[0],formatHeight=formatHeight[0]):e>=.334&&e<.667?(formatWidth=formatWidth[1],formatHeight=formatHeight[1]):(formatWidth=formatWidth[2],formatHeight=formatHeight[2])}function getFormat(e){return e>.667?"Landscape":e>=.334&&e<.667?"Portrait":"Square"}function lineTexture(e){let o=e;for(i=0;i<o;i++)randomPlacement(),x2=rX,y2=rY,canvasDraw.line(x1,y1,x2,y2),x1=x2,y1=y2}function hotLines(e){strokeWeight(lineWeight);let o=e,t=fxrand();0==optionNum&&o>=.5?t>=.98&&blendMode(EXCLUSION):1==optionNum&&o>=.5&&t>=.5&&blendMode(HARD_LIGHT),setHotLineColor(),thicknessDirection(e),offsetDistance(e),lineThickness(e);let r=od;for(i=0;i<segmentCount;i++){x2=fxrand()*formatWidth,y2=fxrand()*formatHeight;let e=new Lines(x1,y1,x2,y2);if(x1=x2,y1=y2,e.connect(),315==td)for(j=0;j<lt;j++)new Lines(e.x1+r+j,e.y1+r+j,e.x2+r+j,e.y2+r+j).connect();else if(225==td)for(j=0;j<lt;j++)new Lines(e.x1-r-j,e.y1+r+j,e.x2-r-j,e.y2+r+j).connect();else if(135==td)for(j=0;j<lt;j++)new Lines(e.x1-r-j,e.y1-r-j,e.x2-r-j,e.y2-r-j).connect();else if(135==td)for(j=0;j<lt;j++)new Lines(e.x1+r+j,e.y1-r-j,e.x2+r+j,e.y2-r-j).connect();else for(j=0;j<lt;j++)new Lines(e.x1+r+j,e.y1+r+j,e.x2-r-j,e.y2-r-j).connect()}}function gridX(e){for(i=1;i<=gs;i++){let o=i*formatWidth/gs;stroke(e),strokeWeight(.25),line(o,0,o,formatHeight)}}function gridY(e){for(i=1;i<=gs;i++){let o=i*formatHeight/gs;stroke(e),strokeWeight(.25),line(0,o,formatWidth,o)}}function gridXY(e){for(i=1;i<=gs;i++)for(i=1;i<=gs;i++){stroke(e);let o=i*formatWidth/gs;strokeWeight(.25),line(o,0,o,formatHeight);let t=i*formatHeight/gs;strokeWeight(.25),line(0,t,formatWidth,t)}}function gridNull(){for(i=1;i<=gs;i++){let e=i*formatWidth/gs;stroke(bg),strokeWeight(.25),line(e,0,e,formatHeight)}}function rareShapeDrop(e){let o=placeRandShape(e);if(0==o){noStroke(),randomPlacement(),randomSizing();let e=rX,o=rY;ellipse(e,o,s)}else if(1==o){noStroke(),randomPlacement(),randomSizing();let e=rX,o=rY;rect(e,o,s)}}function setHotLineColor(){let e=alphaValue(n);color1=color(250,50,100,e),color2=color(200,50,100,e),color3=color(150,50,100,e),color4=color(360,50,100,e),color5=color(50,50,100,e),color6=color(25,60,100,e),color7=color(0,0,80,10),color8=color(0,0,100,70),color9=color(0,0,100,100);let o=[color1,color2,color3,color4,color5,color6,color7,color8,color9],t=floor(fxrand()*o.length),r=floor(fxrand()*o.length);0==t?color1=o[0]:1==t?color1=o[1]:2==t?color1=o[2]:3==t?color1=o[3]:4==t?color1=o[4]:5==t?color1=o[5]:6==t?color1=o[6]:7==t?color1=o[7]:8==t&&(color1=o[8]),0==r?color2=o[0]:1==r?color2=o[1]:2==r?color2=o[2]:3==r?color2=o[3]:4==r?color2=o[4]:5==r?color2=o[5]:6==r?color2=o[6]:7==r?color2=o[7]:8==r&&(color2=o[8]);let i=drawingContext.createLinearGradient(0,0,formatWidth,formatHeight);i.addColorStop(0,color1),i.addColorStop(1,color2),drawingContext.strokeStyle=i}function shapeGradient(){let e=alphaValue(n);color1=color(250,50,100,e),color2=color(200,50,100,e),color3=color(150,50,100,e),color4=color(360,50,100,e),color5=color(50,50,100,e),color6=color(25,60,100,e),color7=color(0,0,80,10),color8=color(0,0,100,70),color9=color(0,0,100,100);let o=[color1,color2,color3,color4,color5,color6,color7,color8,color9],t=floor(fxrand()*o.length),r=floor(fxrand()*o.length);0==t?color1=o[0]:1==t?color1=o[1]:2==t?color1=o[2]:3==t?color1=o[3]:4==t?color1=o[4]:5==t?color1=o[5]:6==t?color1=o[6]:7==t?color1=o[7]:8==t&&(color1=o[8]),0==r?color2=o[0]:1==r?color2=o[1]:2==r?color2=o[2]:3==r?color2=o[3]:4==r?color2=o[4]:5==r?color2=o[5]:6==r?color2=o[6]:7==r?color2=o[7]:8==r&&(color2=o[8]);let i=drawingContext.createLinearGradient(0,0,formatWidth,formatHeight);i.addColorStop(0,color1),i.addColorStop(1,color2),drawingContext.fillStyle=i}function noisey(e,o,t){for(let r=1;r<=e;r++){strokeWeight(o),t>=.75?stroke(250,90,100,20):t>=.5&&t<.75?stroke(250,50,100,20):t>=.25&&t<.5?stroke(0,0,100,20):stroke(360,50,100,20);let e=fxrand()*width,r=fxrand()*height;point(e,r)}noLoop()}function strokeCapStyle(e){e>=.9?strokeCap(PROJECT):strokeCap(ROUND)}function getHotlineStyleFeature(e){return e>=.9?"Square":"Round"}function randomNoiseHighlightSizing(){s=100+fxrand()*width}function randomNoiseDifferenceSizing(){s=50+200*fxrand()}function noiseStyle(e){e>=.75&&(randomPlacement(),x=rX,y=rY,randomNoiseHighlightSizing(),blendMode(SOFT_LIGHT),ellipse(x,y,s)),e>=.9&&(randomPlacement(),x=rX,y=rY,randomNoiseDifferenceSizing(),blendMode(DIFFERENCE),ellipse(x,y,s)),e>=.98&&(rectMode(CENTER),blendMode(EXCLUSION),rect(width/2,height/2,width-200,height-200))}function getFrameFeature(e){return e>=.98}function setBackgroundColor(e){return e>=.9?(bg=color(50,10,100,100),optionNum=0):e<.9&&e>=.45?(bg=color(0),optionNum=1):e<.45&&e>=0?(bg=color(0,2,100,50),optionNum=2):void 0}function getBackgroundFeature(e){return e>=.9?"Gold":e<.9&&e>=.45?"Black":"White"}function setBackgroundLineColor(e){0==optionNum&&e>=.5?bgLineColor=color(255):0==optionNum&&e>=0&&e<.5?bgLineColor=color(0):1==optionNum&&e>=.8?bgLineColor=rareStrokeColor:1==optionNum&&e>=0&&e<.8?bgLineColor=color(255):2==optionNum&&e>=.8?bgLineColor=rareStrokeColor:2==optionNum&&e>=0&&e<.8&&(bgLineColor=color(0))}function setGridLineColor(e){let o=.85;gridLineColor=0==optionNum&&e>=o?rareStrokeColor:0==optionNum&&e>=.425&&e<o?color(255):0==optionNum&&e>=0&&e<.425?color(0):1==optionNum&&e>=o?rareStrokeColor:1==optionNum&&e>=0&&e<o?color(255):2==optionNum&&e>=o?rareStrokeColor:color(0)}function getGridLineColor(e){let o=.85;return 0==optionNum&&e>=.85?"Gold":0==optionNum&&e>=.425&&e<o?"White":0==optionNum&&e>=0&&e<.425?"Black":1==optionNum&&e>=o?"Gold":1==optionNum&&e>=0&&e<o?"White":2==optionNum&&e>=o?"Gold":"Black"}function shapeSet(){return 1==shapeProb?1:0}function getShapeTypeFeature(e){return 1==e?"Circle":"Rectangle"}function placeRandShape(e){return e>.8?0:e>=.5&&e<.8?1:e<.5?2:void 0}function getRareShapeFeature(e){return e>.8?"Circle":e>=.5&&e<.8?"Rectangle":e<.5?"None":void 0}function gridSet(e){return 0==e?0:1==e?1:2==e?2:3}function getGridTypeFeature(e){return 0==e?"X":1==e?"Y":2==e?"XY":"Inverted"}function rectSizeIndex(e){rs=e>.95?rectSizes[6]:e>=.75&&e<.95?rectSizes[5]:e>=.55&&e<.75?rectSizes[4]:e>=.35&&e<.55?rectSizes[3]:e>=.15&&e<.35?rectSizes[2]:e>=.05&&e<.15?rectSizes[1]:rectSizes[0]}function segmentIndex(e){segmentCount=e>.85?segmentCounts[4]:e>=.65&&e<.85?segmentCounts[3]:e>=.35&&e<.65?segmentCounts[2]:e>=.1&&e<.35?segmentCounts[1]:segmentCounts[0]}function getSegmentCountFeature(e){return e>.95?(feature=segmentCounts[4],feature):e>=.85&&e<.95?(feature=segmentCounts[3],feature):e>=.6&&e<.75?(feature=segmentCounts[2],feature):e>=.2&&e<.6?(feature=segmentCounts[1],feature):(feature=segmentCounts[0],feature)}function strokeIndex(e){lineWeight=e>.95?lineWeights[0]:e>=.85&&e<.95?lineWeights[1]:e>=.65&&e<.85?lineWeights[2]:e>=.45&&e<.65?lineWeights[3]:e>=.35&&e<.45?lineWeights[4]:e>=.15&&e<.35?lineWeights[5]:lineWeights[6]}function getStrokeFeature(e){return e>.95?(lineWeight=lineWeights[0],lineWeight):e>=.85&&e<.95?(lineWeight=lineWeights[1],lineWeight):e>=.65&&e<.85?(lineWeight=lineWeights[2],lineWeight):e>=.45&&e<.65?(lineWeight=lineWeights[3],lineWeight):e>=.35&&e<.45?(lineWeight=lineWeights[4],lineWeight):e>=.15&&e<.35?(lineWeight=lineWeights[5],lineWeight):(lineWeight=lineWeights[6],lineWeight)}function gridSegmentIndex(e){gs=e>.95?gridSegments[5]:e>=.75&&e<.95?gridSegments[4]:e>=.55&&e<.75?gridSegments[3]:e>=.35&&e<.55?gridSegments[2]:e>=.15&&e<.35?gridSegments[1]:gridSegments[0]}function alphaValue(e){return e>.75?(av=alphaOptions[2],av):e>=.45&&e<.75?(av=alphaOptions[1],av):(av=alphaOptions[0],av)}function thicknessDirection(e){td=e>=.75?thicknessDir[0]:e>=.5&&e<.75?thicknessDir[1]:e>=.25&&e<.5||e>=.07&&e<.25?thicknessDir[2]:thicknessDir[4]}function getDirectionFeature(e){return e>=.75?0:e>=.5&&e<.75?1:e>=.25&&e<.5?2:e>=.07&&e<.25?3:4}function offsetDistance(e){od=e>.75?offsetDist[0]:e>=.5&&e<.75?offsetDist[1]:e>=.25&&e<.5?offsetDist[2]:offsetDist[3]}function lineThickness(e){lt=e>.95?lineThicknesses[4]:e>=.7&&e<.95?lineThicknesses[3]:e>=.4&&e<.7?lineThicknesses[2]:e>=.15&&e<.4?lineThicknesses[1]:lineThicknesses[0]}function getHotlineThicknessFeature(e){return e>.95?lineThicknesses[4]:e>=.7&&e<.95?lineThicknesses[3]:e>=.4&&e<.7?lineThicknesses[2]:e>=.15&&e<.4?lineThicknesses[1]:lineThicknesses[0]}class Lines{constructor(e,o,t,r){this.x1=e,this.y1=o,this.x2=t,this.y2=r}connect(){line(this.x1,this.y1,this.x2,this.y2)}}function keyPressed(){"s"===key&&save("Hotlines.png")}