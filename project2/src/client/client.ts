import * as THREE from "three"
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from "dat.gui"
import { Camera, RGBAFormat } from "three"


const scene = new THREE.Scene()


const camera  = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.z = 10

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const purpule = new THREE.Color(255, 0, 76)
const green = new THREE.Color("rgb(43, 138, 62)")

// scene.add(objectSquare)

function changeMaterial(){
    
}
//-----------------------------------------------------------
const img1 = new  THREE.TextureLoader().load('img.jpg') // dung de lay anh
const objectSquare  = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({
        // color: purpule,
        wireframe: false,
        map: img1  // dung de add anh vao 
    }),
)


objectSquare.position.set(2,0,0)
objectSquare.add(new THREE.AxesHelper(5)) 
//------------------------------------------------------------
const objectRound = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({
    color:green,
    wireframe: false
    
}))

objectRound.position.set(5,0,0)
objectRound.add(new THREE.AxesHelper(5)) 
//------------------------------------------------------------
const objectCicle = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({
    color:green,
    wireframe: false,
    transparent: true,
    opacity:1,
    depthTest:true
}))

// objectCicle.onChange( () => {console.log("mesh basic material changed")})

objectCicle.position.set(10,0,0) 
objectCicle.add(new THREE.AxesHelper(5)) 
//-------------------------MeshNormalMaterial--------------------------------------------------------
const objectSquareNormals = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
objectSquareNormals.position.set(0,0,2)

//--------------------------MeshLambertMaterial--------------------------------------------------------
const objectRoundLambert = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshLambertMaterial({
    color:green,
}))
objectRoundLambert.position.set(0,0,5)
//--------------------------MeshPhongMaterial--------------------------------------------------------
const objectRoundPhong = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshPhongMaterial())
objectRoundPhong.position.set(0,0,8)
//------------------------MeshStandardMaterial--------------------------------------------------------
const objectRoundStandard = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshStandardMaterial())
objectRoundStandard.position.set(0,2,0)
//------------------------MeshPhysicalMaterial--------------------------------------------------------
const objectRoundPhysical = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshPhysicalMaterial({
    map:img1
}))
objectRoundPhysical.position.set(0,5,0)
//------------------------MeshMatcapMaterial--------------------------------------------------------
const objectRoundMatcap = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshMatcapMaterial({
    map:img1
}))
objectRoundPhysical.position.set(0,0,10)
//-------------------------------------------------------------
scene.add(objectSquare)
scene.add(objectRound)
scene.add(objectCicle)
scene.add(objectSquareNormals)
scene.add(objectRoundLambert)
scene.add(objectRoundPhong)
scene.add(objectRoundStandard)
scene.add(objectRoundPhysical)
scene.add(objectRoundMatcap)
//-------------------------------------------------------------
scene.add(objectSquareNormals)
function render() {
    renderer.render(scene,camera)
}

// function onWindowSizeChanged() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

function runElement() {
    requestAnimationFrame(runElement)
    render()
}

// ------------------------------------lay hinh anh ----------------------------------------------------------------


// -------------------------------------debug objectSquere----------------------------------
// ham goi xem fps
const stats = Stats()
document.body.appendChild(stats.dom)

scene.add(new THREE.AxesHelper(5)) 

// ham goi gui
const gui = new GUI()
//
const round = gui.addFolder("objectRound")
//rotation
const roundRotation = round.addFolder("rotation")
roundRotation.add(objectRound.rotation,"x",0 ,Math.PI * 2)
roundRotation.add(objectRound.rotation,"y",0,Math.PI * 2)
roundRotation.add(objectRound.rotation,"z",0,Math.PI * 2)
//position
const roundposition = round.addFolder("position")
roundposition.add(objectRound.position,"x",0 ,Math.PI * 2)
roundposition.add(objectRound.position,"y",0,Math.PI * 2)
roundposition.add(objectRound.position,"z",0,Math.PI * 2)
//camera
const roundCamera = round.addFolder("camera")
roundCamera.add(camera.position,"x",0,Math.PI * 2)
roundCamera.add(camera.position,"y",0,Math.PI * 2)
roundCamera.add(camera.position,"z",0,Math.PI * 2)
// scale 
const scaleRound = round.addFolder("scale")
scaleRound.add(objectRound.scale,'x',0,Math.PI * 2)
scaleRound.add(objectRound.scale,'y',0,Math.PI * 2)
scaleRound.add(objectRound.scale,'z',0,Math.PI * 2)
//--------------square ----------------
const square = gui.addFolder("objectSquare")
//rotation
const squareRotation = square.addFolder("rotation")
squareRotation.add(objectSquare.rotation,"x",0 ,Math.PI * 2)
squareRotation.add(objectSquare.rotation,"y",0,Math.PI * 2)
squareRotation.add(objectSquare.rotation,"z",0,Math.PI * 2)
//position
const squarePosition = square.addFolder("position")
squarePosition.add(objectSquare.position,"x",0 ,Math.PI * 2)
squarePosition.add(objectSquare.position,"y",0,Math.PI * 2)
squarePosition.add(objectSquare.position,"z",0,Math.PI * 2)
//camera
const squareCamera = square.addFolder("camera")
squareCamera.add(camera.position,"x",0,Math.PI * 2)
squareCamera.add(camera.position,"y",0,Math.PI * 2)
squareCamera.add(camera.position,"z",0,Math.PI * 2)
// scale 
const scaleSquare= square.addFolder("scale")
scaleSquare.add(objectSquare.scale,'x',0,Math.PI * 2)
scaleSquare.add(objectSquare.scale,'y',0,Math.PI * 2)
scaleSquare.add(objectSquare.scale,'z',0,Math.PI * 2)

