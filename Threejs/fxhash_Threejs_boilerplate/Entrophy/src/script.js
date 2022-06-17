import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Camera, TetrahedronBufferGeometry } from 'three'

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
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7

/**
 * Objects
 */

const parameters = {}
parameters.floorCount = 20
parameters.slabWidthX = 2
parameters.slabWidthY = 4
parameters.floorOffset = 0
parameters.floorToFloorHeight= 0.25
parameters.columnSpacing = 0.25
parameters.edgeOffset = parameters.slabWidthY/2 - parameters.columnSpacing
parameters.widthX = parameters.slabWidthX - parameters.edgeOffset/4
parameters.widthY = parameters.slabWidthY - parameters.edgeOffset/4
parameters.countX = parameters.widthX / parameters.columnSpacing
parameters.countY = parameters.widthY / parameters.columnSpacing

const generateBuilding = () => {
    /**
     * Geometry 
     */
}

generateBuilding()

// Slab Parameters
let floorCount = 20
let slabWidthX = 2
let slabWidthY = 4
let floorOffset = 0
let floorToFloorHeight = 0.25

// Slab Init
const slabs = new THREE.Group()
const slabGeometry = new THREE.BoxGeometry(slabWidthX, 0.02, slabWidthY)
scene.add(slabs)

for(let i = 0; i < floorCount; i++){
    const slab = new THREE.Mesh(
        slabGeometry,
        material
    )
    slab.position.set(0,floorOffset,0)
    slabs.add(slab)
    slab.castShadow = true
    slab.receiveShadow = true
    floorOffset+=floorToFloorHeight;
}

// Column Init
const testGeoGroup = new THREE.Group()
const testGeo = new THREE.BoxGeometry(0.01, floorToFloorHeight * floorCount, 0.01)
scene.add(testGeoGroup)

let columnSpacing = 0.25
let edgeOffset = slabWidthY/2 - columnSpacing
let widthX = slabWidthX - edgeOffset/4
let widthY = slabWidthY - edgeOffset/4
let countX = widthX / columnSpacing
let countY = widthY / columnSpacing

for(let x = 0; x <= countX; x++){
    for(let y = 0; y <= countY; y++){
        const testBox = new THREE.Mesh(testGeo, material)
        const posX = (x/countX) * widthX - widthX / 2
        const posY = (y/countY) * widthY - widthY / 2
        testBox.position.set(posX, ((floorToFloorHeight * floorCount)/2) - floorToFloorHeight, posY)
        testGeoGroup.add(testBox)
        testBox.castShadow = true
    }
}

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
const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3.6
camera.position.y = 0.5
camera.position.z = 2.13
scene.add(camera)

// Camera target
// const camTarget = slabs[slabs.length - 1].position // this is always pointed to the top slab
// may want to point at random slabs 
// also need to shift the target away from the centre for composition purposes

// GUI Controls
const folder0 = gui.addFolder('Building Controls')
const folder1 = gui.addFolder('Lighting Controls')
const folder2 = gui.addFolder('Camera Controls')
// camera controls
folder2.add(camera.position, 'x').min(0).max(10).step(0.001).name('camX')
folder2.add(camera.position, 'y').min(0).max(10).step(0.001).name('camY')
folder2.add(camera.position, 'z').min(0).max(10).step(0.001).name('camZ')
// building controls
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
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
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

    // Update camera
    //camera.lookAt(camTarget)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()