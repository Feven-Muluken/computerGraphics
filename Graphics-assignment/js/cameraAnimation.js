import * as THREE from 'three';

export function setupCameraAnimation(camera, controls) {
  let autoRotate = true;
  let rotationSpeed = 0.5;
  let lastTime = 0;

  function animate(time) {
    if (!lastTime) lastTime = time;
    const delta = (time - lastTime) / 1000;
    lastTime = time;

    if (autoRotate && !controls.enabled) {
      // Calculate new camera position using polar coordinates
      const radius = camera.position.length();
      const theta = Math.atan2(camera.position.x, camera.position.z) + rotationSpeed * delta;

      camera.position.x = radius * Math.sin(theta);
      camera.position.z = radius * Math.cos(theta);
      camera.lookAt(0, 0, 0);
    }

    // Update controls
    controls.update();
  }

  // Toggle auto-rotation
  function toggleAutoRotate() {
    autoRotate = !autoRotate;
    controls.enabled = !autoRotate;
  }

  // Add keyboard control for toggling rotation
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      toggleAutoRotate();
    }
  });

  return {
    animate,
    toggleAutoRotate
  };
} 