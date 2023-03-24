import { Statistic } from 'antd'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module'
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5)) // AxesHelper dung de de bug toa do

const camera = new THREE.PerspectiveCamera(
    70, // độ to của vật thể ( giá trị càng bé thì vật thể  càng to)
    15/4, // gía trị x , y ( x là chiều dài , y là chiều rộng)
    0.1, // khoảng cách gần của trục -n 
    1000 // khoảng cách xa của trục -f
)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight) // set size = size của man hình
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry() // goi ham tao hinh hop vuông
const material = new THREE.MeshBasicMaterial({ /// dung de build material
    color: 0x00ff00,   // dung de chỉnh màu
    wireframe: true,  // wireframe dung bat tat khung suon
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)  // add khối hình hộp vuông vào scene 

window.addEventListener('resize', onWindowResize, true)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight 
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
//-----------------------hàm debug --------------------------------
// ham goi xem fps
const stats = Stats()
document.body.appendChild(stats.dom)

// ham goi gui
const gui = new GUI()
//
const cubeFolder = gui.addFolder("cube")
gui.add(cube.rotation,"x",0 ,Math.PI * 2) // dung de chinh toa do x, y ,z
gui.add(cube.rotation,"y",0 ,Math.PI * 2)
gui.add(cube.rotation,"z",0 ,Math.PI * 2)
//ham chinh toa do vat the
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10, 2)
cubePositionFolder.add(cube.position, 'y', -10, 10, 2)
cubePositionFolder.add(cube.position, 'z', -10, 10, 2)
cubeFolder.open()
// hàm xem camera 
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x', 0, 10)
cameraFolder.add(camera.position, 'y', 0, 10)
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()
//ham xem ti le 
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', -5, 5)
cubeScaleFolder.add(cube.scale, 'y', -5, 5)
cubeScaleFolder.add(cube.scale, 'z', -5, 5)
cubeFolder.add(cube, 'visible')
cubeFolder.open()
cubeScaleFolder.open()

//----------------------------------------------------------------
function animate() {   
    requestAnimationFrame(animate)
    stats.begin()
    // stats.begin()
    // auto xoay
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    stats.end()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()