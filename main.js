import './style.css'
import * as THREE from 'three';

console.log("yess")
// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
// camera.position.set(0,0,2.5); // Set position like this
// camera.lookAt(new THREE.Vector3(0,0,0)); // Set look at coordinate like this
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.setZ(30);

renderer.render(scene, camera);
// Object1
const planetTexture = new THREE.TextureLoader().load('./images/planet.jpg')
const planetNormal = new THREE.TextureLoader().load('./images/normal.jpg')
const geometry = new THREE.SphereGeometry(7,30,16,100)
const material = new THREE.MeshStandardMaterial({
  map: planetTexture,
  normalMap: planetNormal
})
const sphere = new THREE.Mesh(geometry, material);
sphere.position.x = -8
sphere.position.y = -5
scene.add(sphere);

// Object2

const planetTexture2 = new THREE.TextureLoader().load('./images/earth.jpg')
const planetNormal2 = new THREE.TextureLoader().load('./images/earth-normal.webp')
const geometry2 = new THREE.SphereGeometry(15,30,16,100)
const material2 = new THREE.MeshStandardMaterial({
  map: planetTexture2,
  normalMap: planetNormal2
})
const earth = new THREE.Mesh(geometry2, material2);
earth.position.x = 10
earth.position.z = -200
scene.add(earth);

// Object3
const planetTexture3 = new THREE.TextureLoader().load('./images/moon-texture.jpg')
const planetNormal3 = new THREE.TextureLoader().load('./images/moon-normal.jpg')
const geometry3 = new THREE.SphereGeometry(4,30,16,100)
const material3 = new THREE.MeshStandardMaterial({
  map: planetTexture3,
  normalMap: planetNormal3
})
const moon = new THREE.Mesh(geometry3, material3);
earth.add(moon)
moon.position.x = 25


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

// Putting background texture
const bgTexture = new THREE.TextureLoader().load('./images/bg.webp')
scene.background = bgTexture

// function
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);

  // For sphere 1
  // sphere.rotation.x += 0.05;
  sphere.rotation.y += 0.01;
  sphere.rotation.x += 0.01; 

  // For sphere 2
  earth.rotateY(0.01)
  earth.rotateX(0.001)  

}
animate()


// Rotation on scroll
function mousemoved(){
  const t = document.body.getBoundingClientRect().top;

  sphere.position.x += -0.05
  sphere.position.z += -0.5

  camera.position.z = t * -.2;
  // camera.position.x = t * -0.02;
  // camera.rotation.y = t * -0.002;
  // console.log("moving")
  
  earth.position.x +=0.0005
  earth.position.y +=0.0005
  earth.position.z +=0.5

}
document.addEventListener('mousemove', mousemoved)
mousemoved()
