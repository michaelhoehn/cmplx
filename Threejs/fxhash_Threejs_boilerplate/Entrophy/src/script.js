import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Camera } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const helper = new THREE.AxesHelper(5)


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.add(helper)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)
directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 8
// directionalLight.shadow.radius = 10

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */

// Slab Parameters
let floorCount = 10
let slabWidthX = 2
let slabWidthY = 1
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

// Column Parameters
let columnX = 10
let columnY = 5
let columnXSpacing = 0.2 // this needs to be a calculation from the slab dimension
let columnYSpacing = 0.2
let placementOffset = 0
let columnOffset = -slabWidthX/2 + placementOffset

// Column Init
const columns = new THREE.Group()
const columnGeometry = new THREE.BoxGeometry(0.01, floorToFloorHeight * floorCount, 0.01)
scene.add(columns)

for(let i = 0; i < columnX; i++){
    const column = new THREE.Mesh(
        columnGeometry,
        material   
    )
    column.position.set(columnOffset, ((floorToFloorHeight * floorCount)/2) - floorToFloorHeight, 0)
    columnOffset+=columnXSpacing
    column.castShadow = true
    columns.add(column)
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

// Camera loction finding 
gui.add(camera.position, 'x').min(0).max(10).step(0.001)
gui.add(camera.position, 'y').min(0).max(10).step(0.001)
gui.add(camera.position, 'z').min(0).max(10).step(0.001)

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