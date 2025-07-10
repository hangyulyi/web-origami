// main.js

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import PaperModel from './modules/PaperModel.js';

// 1. Scene Setup
const scene = new THREE.Scene();

// 2. Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5); // Set initial camera position

// 3. Renderer Setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x333333); // A slightly darker background
document.getElementById('container').appendChild(renderer.domElement);

// 4. OrbitControls
// Allows you to orbit the camera around the scene using mouse drag
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // For smoother camera movements
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false; // Prevents camera from panning out of its target
controls.minDistance = 3;   // Minimum distance camera can be from target
controls.maxDistance = 10;  // Maximum distance camera can be from target
controls.maxPolarAngle = Math.PI / 2; // Prevents camera from going below the ground plane

// 5. Create the "Paper"
// PaperModel(scene, width, height, segmentsX, segmentsY)
const paper = new PaperModel(scene, 3, 4, 20, 20); // Using 20x20 segments for more detail

// --- TEMPORARY: ADD A LARGE TEST CUBE (BLUE WIREFRAME) ---
// This cube is added to help confirm if anything at all is rendering in the scene.
const testCubeGeometry = new THREE.BoxGeometry(5, 5, 5); // A large cube
const testCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true }); // Blue wireframe, always visible
const testCube = new THREE.Mesh(testCubeGeometry, testCubeMaterial);
scene.add(testCube);
console.log("main.js: Added large blue wireframe test cube.");
// --- END TEMPORARY ---

// 6. Add Lighting (stronger for MeshStandardMaterial)
// HemisphereLight for subtle ambient light from above/below
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7);
scene.add(hemiLight);

// DirectionalLight to cast distinct shadows (important for realistic folding later)
const dirLight = new THREE.DirectionalLight(0xffffff, 1.0); // White light, intensity 1.0
dirLight.position.set(5, 10, 7); // Position it above, front, right
dirLight.castShadow = true; // Enable shadow casting for this light
scene.add(dirLight);

// Configure shadow properties for the directional light
dirLight.shadow.mapSize.width = 1024; // default is 512
dirLight.shadow.mapSize.height = 1024; // default is 512
dirLight.shadow.camera.near = 0.5; // default is 0.5
dirLight.shadow.camera.far = 50; // default is 500
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;

// Enable shadows in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows

// The paper object needs to receive shadows
paper.getMesh().receiveShadow = true;
// And potentially cast them if you add more objects
// paper.getMesh().castShadow = true;


// Optional: Add a simple grid helper to visualize the floor
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// 7. Handle Window Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 8. Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls (important for damping to work)
    controls.update();

    renderer.render(scene, camera);
}

// Start the animation loop
animate();