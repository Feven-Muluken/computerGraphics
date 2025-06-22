import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { setupCameraAnimation } from './cameraAnimation.js';

// Initialize the scene
const { scene, camera, renderer, controls } = initScene();

// Create and add the product
const product = createProduct();
scene.add(product);

// Add lighting
addLighting(scene);

// Setup interaction
setupInteraction(scene, camera, renderer);

// Setup camera animation
const { animate } = setupCameraAnimation(camera, controls);

// Animation loop
function render(time) {
  requestAnimationFrame(render);
  animate(time);
  renderer.render(scene, camera);
}

// Start the animation loop
render(); 