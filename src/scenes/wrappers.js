import * as three from "three";

export class SceneWrapper {
  constructor(objects) {
    this.scene = new three.Scene();
    this.objects = objects;
    this.frames = 0;
  }
  init() {
    this.objects.forEach(obj => this.scene.add(obj.mesh));
  }
  update() {
    this.objects.forEach(obj => {
      obj.update();
    });
    this.frames += 1;
  }
}

export class ObjectWrapper {
  constructor(mesh, updateFunc) {
    this.mesh = mesh;
    this.updateFunc = updateFunc;
  }

  update() {
    this.updateFunc(this.mesh);
  }
}
