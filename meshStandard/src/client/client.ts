import * as THREE from 'three'
import { GUI } from 'dat.gui'
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
import Stats from 'three/examples/jsm/libs/stats.module'
import { BackSide, BoxGeometry, DoubleSide, FrontSide, IcosahedronGeometry, Mesh, MeshStandardMaterial, PlaneGeometry, SphereGeometry, Texture, TextureLoader, TorusGeometry } from 'three';

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight(0xffffff,2);
light.position.set(10,10,10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

camera.position.set(0,0,3)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera , renderer.domElement)

const boxGeometry = new BoxGeometry()
const sphereGeometry = new SphereGeometry()
const icosahedronGeometry = new IcosahedronGeometry()
const planeGeometry = new PlaneGeometry()
const torusGeometry = new TorusGeometry()

const material = new MeshStandardMaterial()

const image = new TextureLoader().load('grid.jpg')
material.map = image

const cube = new Mesh(boxGeometry, material)
cube.position.set(3,0,0)
scene.add(cube)
const sphere = new Mesh(sphereGeometry, material)
sphere.position.set(5,0,0)
scene.add(sphere)
const icosahedron = new Mesh(icosahedronGeometry, material)
icosahedron.position.set(0,0,0)
scene.add(icosahedron)
const plane = new Mesh(planeGeometry, material)
plane.position.set(-2,0,0)
scene.add(plane)
const torusKnot = new Mesh(torusGeometry, material)
torusKnot.position.set(-5,0,0)
scene.add(torusKnot)

function render () {
	renderer.render(scene, camera)
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resze' , onWindowResize , false )

const stats = Stats()
document.body.appendChild(stats.dom)

const options = {
	side : {
		FrontSide : FrontSide,
		BackSide : BackSide,
		DoubleSide : DoubleSide,
	}
}

///----------------------Debug------------------------------------------------
const gui = new GUI()
const materialFolder = gui.addFolder('THREE.Material')
materialFolder.add(material, 'transparent').onChange(() => {
	material.needsUpdate
})

function updateMaterial() {
    material.side = Number(material.side)
    material.needsUpdate = true
}


materialFolder.add(material, 'opacity' , 0 , 1 , 0.01)
// materialFolder.add(material, 'depthtest')
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

const meshStandardMaterialFolder = gui.addFolder('THREE.MeshStandardMaterial')

meshStandardMaterialFolder.addColor(data, 'color').onChange(() => {
    material.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
meshStandardMaterialFolder.addColor(data, 'emissive').onChange(() => {
    material.emissive.setHex(
        Number(data.emissive.toString().replace('#', '0x'))
    )
})
meshStandardMaterialFolder.add(material, 'wireframe')
meshStandardMaterialFolder
    .add(material, 'flatShading')
    .onChange(() => updateMaterial())
// meshStandardMaterialFolder.add(material, 'reflectivity', 0, 1)
// meshStandardMaterialFolder.add(material, 'shininess', 0, 1024)

    //----------------------------------------------------------------
function animate() {
    requestAnimationFrame(animate)

    render()

    stats.update()
}

animate()