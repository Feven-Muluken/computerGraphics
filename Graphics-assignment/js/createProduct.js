import * as THREE from 'three';

export function createProduct() {
  const product = new THREE.Group();

  // Materials
  const chairMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    roughness: 0.7,
    metalness: 0.2
  });

  // Chair seat
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.2, 2),
    chairMaterial
  );
  seat.position.y = 1;
  product.add(seat);

  // Chair back
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 0.2),
    chairMaterial
  );
  back.position.set(0, 1.75, -0.9);
  product.add(back);

  // Chair legs
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
  const legPositions = [
    [-0.8, 0.5, -0.8],
    [0.8, 0.5, -0.8],
    [-0.8, 0.5, 0.8],
    [0.8, 0.5, 0.8]
  ];

  legPositions.forEach(position => {
    const leg = new THREE.Mesh(legGeometry, chairMaterial);
    leg.position.set(...position);
    product.add(leg);
  });

  // Add names to parts for interaction
  seat.userData.name = "Chair Seat";
  back.userData.name = "Chair Back";
  product.children.slice(4).forEach((leg, index) => {
    leg.userData.name = `Chair Leg ${index + 1}`;
  });

  return product;
} 