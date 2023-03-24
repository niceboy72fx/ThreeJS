import * as THREE from "three"
import { MeshLambertMaterial } from "three"
import { GUI } from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

scene.background = new THREE.Color(0xffffff)

camera.position.set(0,0,3)

const light = new THREE.PointLight(0xffffffff, 1);
light.position.set(255,255,255)
scene.add(light)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth , window.innerHeight)
document.body.appendChild(renderer.domElement)
new OrbitControls(camera, renderer.domElement)

const boxGeometry = new THREE.BoxGeometry()
const sphereGeometry = new THREE.SphereGeometry()
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0)
const planeGeometry = new THREE.PlaneGeometry()
const torusKnotGeometry = new THREE.TorusKnotGeometry()

const material = new THREE.MeshLambertMaterial()

const cube = new THREE.Mesh(boxGeometry, material)
cube.position.x = 5
scene.add(cube)

const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = 3
scene.add(sphere)

const icosahedron = new THREE.Mesh(icosahedronGeometry, material)
icosahedron.position.x = 0
scene.add(icosahedron)

const plane = new THREE.Mesh(planeGeometry, material)
plane.position.x = -2
scene.add(plane)

const torusKnot = new THREE.Mesh(torusKnotGeometry, material)
torusKnot.position.x = -5
scene.add(torusKnot)

function render() {
    renderer.render(scene,camera)
}

const stats =  Stats()

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function updateMaterial() {
   material.side = Number(material.side)
   material.combine = Number(material.combine)
   material.needsUpdate = true
}

const options = {
    side : {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide,
    },
    combine : {
        MultiplyOperation: THREE.MultiplyOperation,
        MixOperation: THREE.MixOperation,
        AddOperation: THREE.AddOperation,
    }
}
// import image 
const image = new THREE.TextureLoader().load('grid.jpg')
material.map = image

//---------------------debug------------------------------------------------
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


const data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
}

const meshLambertMaterialFolder = gui.addFolder('THREE.MeshLambertMaterial')

meshLambertMaterialFolder.addColor(data, 'color').onChange(() => {
    material.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
meshLambertMaterialFolder.addColor(data, 'emissive').onChange(() => {
    material.emissive.setHex(
        Number(data.emissive.toString().replace('#', '0x'))
    )
})
meshLambertMaterialFolder.add(material, 'wireframe')
meshLambertMaterialFolder.add(material, 'wireframeLinewidth', 0, 10)
//meshLambertMaterialFolder.add(material, 'flatShading').onChange(() => updateMaterial())
meshLambertMaterialFolder
    .add(material, 'combine', options.combine)
    .onChange(() => updateMaterial())
meshLambertMaterialFolder.add(material, 'reflectivity', 0, 1)
meshLambertMaterialFolder.add(material, 'refractionRatio', 0, 1)
meshLambertMaterialFolder.open()

//---------------------render--------------------------------
function animate() {
    requestAnimationFrame(animate)

    render()

    stats.update()
}
animate()