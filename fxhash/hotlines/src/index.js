// these are the variables you can use as inputs to your algorithms
console.log(fxhash)   // the 64 chars hex number fed to your algorithm
console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function 
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
window.$fxhashFeatures = {
  "Hotline Segment Count": getSegmentCountFeature(n),
  "Hotline Lineweight": getStrokeFeature(n),
  "Hotline Offset Direction": getDirectionFeature(n),
  "Hotline Thickness": getHotlineThicknessFeature(n),
  "Hotline Style": getHotlineStyleFeature(n),
  "Background Color": getBackgroundFeature(n),
  "Grid Type": getGridTypeFeature(gridProb),
  "Basic Shape Type": getShapeTypeFeature(shapeProb),
  "Basic Shape Count": shapeCount,
  "Rare Shape Type": getRareShapeFeature(n),
  "Color Frame": getFrameFeature(n),
  "fxrand value": n
}

// this code writes the values to the DOM as an example
const container = document.createElement("div")
container.innerText = `
  random hash: ${fxhash}\n
  Hotline Segment Count: ${window.$fxhashFeatures["Hotline Segment Count"]}\n
  Hotline Lineweight: ${window.$fxhashFeatures["Hotline Lineweight"]}\n
  Hotline Offset Direction: ${window.$fxhashFeatures["Hotline Offset Direction"]}\n
  Hotline Thickness: ${window.$fxhashFeatures["Hotline Thickness"]}\n
  Hotline Style: ${window.$fxhashFeatures["Hotline Style"]}\n
  Background Color: ${window.$fxhashFeatures["Background Color"]}\n
  Grid Type: ${window.$fxhashFeatures["Grid Type"]}\n
  Basic Shape Type: ${window.$fxhashFeatures["Basic Shape Type"]}\n
  Basic Shape Count: ${window.$fxhashFeatures["Basic Shape Count"]}\n
  Rare Shape Type: ${window.$fxhashFeatures["Rare Shape Type"]}\n
  Color Frame: ${window.$fxhashFeatures["Color Frame"]}\n
  fxrand value: ${window.$fxhashFeatures["fxrand value"]}\n
`
//document.body.prepend(container)