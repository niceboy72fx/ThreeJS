import  Stats  from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from "three"
import { GUI } from 'dat.gui';
import { AxesHelper, BackSide, CubeTexture, CubeTextureLoader, DoubleSide, FrontSide, Mesh, MeshPhongMaterial, MeshPhysicalMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Scene, TextureLoader, WebGLRenderer } from 'three';

const scene = new Scene()
scene.add(new AxesHelper(5))

const light = new PointLight(0xffffff,2)
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
control.screenSpacePanning = true // ko the zoom xuyen qua vat the

const planeGeometry : PlaneGeometry = new PlaneGeometry(3.6, 1.8,360,100) // dung de chỉnh size vật thể

const material : MeshPhongMaterial = new MeshPhongMaterial()

const texture = new TextureLoader().load('images/gebco_bathy.5400x2700_8bit.jpg')
material.displacementMap = texture


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
}

//----------------------------------------------------------------
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
    // specular: material.specular.getHex(),
}

const meshPhongMaterialFolder = gui.addFolder('THREE.meshPhongMaterialFolder')
meshPhongMaterialFolder.add(material, 'wireframe')
meshPhongMaterialFolder
    .add(material, 'flatShading')
    .onChange(() => updateMaterial())
meshPhongMaterialFolder.add(material, 'shininess', 0, 1)
meshPhongMaterialFolder.add(material, 'wireframe')
meshPhongMaterialFolder.add(material, 'reflectivity',0,1)
meshPhongMaterialFolder.add(material, 'refractionRatio',0,1)
meshPhongMaterialFolder.add(material, 'displacementScale',0,1,0.01)
meshPhongMaterialFolder.add(material, 'displacementBias',-1,1,0.01)
// meshPhongMaterialFolder.add(material, 'metainess',0,1)
meshPhongMaterialFolder.open()

const planeData = {
    width: 3.6,
    height: 1.8,
    widthSegments: 360,
    heightSegments: 180,
}

function regeneratePlaneGeometry() {
    let newGeometry = new THREE.PlaneGeometry(
        planeData.width, planeData.height, planeData.widthSegments, planeData.heightSegments
    )
    plane.geometry.dispose()
    plane.geometry = newGeometry
}

const planePropertiesFolder = gui.addFolder('PlaneGeometry')
planePropertiesFolder
    .add(planeData, 'widthSegments', 1, 360)
    .onChange(regeneratePlaneGeometry)
planePropertiesFolder
    .add(planeData, 'heightSegments', 1, 180)
    .onChange(regeneratePlaneGeometry)
planePropertiesFolder.open()

//----------------------------------------------------------------
function updateMaterial() {
    material.side = Number(material.side)}

function animate() {
    requestAnimationFrame(animate)

    render()

}

animate()