import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import p5, * as P5 from 'p5'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// P5 add composition border
const sketch = (s) => {
    s.setup = () => {
        var canVas = s.createCanvas(sizes.width, sizes.height);
        canVas.parent('p5Div')
    }
    s.draw = () => {
        s.noFill()
        s.stroke('white')
        s.strokeWeight(100)
        s.rect(0,0,sizes.width, sizes.height)
    }
}

const sketchInstance = () => {
    new p5(sketch, 'p5Div')
}
//sketchInstance()

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const helper = new THREE.AxesHelper(5)
helper.visible = false

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene

// Random background color
var bgColor = fxrand()
//var bgColorArray = ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue']
var bgColorArray = ['white', 'white', 'white', 'white', 'white']
//var bgColorArray = ['red', 'gray', 'white', 'pink', 'lightblue']


if(bgColor >= 0.8){
    bgColorArray = bgColorArray[0]
} else if (bgColor < 0.8 && bgColor >= 0.6) {
    bgColorArray = bgColorArray[1]
} else if (bgColor < 0.6 && bgColor >= 0.4) {
    bgColorArray = bgColorArray[2]
} else if (bgColor < 0.4 && bgColor >= 0.2) {
    bgColorArray = bgColorArray[3]
} else {
    bgColorArray = bgColorArray[4]
}

const scene = new THREE.Scene()
scene.background = new THREE.Color(bgColorArray) // add bg colors
scene.add(helper)

console.log(bgColorArray)

/**
 * Materials
 */

// Textures 
const textureLoader = new THREE.TextureLoader()
const slabColorTexture = textureLoader.load('/textures/color.jpg')
const slabAOTexture = textureLoader.load('/textures/ao.jpg')
const slabNormalTexture = textureLoader.load('/textures/normal.jpg')
const slabRoughnessTexture = textureLoader.load('/textures/roughness.jpg')
const columnColorTexture = textureLoader.load('/textures/color.jpg')
const columnAOTexture = textureLoader.load('/textures/ao.jpg')
const columnNormalTexture = textureLoader.load('/textures/normal.jpg')
const columnRoughnessTexture = textureLoader.load('/textures/roughness.jpg')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
const matCapTexture = textureLoader.load('/textures/matcaps/4.png')

// Slab Material
const slabMaterial = new THREE.MeshStandardMaterial({
    map: slabColorTexture,
    aoMap: slabAOTexture,
    normalMap: slabNormalTexture,
    roughnessMap: slabRoughnessTexture
    //wireframe: true
})

// UV Mapping
slabColorTexture.wrapS = THREE.RepeatWrapping
slabColorTexture.wrapT = THREE.RepeatWrapping
slabColorTexture.repeat.set(10,5)
slabColorTexture.minFilter = THREE.NearestFilter
slabAOTexture.wrapS = THREE.RepeatWrapping
slabAOTexture.wrapT = THREE.RepeatWrapping
slabAOTexture.repeat.set(10,5)
slabNormalTexture.wrapS = THREE.RepeatWrapping
slabNormalTexture.wrapT = THREE.RepeatWrapping
slabNormalTexture.repeat.set(10,5)
slabRoughnessTexture.wrapS = THREE.RepeatWrapping
slabRoughnessTexture.wrapT = THREE.RepeatWrapping
slabRoughnessTexture.repeat.set(10,5)

// Column Material
const columnMaterial = new THREE.MeshStandardMaterial({
    map: columnColorTexture,
    aoMap: columnAOTexture,
    normalMap: columnNormalTexture,
    roughnessMap: columnRoughnessTexture
})

// UV Mapping
columnColorTexture.wrapS = THREE.RepeatWrapping
columnColorTexture.wrapT = THREE.RepeatWrapping
columnColorTexture.repeat.set(2,10)
columnColorTexture.minFilter = THREE.NearestFilter
columnAOTexture.wrapS = THREE.RepeatWrapping
columnAOTexture.wrapT = THREE.RepeatWrapping
columnAOTexture.repeat.set(2,10)
columnNormalTexture.wrapS = THREE.RepeatWrapping
columnNormalTexture.wrapT = THREE.RepeatWrapping
columnNormalTexture.repeat.set(2,10)
columnRoughnessTexture.wrapS = THREE.RepeatWrapping
columnRoughnessTexture.wrapT = THREE.RepeatWrapping
columnRoughnessTexture.repeat.set(2,10)

