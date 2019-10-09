import * as three from "three";

import { ObjectWrapper, SceneWrapper } from "./wrappers";
import { createMeshGrid, getTimeSinceStart, getUVParameters } from "./utils";

const objects = [];
const gridMesh = createMeshGrid(50);

for (let gridElement of gridMesh) {
  objects.push(
    new ObjectWrapper({
      mesh: gridElement.mesh,
      initFunc: gridElement.initFunc,
      updateFunc: mesh => {
        const { u, v } = getUVParameters(mesh.i, mesh.j, mesh.boxSize);
        const r1 =
          0.65 +
          Math.sin(Math.PI * (6 * u + getTimeSinceStart(mesh.startingTime))) *
            0.1;
        const r2 =
          0.2 +
          Math.sin(Math.PI * (4 * v + getTimeSinceStart(mesh.startingTime))) *
            0.05;

        const s = r2 * Math.cos(Math.PI * v) + r1;

        mesh.position.x = s * Math.sin(Math.PI * u);
        mesh.position.y = r2 * Math.sin(Math.PI * v);
        mesh.position.z = s * Math.cos(Math.PI * u);

        mesh.material.color.r = mesh.position.y * 0.5 + 0.5;
        mesh.material.color.g = mesh.position.x * 0.5 + 0.5;
      }
    })
  );
}

const scene = new SceneWrapper({
  objects,
  background: new three.Color("rgb(140, 140, 140)")
});
export default scene;
