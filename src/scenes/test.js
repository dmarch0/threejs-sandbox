import * as three from "three";
import { ObjectWrapper, SceneWrapper } from "./wrappers";

const geometry = new three.BoxGeometry(1, 1, 1);
const material = new three.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new three.Mesh(geometry, material);

const otherTestObjects = [
  new ObjectWrapper(mesh, mesh => {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  })
];

const scene = new SceneWrapper(otherTestObjects);

export default scene;
