import * as three from "three";
import { ObjectWrapper, SceneWrapper } from "./wrappers";

const objects = [];

const resolution = 10;
const boxSize = 2 / resolution;

for (let i = 0; i < resolution; i++) {
  const geometry = new three.BoxGeometry(boxSize, boxSize, boxSize);
  const material = new three.MeshBasicMaterial({ color: 0xffffff });
  const mesh = new three.Mesh(geometry, material);

  const updateFunc = mesh => {
    mesh.position.y = Math.sin(
      ((Date.now() - mesh.startingTime) / 1000 + mesh.position.x) * Math.PI
    );
    mesh.material.color.r = mesh.position.y * 0.5 + 0.5;
    mesh.material.color.g = mesh.position.x * 0.5 + 0.5;
  };

  const initFunc = mesh => {
    mesh.position.x = i * boxSize;
    mesh.startingTime = Date.now();
  };

  const object = new ObjectWrapper({ mesh, updateFunc, initFunc });

  objects.push(object);
}

const scene = new SceneWrapper({
  objects,
  background: new three.Color("rgb(140, 140, 140)")
});
export default scene;
