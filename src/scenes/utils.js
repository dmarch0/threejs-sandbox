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

export const sinh = x => {
  return (Math.pow(Math.E, x) - Math.pow(Math.E, -x)) / 2;
};

export const cosh = x => {
  return (Math.pow(Math.E, x) + Math.pow(Math.E, -x)) / 2;
};

export const generateVerticesGrid = resolution => {
  const step = 2 / resolution;
  const vertices = [];
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const vertex = new three.Vector3(i * step, 0, j * step);
      vertex.initialY = (Math.random() * (Math.random() > 0.5 ? -1 : 1)) / 10;
      vertices.push(vertex);
    }
  }
  return vertices;
};

export const generateFacesFromVertices = resolution => {
  const faces = [];
  for (let j = 0; j < resolution - 1; j++) {
    for (let i = 0; i < resolution - 1; i++) {
      const n0 = j * resolution + i;
      const n1 = n0 + 1;
      const n2 = (j + 1) * resolution + i + 1;
      const n3 = n2 - 1;
      const face1 = new three.Face3(n0, n1, n2);
      const face2 = new three.Face3(n2, n3, n0);
      faces.push(face1);
      faces.push(face2);
    }
  }
  return faces;
};
