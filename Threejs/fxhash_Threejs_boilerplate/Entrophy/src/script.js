import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import p5, * as P5 from 'p5'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js'

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
sketchInstance()

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
var bgColorArray = ['red', 'black', 'white', 'pink', 'lightblue']

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

// Slab Material
const slabMaterial = new THREE.MeshStandardMaterial({
    map: slabColorTexture,
    aoMap: slabAOTexture,
    normalMap: slabNormalTexture,
    roughnessMap: slabRoughnessTexture
})

// UV Mapping
slabColorTexture.wrapS = THREE.RepeatWrapping
slabColorTexture.wrapT = THREE.RepeatWrapping
slabColorTexture.repeat.set(12,12)
slabColorTexture.minFilter = THREE.NearestFilter
slabAOTexture.wrapS = THREE.RepeatWrapping
slabAOTexture.wrapT = THREE.RepeatWrapping
slabAOTexture.repeat.set(12,12)
slabNormalTexture.wrapS = THREE.RepeatWrapping
slabNormalTexture.wrapT = THREE.RepeatWrapping
slabNormalTexture.repeat.set(12,12)
slabRoughnessTexture.wrapS = THREE.RepeatWrapping
slabRoughnessTexture.wrapT = THREE.RepeatWrapping
slabRoughnessTexture.repeat.set(12,12)

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
columnColorTexture.repeat.set(10,2)
columnColorTexture.minFilter = THREE.NearestFilter
columnAOTexture.wrapS = THREE.RepeatWrapping
columnAOTexture.wrapT = THREE.RepeatWrapping
columnAOTexture.repeat.set(10,2)
columnNormalTexture.wrapS = THREE.RepeatWrapping
columnNormalTexture.wrapT = THREE.RepeatWrapping
columnNormalTexture.repeat.set(10,2)
columnRoughnessTexture.wrapS = THREE.RepeatWrapping
columnRoughnessTexture.wrapT = THREE.RepeatWrapping
columnRoughnessTexture.repeat.set(10,2)

/**
 * Objects
 */
const groundPlaneGeo = new THREE.PlaneGeometry(50,50,50)
const groundPlaneMesh = new THREE.Mesh(groundPlaneGeo, slabMaterial)
groundPlaneMesh.rotation.x = - Math.PI * 0.5
groundPlaneMesh.position.y = - 0.5
groundPlaneMesh.receiveShadow = true
scene.add(groundPlaneMesh)


const parameters = {}
parameters.floorCount = Math.floor(5 + fxrand() * 25)
parameters.slabWidthX = Math.floor(2 + fxrand() * 5)
parameters.slabWidthY = Math.floor(2 + fxrand() * 5)
parameters.floorOffset = 0
parameters.floorToFloorHeight= 0.15 + fxrand() * 2
parameters.columnSpacing = 0.3 + fxrand() * 0.85
parameters.edgeOffset = parameters.slabWidthY/2 - parameters.columnSpacing
parameters.widthX = parameters.slabWidthX - parameters.edgeOffset/4
parameters.widthY = parameters.slabWidthY - parameters.edgeOffset/4
parameters.countX = parameters.widthX / parameters.columnSpacing
parameters.countY = parameters.widthY / parameters.columnSpacing

let slabsArray = []

const generateBuilding = () => {
    /**
     * Geometry 
     */
    // Slab Init
    const slabs = new THREE.Group()
    const slabGeometry = new THREE.BoxGeometry(parameters.slabWidthX, 0.03, parameters.slabWidthY, 128, 128, 128)
    scene.add(slabs)

    for(let i = 0; i < parameters.floorCount; i++){
        const slab = new THREE.Mesh(
            slabGeometry,
            slabMaterial
        )
        slab.geometry.setAttribute('uv2', new THREE.BufferAttribute(slab.geometry.attributes.uv.array,2))
        slab.position.set(0,parameters.floorOffset,0)
        slabs.add(slab)
        slab.castShadow = true
        slab.receiveShadow = true
        slabsArray.push(slab)
        parameters.floorOffset+=parameters.floorToFloorHeight;
    }

    // Column Init
    const testGeoGroup = new THREE.Group()
    const testGeo = new THREE.BoxGeometry(0.05, parameters.floorToFloorHeight * parameters.floorCount, 0.05, 128, 128, 128)
    scene.add(testGeoGroup)

    for(let x = 0; x <= parameters.countX; x++){
        for(let y = 0; y <= parameters.countY; y++){
            const testBox = new THREE.Mesh(testGeo, columnMaterial)
            testBox.geometry.setAttribute('uv2', new THREE.BufferAttribute(testBox.geometry.attributes.uv.array,2))
            const posX = (x/parameters.countX) * parameters.widthX - parameters.widthX / 2
            const posY = (y/parameters.countY) * parameters.widthY - parameters.widthY / 2
            testBox.position.set(posX, ((parameters.floorToFloorHeight * parameters.floorCount)/2) - parameters.floorToFloorHeight, posY)
            testGeoGroup.add(testBox)
            testBox.castShadow = true
        }
    }
}

generateBuilding()

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
 * Camera
 */
// Base camera
// Camera target
var targetIndex = Math.floor(fxrand() * (slabsArray.length - 2))

const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4.5
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
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)
scene.add(ambientLight)

// Directional light
var dLightXPos = 25
var dLightYPos = 8

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75)
directionalLight.position.set(dLightXPos, dLightYPos, dLightZPos)
scene.add(directionalLight)
directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
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
controls.enabled = false
controls.enableDamping = true

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

    // camera.position.x = Math.cos(elapsedTime) * 10
    // camera.position.z = Math.sin(elapsedTime) * 10
    // camera.position.y = Math.sin(elapsedTime) * 1.5

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