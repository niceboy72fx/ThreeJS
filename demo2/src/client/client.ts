import * as THREE from 'three'
import { BackSide, CubeTextureLoader, Mesh, MeshBasicMaterial, PlaneGeometry, PMREMGenerator, PointLight, TextureFilter, TextureLoader } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(
    78,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(45,2,2)
camera.rotateY(Math.PI /2)

const material2 = new MeshBasicMaterial()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const pmremGenerator = new THREE.PMREMGenerator(renderer)
const backgroundImage = new TextureLoader().load('background/sky.jpg')
scene.background = backgroundImage


const menuPanel = document.getElementById('menuPanel') as HTMLDivElement
const startButton = document.getElementById('startButton') as HTMLInputElement
startButton.addEventListener(
    'click',
    function () {
        controls.lock()
    },
    false
)

const controls = new PointerLockControls(camera, renderer.domElement)
controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))

//----------------------------------------------------------------
const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50)
const material = new THREE.MeshBasicMaterial({
     visible:false,
})

const plane = new THREE.Mesh(planeGeometry, material)
plane.rotateX(-Math.PI / 2)
scene.add(plane)

//----------------------------------------------------------------
const lightMuseum = new PointLight(0xffffff,1)
const lightMuseum1 = new PointLight(0xffffff,1)
const lightMuseum2 = new PointLight(0xffffff,1)
lightMuseum.position.set(1,1,1)
lightMuseum1.position.set(15,8,4)
lightMuseum2.position.set(15,8,4)
const roomMuseum = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
   root.add(lightMuseum1)
   root.position.set(0,0,15)
   scene.add(root)
})

const roomMuseum2 = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
    root.position.set(15,0,15)
    root.add(lightMuseum2)
   scene.add(root)
})

const side = { backside : BackSide}

const roomMuseum3 = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
   root.add(lightMuseum1)
   root.position.set(1,0,-10)
   root.rotation.set(0,15.7,0)
   scene.add(root)
})

const roomMuseum4 = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
    root.position.set(16,0,-9.9)
       root.rotation.set(0,15.7,0)
    root.add(lightMuseum2)
   scene.add(root)
})

//----------------------------------------------------------------

//----------------------------------------------------------------
//Floors

// const texture = new TextureLoader().load('object/floor/Textures/Material _25_Base_Color.png');

const floorMuseum = new FBXLoader().load('object/floor/Floor.FBX', function  (sceneObj) {
    sceneObj.position.set(1.9,0,2)
    sceneObj.scale.setScalar(1/13)
    sceneObj.scale.x = 0.327
    sceneObj.add(lightMuseum)
    sceneObj.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(162, 44, 31)');
                }
            }
        })
    scene.add(sceneObj)
})


const floorMuseum2 = new FBXLoader().load('object/floor/Floor.FBX', function  (sceneObj) {
    sceneObj.position.set(28,0,2)
    sceneObj.scale.setScalar(1/8)
    sceneObj.scale.x = 0.4
    sceneObj.add(lightMuseum)
    sceneObj.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(162, 44, 31)');
                }
            }
        })
    scene.add(sceneObj)
})


//----------------------------------------------------------------
// Ceiling 
const ceilingMuseum = new FBXLoader().load('object/floor/Floor.FBX', function (sceneObj) {
     sceneObj.scale.setScalar(1/13)
    sceneObj.scale.x = 0.33
    sceneObj.position.set(2.1,5.4,2)
    sceneObj.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(0, 0, 0)');
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).side = BackSide
                    
                }
            }
        })
    scene.add(sceneObj)
})

const ceilingMuseum2 = new FBXLoader().load('object/floor/Floor.FBX', function  (sceneObj) {
    sceneObj.position.set(28,5.5,2)
    sceneObj.scale.setScalar(1/8)
    sceneObj.scale.x = 0.4
    sceneObj.add(lightMuseum)
    sceneObj.traverse(function (child) {
        const backside = BackSide
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(0,0,0)');
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).side = backside
                }
            }
        })
    scene.add(sceneObj)
})


///----------------------------------------------------------------
//Wall
const backside = BackSide
const materialWall = new THREE.MeshBasicMaterial()
const materialWallBack = new THREE.MeshBasicMaterial()
materialWall.color = new THREE.Color('rgb(0,0,0)')
materialWallBack.color = new THREE.Color('rgb(0,0,0)')
materialWallBack.side = backside
const wall = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wall.position.x = -7.2
wall.position.y = 4
wall.rotation.y = 20.42
wall.scale.x = 3
scene.add(wall)

const wallBack = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallBack.position.x = -7.2
wallBack.position.y = 4
wallBack.rotation.y = 20.42
wallBack.scale.x = 3
scene.add(wallBack)

const wallLobby1 = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wallLobby1.position.x = 53
wallLobby1.position.y = 2.5
wallLobby1.position.z = 2.55
wallLobby1.rotation.y = 11
wallLobby1.scale.x = 2.1
wallLobby1.scale.y = 0.6
scene.add(wallLobby1)

const wallLobby1b = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallLobby1b.position.x = 53
wallLobby1b.position.y = 2.5
wallLobby1b.position.z = 2.55
wallLobby1b.rotation.y = 11
wallLobby1b.scale.x = 2.1
wallLobby1b.scale.y = 0.6
scene.add(wallLobby1b)

//-----------------------------
const wallLobby2 = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wallLobby2.position.x = 38.1
wallLobby2.position.y = 2.5
wallLobby2.position.z = 13
wallLobby2.rotation.y = 3.14
wallLobby2.scale.x = 3
wallLobby2.scale.y = 0.6
scene.add(wallLobby2)

const wallLobby2b = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallLobby2b.position.x = 38.1
wallLobby2b.position.y = 2.5
wallLobby2b.position.z = 13
wallLobby2b.rotation.y = 3.14
wallLobby2b.scale.x = 3
wallLobby2b.scale.y = 0.6
scene.add(wallLobby2b)
//-------------------------------------
const wallLobby3 = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wallLobby3.position.x = 38.1
wallLobby3.position.y = 2.5
wallLobby3.position.z = -13
wallLobby3.rotation.y = 3.14
wallLobby3.scale.x = 3
wallLobby3.scale.y = 0.6
scene.add(wallLobby3)

const wallLobby3b = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallLobby3b.position.x = 38.1
wallLobby3b.position.y = 2.5
wallLobby3b.position.z = -8
wallLobby3b.rotation.y = 3.14
wallLobby3b.scale.x = 3
wallLobby3b.scale.y = 0.6
scene.add(wallLobby3b)
//----------------------------------------------------------------
const onKeyDown = function (event: KeyboardEvent) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(0.25)
            break
        case 'KeyA':
            controls.moveRight(-0.25)
            break
        case 'KeyS':
            controls.moveForward(-0.25)
            break
        case 'KeyD':
            controls.moveRight(0.25)
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
