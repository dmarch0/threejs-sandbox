import * as three from "three";
import { ObjectWrapper, SceneWrapper } from "./wrappers";

const objects = [];

for (let i = 0; i < 10; i++) {
  const geometry = new three.BoxGeometry(0.1, 0.1, 0.1);
  const material = new three.MeshBasicMaterial({ color: 0xffffff });
  const mesh = new three.Mesh(geometry, material);
  mesh.position.x = i * 0.1;
  mesh.startingTime = Date.now();
  const updateFunc = mesh => {
    mesh.position.y = Math.sin(
      ((Date.now() - mesh.startingTime) / 1000 + mesh.position.x) * Math.PI
    );
  };

  const object = new ObjectWrapper(mesh, updateFunc);

  objects.push(object);
}

const scene = new SceneWrapper(objects);
export default scene;