/**
 * Objects
 */

// Ground Plane
const groundPlaneGeo = new THREE.PlaneGeometry(1000,1000,50)
//const groundPlaneMat = new THREE.MeshStandardMaterial({color: 'gray'})
const groundPlaneMat = new THREE.MeshMatcapMaterial()
groundPlaneMat.matcap = matCapTexture
const groundPlaneMesh = new THREE.Mesh(groundPlaneGeo, groundPlaneMat)
groundPlaneMesh.rotation.x = - Math.PI * 0.5
groundPlaneMesh.position.y = - 0.5
groundPlaneMesh.receiveShadow = true
scene.add(groundPlaneMesh)

// Building Generator
var floorCount = Math.floor(5 + fxrand() * 10)
var floorToFloorHeight = 0.15 + fxrand() * 2
var slabThickness = 0.03
var buildingHeight = (floorCount * floorToFloorHeight) + (floorCount * slabThickness)
var buildingWidth = Math.floor(2 + fxrand() * 5)
var buildingDepth = Math.floor(2 + fxrand() * 5)
//console.log(buildingHeight)
console.log("Floor Count = " + floorCount)
console.log("Floor To Floor Height = " + floorToFloorHeight)
console.log("Slab Thickness = " + slabThickness)

const parameters = {}
parameters.floorCount = floorCount
parameters.slabWidthX = buildingWidth
parameters.slabWidthY = buildingDepth
parameters.floorOffset = 0
parameters.floorToFloorHeight = floorToFloorHeight
parameters.columnSpacing = 0.3 + fxrand() * 0.85
parameters.edgeOffset = parameters.slabWidthY/2 - parameters.columnSpacing
parameters.widthX = parameters.slabWidthX - parameters.edgeOffset/4
parameters.widthY = parameters.slabWidthY - parameters.edgeOffset/4
parameters.countX = parameters.widthX / parameters.columnSpacing
parameters.countY = parameters.widthY / parameters.columnSpacing
parameters.slabThickness = slabThickness

let slabsArray = []
let columnType = fxrand()
// const columnDebugMat = new THREE.MeshBasicMaterial({color: 'red'})

// Wide Flange Columns
const iGroup = new THREE.Group()
const iGeo0 = new THREE.BoxGeometry(0.005, parameters.floorToFloorHeight * parameters.floorCount, 0.05, 4,1,4)
const iGeo1 = new THREE.BoxGeometry(0.05, parameters.floorToFloorHeight * parameters.floorCount, 0.005, 4,1,4)
const iGeo2 = new THREE.BoxGeometry(0.005, parameters.floorToFloorHeight * parameters.floorCount, 0.05, 4,1,4)
scene.add(iGroup)

// Slab Init
const slabs = new THREE.Group()
const slabGeometry = new THREE.BoxGeometry(parameters.slabWidthX, parameters.slabThickness, parameters.slabWidthY, 4,1,4)
scene.add(slabs)

// Column Init
const columnGroup = new THREE.Group()
const columnGeo = new THREE.BoxGeometry(0.05, parameters.floorToFloorHeight * parameters.floorCount, 0.05, 4,1,4) // <----- Todo column width and depth can vary
scene.add(columnGroup)

var maxHeightArray = []

