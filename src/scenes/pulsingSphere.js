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
        let r =
          0.8 +
          Math.sin(Math.PI * (6 * u + getTimeSinceStart(mesh.startingTime))) *
            0.1 +
          Math.sin(Math.PI * (4 * v + getTimeSinceStart(mesh.startingTime))) *
            0.1;

        const s = r * Math.cos(Math.PI * 0.5 * v);

        mesh.position.x = s * Math.sin(Math.PI * u);
        mesh.position.y = r * Math.sin(Math.PI * 0.5 * v);
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
