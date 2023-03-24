import  Stats  from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from "three"
import { GUI } from 'dat.gui';
import { AxesHelper, BackSide, CubeTexture, CubeTextureLoader, DoubleSide, FrontSide, Mesh, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Scene, TextureLoader, WebGLRenderer } from 'three';

const scene = new Scene()
scene.add(new AxesHelper(5))

const light = new PointLight(0xffffff,1)
light.position.set(0,5,10)
scene.add(light)

const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.set(0,0,3)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera , renderer.domElement)

const planeGeometry = new PlaneGeometry()

const material = new MeshPhongMaterial()

const texture = new TextureLoader().load('images/worldColour.5400x2700.jpg')
material.map = texture

const plane = new Mesh(planeGeometry, material)
scene.add(plane)

function render(){
    renderer.render(scene,camera)
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


const options = {
    side: {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide,
    },
    combine: {
        MultiplyOperation: THREE.MultiplyOperation,
        MixOperation: THREE.MixOperation,
        AddOperation: THREE.AddOperation,
    }
}


const gui = new GUI()

const materialFolder = gui.addFolder('THREE.Material')
materialFolder.add(material, 'transparent')
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
//materialFolder.open()

const data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
    specular: material.specular.getHex(),
}

const meshPhongMaterialFolder = gui.addFolder('THREE.MeshPhongMaterial')

meshPhongMaterialFolder.addColor(data, 'color').onChange(() => {
    material.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
meshPhongMaterialFolder.addColor(data, 'emissive').onChange(() => {
    material.emissive.setHex(
        Number(data.emissive.toString().replace('#', '0x'))
    )
})
meshPhongMaterialFolder.addColor(data, 'specular').onChange(() => {
    material.specular.setHex(
        Number(data.specular.toString().replace('#', '0x'))
    )
})
meshPhongMaterialFolder.add(material, 'shininess', 0, 1024)
meshPhongMaterialFolder.add(material, 'wireframe')
meshPhongMaterialFolder
    .add(material, 'flatShading')
    .onChange(() => updateMaterial())
meshPhongMaterialFolder
    .add(material, 'combine', options.combine)
    .onChange(() => updateMaterial())
meshPhongMaterialFolder.add(material, 'reflectivity', 0, 1)
meshPhongMaterialFolder.open()

function updateMaterial() {
    material.side = Number(material.side)
    material.combine = Number(material.combine)
}

function animate() {
    requestAnimationFrame(animate)

    render()

}

animate()