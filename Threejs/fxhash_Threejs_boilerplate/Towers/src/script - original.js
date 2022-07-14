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
helper.visible = true

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('White')
scene.add(helper)

/**
 * Sizes
 */
 const sizes = {
    // width: window.innerWidth,
    // height: window.innerHeight
    width: 1000,
    height: 1000
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.set(20, 40, - 10)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 50).max(50).step(0.001)
gui.add(directionalLight.position, 'y').min(- 50).max(50).step(0.001)
gui.add(directionalLight.position, 'z').min(- 50).max(50).step(0.001)
scene.add(directionalLight)
directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.top = 100
directionalLight.shadow.camera.bottom = -100
directionalLight.shadow.camera.right = 100
directionalLight.shadow.camera.left = -100
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 100
// directionalLight.shadow.radius = 10

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)

/**
 * Materials
 */
const solidMaterial = new THREE.MeshStandardMaterial( {
    color: 'red'
})

const debugMaterial = new THREE.MeshStandardMaterial( {
    color: 'lightGray'
})

/**
 * Objects
 */

// Ground Plane
const groundPlaneGeo = new THREE.PlaneGeometry(5000, 5000)
const groundPlaneMesh = new THREE.Mesh(groundPlaneGeo, debugMaterial)
groundPlaneMesh.rotation.x = - Math.PI * 0.5
groundPlaneMesh.position.y = 0
groundPlaneMesh.receiveShadow = true
scene.add(groundPlaneMesh)

// Building variables <--- to be moved inside the for loop based on building count and position
var buildingCountProbability = fxrand()
var randomFloorCount = Math.floor(50 + fxrand() * 200)
//var floorToFloorHeight = 0.20 + fxrand() * 0.35
var slabThickness = 0.03
var buildingWidth = Math.floor(2 + fxrand() * 10)
var buildingDepth = Math.floor(2 + fxrand() * 10)
var floorOffset = 0
var mainFocusHeight

// Slab Geometry
let slabsArray = []
const slabs = new THREE.Group()
const slabGeometry = new THREE.BoxGeometry(buildingWidth, slabThickness, buildingDepth)
scene.add(slabs)

const generateBuilding = (xPos, zPos, groundLevel, floorCount, floorToFloorHeight) => {

    var buildingHeight = (floorCount * floorToFloorHeight) - floorToFloorHeight
    const coreGeometry = new THREE.BoxGeometry(0.2, buildingHeight, 0.2)
    const coreMesh = new THREE.Mesh(coreGeometry, solidMaterial)
    coreMesh.position.set(xPos, buildingHeight / 2, zPos)
    coreMesh.castShadow = true
    coreMesh.receiveShadow = true

    for(let i = 0; i < floorCount; i++){
        const slab = new THREE.Mesh(
            slabGeometry,
            solidMaterial
        )
        slab.position.set(xPos, groundLevel, zPos)
        slabs.add(slab)
        slab.castShadow = true
        slab.receiveShadow = true
        groundLevel += floorToFloorHeight
        slabsArray.push(slab)
    }
    scene.add(coreMesh)
    mainFocusHeight = buildingHeight
}

// <---- 
// if buildingCountProbability => add up to 4 buildings at different levels
// ----->

generateBuilding(0, 0, floorOffset, Math.floor(50 + fxrand() * 200), 0.20 + fxrand() * 0.35)
generateBuilding(5, 0, floorOffset, Math.floor(50 + fxrand() * 200), 0.20 + fxrand() * 0.35)
// generateBuilding(0, 5, floorOffset, Math.floor(50 + fxrand() * 200), 0.20 + fxrand() * 0.35)
// generateBuilding(5, 5, floorOffset, Math.floor(50 + fxrand() * 200), 0.20 + fxrand() * 0.35)

// Background Scene Buildings

let bgBuildingsCount = 500 + fxrand() * 5000

const bgMassings = new THREE.Group()
const massingMeshes = []
const massingPosY = []
const backgroundBuildings = new THREE.BoxGeometry(0.2, 0.2, 0.2)
const backgroundBuildingsMaterial = new THREE.MeshStandardMaterial({color: 'white'})

//backgroundBuildingsMaterial.metalness = 1
//backgroundBuildingsMaterial.roughness = 0
//backgroundBuildingsMaterial.envMap = environmentMapTexture
scene.add(bgMassings)

const generateBackgroundBuildings = () => {
    for (let i = 0; i < bgBuildingsCount; i++) {
        // random dims for each variable 
        let bgBuildingsWidth = 5 + fxrand() * 25
        let bgBuildingsHeight = 10 + fxrand() * 400
        let bgBuildingsDepth = 5 + fxrand() * 25

        const angle = fxrand() * - Math.PI      // Random angle
        const radius = 20 + fxrand() * 3000         // Random radius (min / max)
        const x = Math.cos(angle) * radius          // Get the x position using cosinus
        const z = Math.sin(angle) * radius          // Get the z position using sinus

        // Create the mesh
        const massing = new THREE.Mesh(backgroundBuildings, backgroundBuildingsMaterial)
        massing.castShadow = true
        massing.receiveShadow = true

        // Position
        massing.position.set(x, 0, z)    

        // Scale
        massing.scale.x = bgBuildingsDepth
        massing.scale.y = bgBuildingsHeight
        massing.scale.z = bgBuildingsWidth                          

        // Rotation
        massing.rotation.y = fxrand() * (Math.PI * 2)
        //massing.rotation.z = fxrand() * (Math.PI * 0.05)

        // Add to the graves container
        bgMassings.add(massing)

        // add to array
        massingMeshes.push(massing)
    }
}
generateBackgroundBuildings()

window.addEventListener('resize', () =>
{
    // Update sizes
    // sizes.width = window.innerWidth
    // sizes.height = window.innerHeight

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
// Camera Target
var targetIndex = Math.floor(slabsArray.length / 2)

// Base camera
const camera = new THREE.PerspectiveCamera(10, sizes.width / sizes.height, 0.1, 5000)
camera.position.x = (-500 + fxrand() * -50)
camera.position.y = 30 //slabsArray[targetIndex].position.y
camera.position.z = 500
scene.add(camera)

const camTargetX = 0//slabsArray[targetIndex].position.x
const camTargetY = 30//slabsArray[targetIndex].position.y
const camTargetZ = 0//slabsArray[targetIndex].position.z
const camTargetVector = new THREE.Vector3(camTargetX,camTargetY,camTargetZ)

// const cameraHelper = new THREE.CameraHelper(camera)
// cameraHelper.visible = true
// scene.add(cameraHelper)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// GUI Controls
const folder0 = gui.addFolder('Camera Controls')

// GUI Camera Controls
folder0.add(camera.position, 'x').min(-500).max(500).step(0.001).name('X')
folder0.add(camera.position, 'y').min(-500).max(500).step(0.001).name('Y')
folder0.add(camera.position, 'z').min(-100).max(1000).step(0.001).name('Z')

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
 * Fog
 */

 const fog = new THREE.Fog('white', 200, 1000)
 scene.fog = fog
 renderer.setClearColor('black')

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Update Camera
    camera.lookAt(camTargetVector)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()