import * as THREE from "./lib/three.module.js";
import { OrbitControls } from "./lib/OrbitControls.js";

class Scene1 {
  dataPath = "./data/";

  constructor(renderer, manager, stats) {
    this.renderer = renderer;
    this.manager = manager;
    this.stats = stats;
    this.renderState = false;

    // Setup this scene and its camera ------------------------------------------
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    // Load everything on to the screen -----------------------------------------

    // Skybox
    // http://wwwtyro.github.io/space-3d

    const loader = new THREE.CubeTextureLoader(this.manager);
    loader.setPath(this.dataPath);

    const skyboxTextures = loader.load([
      "txt/skybox_front.png",
      "txt/skybox_back.png",
      "txt/skybox_top.png",
      "txt/skybox_bottom.png",
      "txt/skybox_left.png",
      "txt/skybox_right.png",
    ]);
    this.scene.background = skyboxTextures;

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    // Define the controls ------------------------------------------------------
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.camera.position.set(10, 20, 30);
    this.renderState = false; // We won't be rendering straight away
  }
  render(state = true) {
    if (state) {
      this.renderLoop();
      this.controls.enabled = true;
      this.renderState = true;
    } else {
      cancelAnimationFrame(this.renderID);
      this.controls.enabled = false;
      this.renderState = false;
    }
  }
  renderLoop() {
    this.renderID = requestAnimationFrame(this.renderLoop.bind(this));
    // TWEEN.update();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  cleanUp() {
    // Remove the event listener we setup
    window.removeEventListener("resize", this.onWindowResize.bind(this));
    // Remove stuff in the scene as here well
  }
}

export { Scene1 };