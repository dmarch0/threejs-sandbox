import * as three from "three";

export const clearThree = obj => {
  while (obj.children.length > 0) {
    clearThree(obj.children[0]);
    obj.remove(obj.children[0]);
  }
  if (obj.geometry) obj.geometry.dispose();

  if (obj.material) {
    Object.keys(obj.material).forEach(prop => {
      if (!obj.material[prop]) return;
      if (typeof obj.material[prop].dispose === "function")
        obj.material[prop].dispose();
    });
    obj.material.dispose();
  }
};

export class SceneWrapper {
  constructor(args) {
    this.scene = new three.Scene();
    this.objects = args.objects;
    this.frames = 0;
    if (args.background) {
      this.scene.background = args.background;
    }
  }
  init() {
    clearThree(this.scene);

    this.objects.forEach(obj => {
      obj.init();
      this.scene.add(obj.mesh);
    });
  }
  update() {
    this.objects.forEach(obj => {
      obj.update();
    });
    this.frames += 1;
  }
}

export class ObjectWrapper {
  constructor(args) {
    this.mesh = args.mesh;
    this.updateFunc = args.updateFunc;
    this.initFunc = args.initFunc;
  }

  update() {
    this.updateFunc(this.mesh);
  }
  init() {
    this.initFunc(this.mesh);
  }
}
