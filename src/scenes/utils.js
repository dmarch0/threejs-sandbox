import * as three from "three";

export const createMeshGrid = resolution => {
  const boxSize = 2 / resolution;
  const objects = [];
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const initFunc = mesh => {
        mesh.position.x = (i + 0.5) * boxSize - 1;
        mesh.position.z = (j + 0.5) * boxSize - 1;
        mesh.startingTime = Date.now();
        mesh.d = Math.sqrt(
          mesh.position.x * mesh.position.x + mesh.position.z * mesh.position.z
        );
        mesh.boxSize = boxSize;
        mesh.i = i;
        mesh.j = j;
      };
      const geometry = new three.BoxGeometry(boxSize, boxSize, boxSize);
      const material = new three.MeshBasicMaterial({ color: 0xffffff });
      const mesh = new three.Mesh(geometry, material);
      objects.push({ mesh, initFunc });
    }
  }
  return objects;
};

export const getTimeSinceStart = startingTime => {
  return (Date.now() - startingTime) / 1000;
};

export const getUVParameters = (i, j, step) => {
  const u = (i + 0.5) * step - 1;
  const v = (j + 0.5) * step - 1;
  return { u, v };
};
