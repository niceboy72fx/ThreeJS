import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
// For missing typescript definition error see https://sbcode.net/threejs/tween/

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(-0.6, 0.45, 2)

const renderer = new THREE.WebGLRenderer()
renderer.physicallyCorrectLights = true
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const raycaster = new THREE.Raycaster()
const sceneMeshes: THREE.Object3D[] = []

let monkey: THREE.Object3D = new THREE.Object3D()

const loader = new GLTFLoader()
loader.load(
    'models/monkey.glb',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                const m = child as THREE.Mesh
                if (m.name === 'Suzanne') {
                    m.castShadow = true
                    monkey = m
                } else {
                    // floor
                    m.receiveShadow = true
                }
                sceneMeshes.push(m)
            }
           
        })
        scene.add(gltf.scene)
        chainTweens()
    },
    // (xhr) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    // },
    // (error) => {
    //     console.log(error)
    // }
)

function chainTweens() {
    // Demonstrating a repeating sequence of tweens.
    // const changePositionZ = new TWEEN.Tween(monkey.position).to({ z: -2 }, 2000) // 2 seconds
    const rotateY = new TWEEN.Tween(monkey.rotation).to(
        { y: 18000000 } , 9000000000
    )
    // const scaleXZ = new TWEEN.Tween(monkey.scale).to({ x: 2, z: 0.5 }, 2000)
    // const rotateZ = new TWEEN.Tween(monkey.rotation).to(
    //     { z: Math.PI * 2 },
    //     2000
    // )
    // const resetScaleXZ = new TWEEN.Tween(monkey.scale).to({ x: 1, z: 1 }, 2000)
    // const resetPositionZ = new TWEEN.Tween(monkey.position).to({ z: 0 }, 2000)
    // const rotateX = new TWEEN.Tween(monkey.rotation).to(
    //     { x: Math.PI * 2 },
    //     2000
    // )
    // const resetRotations = new TWEEN.Tween(monkey.rotation).to(
    //     { x: 0, y: 0, z: 0 },
    //     0
    // ) // 0 seconds results in an instant tween

    // changePositionZ.chain(rotateY)
    // rotateY.chain(scaleXZ)
    // scaleXZ.chain(rotateZ)
    // rotateZ.chain(resetScaleXZ)
    // resetScaleXZ.chain(resetPositionZ)
    // resetPositionZ.chain(rotateX)
    // rotateX.chain(resetRotations)
    // resetRotations.chain(changePositionZ) // begin the loop again

    rotateY.start()
}

// function onDoubleClick(event: MouseEvent) {
//     raycaster.setFromCamera(
//         {
//             x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
//             y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
//         },
//         camera
//     )

//     const intersects = raycaster.intersectObjects(sceneMeshes, false)

//     if (intersects.length > 0) {
//         const p = intersects[0].point
//         new TWEEN.Tween(controls.target)
//             .to(
//                 {
//                     x: p.x,
//                     y: p.y,
//                     z: p.z,
//                 },
//                 500
//             )
//             .easing(TWEEN.Easing.Cubic.Out)
//             .start()
//     }
// }
// renderer.domElement.addEventListener('dblclick', onDoubleClick, false)

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }
// window.addEventListener('resize', onWindowResize, false)

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    TWEEN.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
