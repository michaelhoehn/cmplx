import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

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
const scene = new THREE.Scene()
scene.background = new THREE.Color('0xffffff') // add bg colors
scene.add(helper)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(25, 8, 4)
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

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial({
    color: 'white'
})
material.roughness = 0.7

/**
 * Objects
 */
const groundPlaneGeo = new THREE.PlaneGeometry(50,50,50)
const groundPlaneMesh = new THREE.Mesh(groundPlaneGeo, material)
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
    const slabGeometry = new THREE.BoxGeometry(parameters.slabWidthX, 0.03, parameters.slabWidthY)
    scene.add(slabs)

    for(let i = 0; i < parameters.floorCount; i++){
        const slab = new THREE.Mesh(
            slabGeometry,
            material
        )
        slab.position.set(0,parameters.floorOffset,0)
        slabs.add(slab)
        slab.castShadow = true
        slab.receiveShadow = true
        slabsArray.push(slab)
        parameters.floorOffset+=parameters.floorToFloorHeight;
    }

    // Column Init
    const testGeoGroup = new THREE.Group()
    const testGeo = new THREE.BoxGeometry(0.05, parameters.floorToFloorHeight * parameters.floorCount, 0.05)
    scene.add(testGeoGroup)

    for(let x = 0; x <= parameters.countX; x++){
        for(let y = 0; y <= parameters.countY; y++){
            const testBox = new THREE.Mesh(testGeo, material)
            const posX = (x/parameters.countX) * parameters.widthX - parameters.widthX / 2
            const posY = (y/parameters.countY) * parameters.widthY - parameters.widthY / 2
            testBox.position.set(posX, ((parameters.floorToFloorHeight * parameters.floorCount)/2) - parameters.floorToFloorHeight, posY)
            testGeoGroup.add(testBox)
            testBox.castShadow = true
        }
    }
}

generateBuilding()

console.log(slabsArray)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

if(keyTarget <= 0.5) {
    targetXShift = 2
} else {
    targetXShift = -2
}

const camTargetX = slabsArray[targetIndex].position.x + targetXShift
const camTargetY = slabsArray[targetIndex].position.y + targetYShift
const camTargetZ = slabsArray[targetIndex].position.z + targetZShift
const camTargetVector = new THREE.Vector3(camTargetX,camTargetY,camTargetZ)

// target debug
console.log(camTargetX)

// GUI Controls
const folder0 = gui.addFolder('Building Controls')
const folder1 = gui.addFolder('Lighting Controls')
const folder2 = gui.addFolder('Camera Controls')
// camera controls
folder2.add(camera.position, 'x').min(-50).max(50).step(0.001).name('camX')
folder2.add(camera.position, 'y').min(-50).max(50).step(0.001).name('camY')
folder2.add(camera.position, 'z').min(-50).max(50).step(0.001).name('camZ')
folder2.add(camTargetVector, 'x').min(-50).max(50).step(0.001).name('targetX')
folder2.add(camTargetVector, 'y').min(-50).max(50).step(0.001).name('targetY')
folder2.add(camTargetVector, 'z').min(-50).max(50).step(0.001).name('targetZ')

// building controls
// folder0.add(parameters, 'floorCount').min(0).max(100).step(1).onFinishChange(generateBuilding)
folder0.add(material, 'metalness').min(0).max(1).step(0.001)
folder0.add(material, 'roughness').min(0).max(1).step(0.001)
// lighting controls
folder1.add(directionalLight.position, 'x').min(- 50).max(50).step(0.001).name('dLight X')
folder1.add(directionalLight.position, 'y').min(- 50).max(50).step(0.001).name('dLight Y')
folder1.add(directionalLight.position, 'z').min(- 50).max(50).step(0.001).name('dLight Z')
folder1.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('aLight intensity')
folder1.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('dLight intensity')

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
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()