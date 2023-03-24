import * as THREE from "three"
import { MeshDepthMaterial } from "three"
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from "dat.gui"
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    70,
    15/4,
    0.1,
    1000
)

camera.position.set(0,0,3)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
new OrbitControls(camera, renderer.domElement)
///------------------------Color------------------------
const black = new THREE.Color("rgb(0,0,0)")
const green = new THREE.Color("rgb(43, 138, 62)")
const red = new THREE.Color("rgb(255,0,76)")

//----------------------------------------------------------------

const boxGeometry = new THREE.BoxGeometry()
const sphereGeometry = new THREE.SphereGeometry()
const icosahedronGeometry = new THREE.IcosahedronGeometry()
const planeGeometry = new THREE.PlaneGeometry()
const torusKnotGeometry = new THREE.TorusGeometry()

// ------- -------------Material----------------------------------
const material = new THREE.MeshBasicMaterial()

// ---------------------import image -----------------------------
const image = new THREE.TextureLoader().load('grid.jpg')
material.map = image 

// co the import nhieun anh khac nhau cung 1 luc voi THREE.CubeTextureLoader()

const envImage = new THREE.CubeTextureLoader().load(['grid.jpg','image.jpg'])
//----------------------------------------------------------------

// const cube =  THREE.CubeRefractionMapping

//--------------------MESH------------------------------------------------
//cube
const cube = new THREE.Mesh(boxGeometry, material)
cube.position.x = 5
scene.add(cube)
//sphere
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = 3
scene.add(sphere)
//icoahedron
const icosahedron = new THREE.Mesh(icosahedronGeometry, material)
icosahedron.position.x = 0
scene.add(icosahedron)
//plane
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.x = -2
scene.add(plane)
//torusKnot
const torusKnot = new THREE.Mesh(torusKnotGeometry, material)
torusKnot.position.x = -5
scene.add(torusKnot)

function render () {
    renderer.render(scene, camera)
}

const stats =  Stats()
document.body.appendChild(stats.dom)

//----------------------------------------------------------------
const options = {
    side: {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide
    },
    combine : {
        MultiplyOperation: THREE.MultiplyOperation,
        MixOperation: THREE.MixOperation,
        AddOperation: THREE.AddOperation
    }
}

function updateMaterial() {
    material.side = Number(material.side)
    material.combine = Number(material.combine)
    material.needsUpdate = true
}

const gui = new GUI()
const materialFolder = gui.addFolder('THREE.Material')
materialFolder.add(material, 'transparent').onChange(() => material.needsUpdate = true)
materialFolder.add(material, 'opacity', 0, 1, 0.01)
materialFolder.add(material, 'depthTest')
materialFolder.add(material, 'depthWrite')
materialFolder
    .add(material, 'alphaTest', 0, 1, 0.01)
    .onChange(() => updateMaterial())
materialFolder.add(material, 'visible')
materialFolder
    .add(material, 'side', options.side)
    .onChange(() => updateMaterial())
materialFolder.open()

//--------------------------------------
const data = {
    color: material.color.getHex(),
}
const meshBasicMaterialFolder = gui.addFolder('THREE.MeshBasicMaterial')
meshBasicMaterialFolder.addColor(data, 'color').onChange(() => {
    material.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
meshBasicMaterialFolder.add(material, 'wireframe')
//meshBasicMaterialFolder.add(material, 'wireframeLinewidth', 0, 10)
meshBasicMaterialFolder
    .add(material, 'combine', options.combine)
    .onChange(() => updateMaterial())
meshBasicMaterialFolder.add(material, 'reflectivity', 0, 1)
meshBasicMaterialFolder.add(material, 'refractionRatio', 0, 1)
meshBasicMaterialFolder.open()

//----------------------------------------------------------------
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    render()

    stats.update()
}


animate()