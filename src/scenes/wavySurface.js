import * as three from "three";

import { ObjectWrapper, SceneWrapper } from "./wrappers";
import {
  getTimeSinceStart,
  generateFacesFromVertices,
  generateVerticesGrid
} from "./utils";

const resolution = 10;
const step = 2 / resolution;

const geometry = new three.Geometry();

const vertices = generateVerticesGrid(resolution);
const faces = generateFacesFromVertices(resolution);

geometry.vertices.push(...vertices);
geometry.faces.push(...faces);
geometry.computeFaceNormals();
geometry.computeVertexNormals();

const material = new three.MeshBasicMaterial({ color: 0xff7370 });

const mesh = new three.Mesh(geometry, material);

const edgeGeometry = new three.WireframeGeometry(mesh.geometry);
const edgeMaterial = new three.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2
});
const wireframe = new three.LineSegments(edgeGeometry, edgeMaterial);
wireframe.referenceGeometry = geometry;

const objects = [
  new ObjectWrapper({
    mesh,
    initFunc: mesh => {
      for (let vertex of mesh.geometry.vertices) {
        vertex.y = vertex.initialY;
        vertex.phaseShift = Math.random();
        vertex.freq = Math.random();
      }
      mesh.initialTime = Date.now();
    },
    updateFunc: mesh => {
      for (let vertex of mesh.geometry.vertices) {
        vertex.y =
          vertex.initialY +
          Math.sin(
            Math.PI *
              (getTimeSinceStart(mesh.initialTime) * vertex.freq +
                vertex.phaseShift)
          ) /
            resolution;
      }
      mesh.geometry.verticesNeedUpdate = true;
    }
  }),
  new ObjectWrapper({
    mesh: wireframe,
    initFunc: mesh => {
      console.log(mesh);
    },
    updateFunc: mesh => {
      const newGeometry = new three.WireframeGeometry(mesh.referenceGeometry);
      mesh.geometry = newGeometry;
    }
  })
];

const scene = new SceneWrapper({
  objects,
  background: new three.Color(0xffffff)
});

export default scene;