// reflectivify matrix image 
const reflectivifySquare = square.addFolder("reflectivify")
// reflectivifySquare.add()
//--------------circle ----------------
const circle = gui.addFolder("objectCircle")
//rotation
const circleRotation = circle.addFolder("rotation")
circleRotation.add(objectCicle.rotation,"x",0 ,Math.PI * 2)
circleRotation.add(objectCicle.rotation,"y",0,Math.PI * 2)
circleRotation.add(objectCicle.rotation,"z",0,Math.PI * 2)
//position
const circlePosition = circle.addFolder("position")
circlePosition.add(objectCicle.position,"x",0 ,Math.PI * 2)
circlePosition.add(objectCicle.position,"y",0,Math.PI * 2)
circlePosition.add(objectCicle.position,"z",0,Math.PI * 2)
//camera
const circleCamera = circle.addFolder("camera")
circleCamera.add(camera.position,"x",0,Math.PI * 2)
circleCamera.add(camera.position,"y",0,Math.PI * 2)
circleCamera.add(camera.position,"z",0,Math.PI * 2)
// scale 
const scaleCircle= circle.addFolder("scale")
scaleCircle.add(objectCicle.scale,'x',0,Math.PI * 2)
scaleCircle.add(objectCicle.scale,'y',0,Math.PI * 2)
scaleCircle.add(objectCicle.scale,'z',0,Math.PI * 2)
//---------------------------------------------
const squareNormal = gui.addFolder("objectSquareNormals")
//rotation
const squareNormalRotation = squareNormal.addFolder("rotation")
squareNormalRotation.add(objectSquareNormals.rotation,"x",0 ,Math.PI * 2)
squareNormalRotation.add(objectSquareNormals.rotation,"y",0,Math.PI * 2)
squareNormalRotation.add(objectSquareNormals.rotation,"z",0,Math.PI * 2)
//position
const  squareNormalPosition = squareNormal.addFolder("position")
squareNormalPosition.add(objectSquareNormals.position,"x",0 ,Math.PI * 2)
squareNormalPosition.add(objectSquareNormals.position,"y",0,Math.PI * 2)
squareNormalPosition.add(objectSquareNormals.position,"z",0,Math.PI * 2)
//camera
const squareNormalCamera = squareNormal.addFolder("camera")
squareNormalCamera.add(camera.position,"x",0,Math.PI * 2)
squareNormalCamera.add(camera.position,"y",0,Math.PI * 2)
squareNormalCamera.add(camera.position,"z",0,Math.PI * 2)
// scale 
const squareNormalScale= squareNormal.addFolder("scale")
squareNormalScale.add(objectSquareNormals.scale,'x',0,Math.PI * 2)
squareNormalScale.add(objectSquareNormals.scale,'y',0,Math.PI * 2)
squareNormalScale.add(objectSquareNormals.scale,'z',0,Math.PI * 2)
//---------------------------------------------
const roundPhysical = gui.addFolder("objectRoundPhysical")
//---------------------------------------------
const roundPhong = gui.addFolder("objectRoundPhong")
//---------------------------------------------
const roundStandard = gui.addFolder("objectRoundStandard")
//---------------------------------------------
const roundLambert = gui.addFolder("objectRoundLambert")
//---------------------------------------------
const roundMatcap = gui.addFolder("objectRoundMatcap")
//---------------------------------------------



//---------------------------------------------------------------------

runElement()


