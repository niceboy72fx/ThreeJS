import  Stats  from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from "three"
import { GUI } from 'dat.gui';
import { AxesHelper, BackSide, Camera, Color, CubeTexture, CubeTextureLoader, DoubleSide, FrontSide, Mesh, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Scene, TextureLoader, WebGLRenderer } from 'three';

const scene = new Scene()
const loader = new GLTFLoader();
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.set(0,0,3)

loader.load('Material/scene.gltf' , function(glb){
    console.log(glb)
    const root = glb.scene;
    scene.add(root)
},
function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + '% loaded')
},
function(err){
    console.log(err)
})

loader.load('Material/scene.gltf' , function(glb){
    console.log(glb)
    const root = glb.scene;
    root.position.x = 15
    scene.add(root)
},
function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + '% loaded')
},
function(err){
    console.log(err)
})

// const modelImage = new TextureLoader().load("images/Cube.001_BAKED_baseColor.png")
// scene.map = modelImage

const light = new PointLight(0xffffff,2)
light.position.set(0,10,20)
scene.add(light)

scene.background = new Color(0xffffff)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth , window.innerHeight)
document.body.appendChild(renderer.domElement)

 new OrbitControls(camera , renderer.domElement)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function render() {
    renderer.render(scene,camera)
}

function animate() {
    requestAnimationFrame(animate)
    render()
}

animate()