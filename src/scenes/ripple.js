import * as three from "three";

import { ObjectWrapper, SceneWrapper } from "./wrappers";
import { createMeshGrid } from "./utils";

const objects = [];
const gridMesh = createMeshGrid(20);

for (let gridElement of gridMesh) {
  objects.push(
    new ObjectWrapper({
      mesh: gridElement.mesh,
      initFunc: gridElement.initFunc,
      updateFunc: mesh => {
        mesh.position.y = Math.sin(
          Math.PI * (4 * mesh.d - (Date.now() - mesh.startingTime) / 1000)
        );
        mesh.position.y /= 1 + 10 * mesh.d;
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
