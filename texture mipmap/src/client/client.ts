import  Stats  from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from "three"
import { GUI } from 'dat.gui';
import { AxesHelper, BackSide, CubeTexture, CubeTextureLoader, DoubleSide, FrontSide, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshPhysicalMaterial, NearestFilter, PerspectiveCamera, PlaneGeometry, PointLight, Scene, TextureLoader, WebGLRenderer } from 'three';

const scene1 = new Scene()
const scene2 = new Scene()

const axesAhelper1 = new AxesHelper(5)
const axesAhelper2 = new AxesHelper(5)

scene1.add(axesAhelper1)
scene2.add(axesAhelper2)

const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.z = 1

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const PlaneGeometry1 = new PlaneGeometry()
const PlaneGeometry2 = new PlaneGeometry()

const texture1 = new TextureLoader().load('images/grid.jpg')
const texture2 = texture1.clone()

const material1 = new MeshBasicMaterial({map: texture1})
const material2 = new MeshBasicMaterial({map: texture2})

texture2.minFilter = NearestFilter
texture2.minFilter = NearestFilter

const plane1 = new Mesh(PlaneGeometry1, material1)
const plane2 = new Mesh(PlaneGeometry2, material2)

scene1.add(plane1)
scene2.add(plane2)

function render() {
    renderer.setScissorTest(true)
    renderer.setScissor(0,0,window.innerWidth / 2 , window.innerHeight / 2)
    renderer.render(scene1, camera)
    renderer.setScissor(window.innerWidth / 2 , 0 , window.innerWidth / 2 - 2 , window.innerHeight)
    renderer.render(scene2, camera)
    renderer.setScissorTest(false)
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

///----------------------------------------------------------------
const options = {
    minFilters: {
        NearestFilter: THREE.NearestFilter,
        NearestMipMapLinearFilter: THREE.NearestMipMapLinearFilter,
        NearestMipMapNearestFilter: THREE.NearestMipMapNearestFilter,
        'LinearFilter ': THREE.LinearFilter,
        'LinearMipMapLinearFilter (Default)': THREE.LinearMipMapLinearFilter,
        LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter,
    },
    magFilters: {
        NearestFilter: THREE.NearestFilter,
        'LinearFilter (Default)': THREE.LinearFilter,
    },
}
//----------------------------------------------------------------
//debug
const gui = new GUI()
const textureFolder = gui.addFolder('THREE.Texture')
textureFolder
    .add(texture2, 'minFilter', options.minFilters)
    .onChange(() => updateMinFilter())
textureFolder
    .add(texture2, 'magFilter', options.magFilters)
    .onChange(() => updateMagFilter())
textureFolder.open()

function updateMinFilter() {
    texture2.minFilter = Number(texture2.minFilter)
    texture2.needsUpdate = true
}
function updateMagFilter() {
    texture2.magFilter = Number(texture2.magFilter)
    texture2.needsUpdate = true
}

//----------------------------------------------------------------
function animate() {
    requestAnimationFrame(animate)

    render()
}

animate()