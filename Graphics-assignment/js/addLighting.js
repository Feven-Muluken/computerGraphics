import * as THREE from 'three';

export function addLighting(scene) {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Main directional light
  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(5, 5, 5);
  mainLight.castShadow = true;
  scene.add(mainLight);

  // Secondary directional light for better shadows
  const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.5);
  secondaryLight.position.set(-5, 3, -5);
  scene.add(secondaryLight);

  return { ambientLight, mainLight, secondaryLight };
} 