const generateBuilding = () => {
    for(let i = 0; i < parameters.floorCount; i++){
        const slab = new THREE.Mesh(
            slabGeometry,
            slabMaterial
        )
        slab.geometry.setAttribute('uv2', new THREE.BufferAttribute(slab.geometry.attributes.uv.array,2))
        slab.position.set(0,parameters.floorOffset,0)
        maxHeightArray.push(slab.position.y)
        slabs.add(slab)
        slab.castShadow = true
        slab.receiveShadow = true
        slabsArray.push(slab)
        parameters.floorOffset+=parameters.floorToFloorHeight;
    }

    if(columnType <= 0.5){
        // Square Columns   <----- Todo: Rectangle Columns 
        for(let x = 0; x <= parameters.countX; x++){
            for(let y = 0; y <= parameters.countY; y++){
                const columns = new THREE.Mesh(columnGeo, columnMaterial)
                columns.geometry.setAttribute('uv2', new THREE.BufferAttribute(columns.geometry.attributes.uv.array,2))
                const posX = (x/parameters.countX) * parameters.widthX - parameters.widthX / 2
                const posY = (y/parameters.countY) * parameters.widthY - parameters.widthY / 2
                columns.position.set(posX, ((parameters.floorToFloorHeight * parameters.floorCount)/2) - parameters.floorToFloorHeight, posY)
                columnGroup.add(columns)
                columns.castShadow = true
            }
        }
    } else {
        // Place IGroup
        for(let x = 0; x <= parameters.countX; x++){
            for(let y = 0; y <= parameters.countY; y++){
                const iMesh0 = new THREE.Mesh(iGeo0, columnMaterial)
                const iMesh1 = new THREE.Mesh(iGeo1, columnMaterial)
                var mesh1XOffset = 0.05/2
                const iMesh2 = new THREE.Mesh(iGeo2, columnMaterial)
                var mesh2XOffset = 0.05
                iMesh0.geometry.setAttribute('uv2', new THREE.BufferAttribute(iMesh0.geometry.attributes.uv.array,2))
                iMesh1.geometry.setAttribute('uv2', new THREE.BufferAttribute(iMesh1.geometry.attributes.uv.array,2))
                iMesh2.geometry.setAttribute('uv2', new THREE.BufferAttribute(iMesh2.geometry.attributes.uv.array,2))
                const posX = (x/parameters.countX) * parameters.widthX - parameters.widthX / 2
                const posY = (y/parameters.countY) * parameters.widthY - parameters.widthY / 2
                iMesh0.position.set(posX, ((parameters.floorToFloorHeight * parameters.floorCount)/2) - parameters.floorToFloorHeight, posY)
                iMesh1.position.set(posX + mesh1XOffset, ((parameters.floorToFloorHeight * parameters.floorCount)/2) - parameters.floorToFloorHeight, posY)
                iMesh2.position.set(posX + mesh2XOffset, ((parameters.floorToFloorHeight * parameters.floorCount)/2) - parameters.floorToFloorHeight, posY)
                iGroup.add(iMesh0, iMesh1, iMesh2)
                iMesh0.castShadow = true
                iMesh1.castShadow = true
                iMesh2.castShadow = true
                iMesh0.receiveShadow = true
                iMesh1.receiveShadow = true
                iMesh2.receiveShadow = true
            }
        }
    }
}
generateBuilding()

var totalHeightIndex = maxHeightArray.length
var totalHeight = maxHeightArray[totalHeightIndex - 1]
console.log(maxHeightArray)
console.log(totalHeight)

/**
 * Camera
 */

// Camera target
var targetIndex = Math.floor(fxrand() * (slabsArray.length - 2))

const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 0.1, 2000)
camera.position.x = 8
camera.position.y = slabsArray[targetIndex].position.y
camera.position.z = -7.5
scene.add(camera)

// function to decide which side the camera will target
var keyTarget = fxrand()
var targetXShift
var targetYShift = 2
var targetZShift = 0
var dLightZPos

if(keyTarget <= 0.5) {
    targetXShift = 2,
    dLightZPos = 4
} else {
    targetXShift = -2,
    dLightZPos = -100
}

const camTargetX = slabsArray[targetIndex].position.x + targetXShift
const camTargetY = slabsArray[targetIndex].position.y + targetYShift
const camTargetZ = slabsArray[targetIndex].position.z + targetZShift
const camTargetVector = new THREE.Vector3(camTargetX,camTargetY,camTargetZ)

/**
 * Background Setting
 */

 let bgBuildingsCount = 500

 const bgMassings = new THREE.Group()
 const backgroundBuildings = new THREE.BoxGeometry(0.2, 0.2, 0.2)
