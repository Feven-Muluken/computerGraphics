import * as THREE from 'three';

export function setupInteraction(scene, camera, renderer) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const infoPanel = document.getElementById('info-panel');
  let selectedObject = null;

  function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Reset previous selection
    if (selectedObject) {
      selectedObject.material.emissive.setHex(0x000000);
      selectedObject = null;
      infoPanel.classList.remove('visible');
    }

    // Handle new intersection
    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (object.userData.name) {
        selectedObject = object;
        object.material.emissive.setHex(0x333333);
        infoPanel.textContent = object.userData.name;
        infoPanel.classList.add('visible');
      }
    }
  }

  function onClick(event) {
    if (selectedObject) {
      // Animate the selected part
      const originalScale = selectedObject.scale.clone();
      selectedObject.scale.multiplyScalar(1.2);

      setTimeout(() => {
        selectedObject.scale.copy(originalScale);
      }, 200);
    }
  }

  // Add event listeners
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('click', onClick);

  return {
    raycaster,
    mouse,
    selectedObject
  };
} 