//  const backgroundBuildingsMaterial = new THREE.MeshToonMaterial()
//  backgroundBuildingsMaterial.gradientMap = gradientTexture
const backgroundBuildingsMaterial = new THREE.MeshMatcapMaterial()
backgroundBuildingsMaterial.matcap = matCapTexture
 scene.add(bgMassings)
 
 const generateBackgroundBuildings = () => {
     for (let i = 0; i < bgBuildingsCount; i++) {
         // random dims for each variable 
         let bgBuildingsWidth = 5 + fxrand() * 150
         let bgBuildingsHeight = 50 + fxrand() * 500
         let bgBuildingsDepth = 5 + fxrand() * 150
 
         const angle = Math.random() * Math.PI * 2 // Random angle
         const radius = 200 + Math.random() * 600    // Random radius
         const x = Math.cos(angle) * radius        // Get the x position using cosinus
         const z = Math.sin(angle) * radius        // Get the z position using sinus
 
         // Create the mesh
         const massing = new THREE.Mesh(backgroundBuildings, backgroundBuildingsMaterial)
 
         // Scale
         massing.scale.x = bgBuildingsDepth
         massing.scale.y = bgBuildingsHeight
         massing.scale.z = bgBuildingsWidth
 
         // Position
         massing.position.set(x, 0, z)                              
 
         // Rotation
         massing.rotation.y = (Math.random() - 0.5) * 1
 
         // Add to the graves container
         bgMassings.add(massing)
     }
 }
 generateBackgroundBuildings()
 bgMassings.renderOrder = 2

/**
 * Entropy
 */

var entropyStartPosY = slabsArray[targetIndex + 2].position.y

const entropyParams = {}
entropyParams.count = 100000 //Math.floor(100 + fxrand() * 5000) //Math.floor(500000 + fxrand() * 1000000)
entropyParams.size = 0.05 + fxrand() * 0.1
entropyParams.radius = buildingDepth / 3
entropyParams.depth = buildingDepth
entropyParams.width = buildingWidth * 2
entropyParams.branches = Math.floor(2 + fxrand() * 10)
entropyParams.spin = 0.25 + fxrand() * 5
entropyParams.randomness = fxrand() * 0.2
entropyParams.randomnessPower = Math.floor(1 + fxrand() * 10)
entropyParams.insideColor = 'darkgreen'
entropyParams.outsideColor = 'lightgreen'

const generateEntropy = () => {

    const entropyMat = new THREE.PointsMaterial({
        size: entropyParams.size,
        sizeAttenuation: true,
        depthWrite: true, 
        opacity: 1,
        blending: THREE.MultiplyBlending,
        vertexColors: true,
        renderOrder: 0
    })

    const entropyGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(entropyParams.count * 3)
    const colors = new Float32Array(entropyParams.count * 3)
    const colorInside = new THREE.Color(entropyParams.insideColor)
    const colorOutside = new THREE.Color(entropyParams.outsideColor)
    const pointsPositions = []

    for(let i = 0; i < entropyParams.count; i++)
    {
        const i3 = i * 3
        const radius = Math.random() * entropyParams.radius
        const depth = Math.random() * entropyParams.depth
        const width = Math.random() * entropyParams.width
        const spinAngle = radius * entropyParams.spin
        const branchAngle = (i % entropyParams.branches) / entropyParams.branches * Math.PI * 2
        var numberOfFloorsCovered = Math.floor(1 + fxrand() * floorCount)

        const randomX = Math.pow(Math.random(), entropyParams.randomnessPower) * (Math.random() < 0.5 ? 0 : 0) * entropyParams.randomness * width // this controls how far spread the intial drop of points can reach <---- adjust the random conditional to constrain it within the slab boundary or let it grow beyond

        // Vertical Dimension
        const randomY = entropyStartPosY + slabThickness/2 * (Math.random() < 0.5 ? 0 : -0.5) // <--- I tried to use this as a vertical jitter, it's not working. Better to just control it in the position constructor below to not go to every floor. 

        // Dimension
        const randomZ = Math.pow(Math.random(), entropyParams.randomnessPower) * (Math.random() < 0.5 ? 0 : 0) * entropyParams.randomness * depth // this controls how far spread the inital drop of points can reach <---- adjust the random conditional to constrain it within the slab boundary or let it grow beyond

        // Control point spread width
        positions[i3    ] = randomX + (Math.random() - 0.5) * buildingWidth

        // change this one below!
        positions[i3 + 1] = randomY + (Math.random() < 0.5 ? 0 : - (floorToFloorHeight * numberOfFloorsCovered) * fxrand()) 
        // the conditions controls each point going to a different slab start point ----> - floorToFloorHeight * Math.floor(fxrand() * floorCount) needs to be changed to allow for dripping behavior, then wrap this in a for loop for each floor

        // Control point spread depth
        positions[i3 + 2] = randomZ + (Math.random() - 0.5) * buildingDepth

        pointsPositions.push(new THREE.Vector3(positions[i3    ], positions[i3 + 1], positions[i3 + 2]))

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / entropyParams.radius)

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }
    entropyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    entropyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const entropyPoints = new THREE.Points(entropyGeo, entropyMat)
    scene.add(entropyPoints)

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 'white',
        linewidth: 0.05,
        // blendingMode: 'darken' 
    })
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(pointsPositions)
    const entropyLines = new THREE.Line(lineGeometry,lineMaterial)
    //scene.add(entropyLines)
}
generateEntropy()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Directional light
var dLightXPos = 25
var dLightYPos = 8

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75)
directionalLight.position.set(dLightXPos, dLightYPos, dLightZPos)
scene.add(directionalLight)
directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.top = 10
directionalLight.shadow.camera.bottom = -10
directionalLight.shadow.camera.right = 10
directionalLight.shadow.camera.left = -10
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 50
// directionalLight.shadow.radius = 10

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)

// // target debug
// console.log(camTargetX)

// GUI Controls
const folder0 = gui.addFolder('Building Controls')
const folder1 = gui.addFolder('Lighting Controls')
const folder2 = gui.addFolder('Camera Controls')
const folder3 = gui.addFolder('Post-Process Control')

// camera controls
folder2.add(camera.position, 'x').min(-50).max(50).step(0.001).name('camX')
folder2.add(camera.position, 'y').min(-50).max(50).step(0.001).name('camY')
folder2.add(camera.position, 'z').min(-50).max(50).step(0.001).name('camZ')
folder2.add(camTargetVector, 'x').min(-50).max(50).step(0.001).name('targetX')
folder2.add(camTargetVector, 'y').min(-50).max(50).step(0.001).name('targetY')
folder2.add(camTargetVector, 'z').min(-50).max(50).step(0.001).name('targetZ')

// building controls
// folder0.add(parameters, 'floorCount').min(0).max(100).step(1).onFinishChange(generateBuilding)
folder0.add(slabMaterial, 'metalness').min(0).max(1).step(0.001)
folder0.add(slabMaterial, 'roughness').min(0).max(1).step(0.001)
//folder0.add(slabMaterial, 'normalScale').min(0).max(1).step(0.0001)
//folder0.add(slabMaterial, 'displacementScale').min(0).max(1).step(0.0001)

// lighting controls
folder1.add(directionalLight.position, 'x').min(- 50).max(50).step(0.001).name('dLight X')
folder1.add(directionalLight.position, 'y').min(- 50).max(50).step(0.001).name('dLight Y')
folder1.add(directionalLight.position, 'z').min(- 200).max(50).step(0.001).name('dLight Z')
folder1.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('aLight intensity')
folder1.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('dLight intensity')

// post-processing controls

//Controls -- debug
const controls = new OrbitControls(camera, canvas)
controls.enabled = true
controls.enableDamping = true
//controls.autoRotate = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true // enable for shadows ;) 
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

const effectComposer = new EffectComposer(renderer)
effectComposer.setSize(sizes.width, sizes.height)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

/**
 * Fog maybe? 
 */

 const fog = new THREE.Fog('#262837', 2, 500)
 scene.fog = fog
 renderer.setClearColor('#262837')

const params = {
    shape: 1,
    radius: 4,
    rotateR: Math.PI / 4,
    rotateB: Math.PI / 4,
    rotateG: Math.PI / 4,
    scatter: 0,
    blending: 1,
    blendingMode: 1,
    greyscale: false,
    disable: false
}

const halftonePass = new HalftonePass( sizes.width, sizes.height, params)
const controller = {
    radius: halftonePass.uniforms[ 'radius' ].value,
    rotateR: halftonePass.uniforms[ 'rotateR' ].value / ( Math.PI / 180 ),
    rotateG: halftonePass.uniforms[ 'rotateG' ].value / ( Math.PI / 180 ),
    rotateB: halftonePass.uniforms[ 'rotateB' ].value / ( Math.PI / 180 ),
    scatter: halftonePass.uniforms[ 'scatter' ].value,
    shape: halftonePass.uniforms[ 'shape' ].value,
    greyscale: halftonePass.uniforms[ 'greyscale' ].value,
    blending: halftonePass.uniforms[ 'blending' ].value,
    blendingMode: halftonePass.uniforms[ 'blendingMode' ].value,
    disable: halftonePass.uniforms[ 'disable' ].value
};

effectComposer.addPass(halftonePass)

function onGUIChange() {
    halftonePass.uniforms[ 'radius' ].value = controller.radius;
    halftonePass.uniforms[ 'rotateR' ].value = controller.rotateR * ( Math.PI / 180 );
    halftonePass.uniforms[ 'rotateG' ].value = controller.rotateG * ( Math.PI / 180 );
    halftonePass.uniforms[ 'rotateB' ].value = controller.rotateB * ( Math.PI / 180 );
    halftonePass.uniforms[ 'scatter' ].value = controller.scatter;
    halftonePass.uniforms[ 'shape' ].value = controller.shape;
    halftonePass.uniforms[ 'greyscale' ].value = controller.greyscale;
    halftonePass.uniforms[ 'blending' ].value = controller.blending;
    halftonePass.uniforms[ 'blendingMode' ].value = controller.blendingMode;
    halftonePass.uniforms[ 'disable' ].value = controller.disable;
}

const smaaPass = new SMAAPass()
effectComposer.addPass(smaaPass)

folder3.add( controller, 'shape', { 'Dot': 1, 'Ellipse': 2, 'Line': 3, 'Square': 4 } ).onChange( onGUIChange );
folder3.add( controller, 'radius', 1, 25 ).onChange( onGUIChange );
folder3.add( controller, 'rotateR', 0, 90 ).onChange( onGUIChange );
folder3.add( controller, 'rotateG', 0, 90 ).onChange( onGUIChange );
folder3.add( controller, 'rotateB', 0, 90 ).onChange( onGUIChange );
folder3.add( controller, 'scatter', 0, 1, 0.01 ).onChange( onGUIChange );
folder3.add( controller, 'greyscale' ).onChange( onGUIChange );
folder3.add( controller, 'blending', 0, 1, 0.01 ).onChange( onGUIChange );
folder3.add( controller, 'blendingMode', { 'Linear': 1, 'Multiply': 2, 'Add': 3, 'Lighter': 4, 'Darker': 5 } ).onChange( onGUIChange );
folder3.add( controller, 'disable' ).onChange( onGUIChange );

/**
 * On Resize Event
 */
 window.addEventListener('resize', () =>
 {
     // Update sizes
     sizes.width = window.innerWidth
     sizes.height = window.innerHeight
 
     // Update camera
     camera.aspect = sizes.width / sizes.height
     camera.updateProjectionMatrix()
 
     // Update renderer
     renderer.setSize(sizes.width, sizes.height)
     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 })


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // animate the sphere
    // sphere.position.x = Math.cos(elapsedTime)
    // sphere.position.z = 1 + Math.sin(elapsedTime)
    // sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    //camera.position.x = Math.cos(elapsedTime) * 10
    //camera.position.z = Math.sin(elapsedTime) * 10
    //camera.position.y = Math.sin(elapsedTime) * 1.5

    // Update camera
    camera.lookAt(camTargetVector)

    // Update controls
    //controls.update()

    // Render
    //renderer.render(scene, camera)
    effectComposer.render()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()