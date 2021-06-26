const dataPath = "./data/";
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const overlay = document.getElementById("overlay");
const startButton = document.getElementById("start-button");

// Loading manager
const manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  progressBar.style.width = (loaded / total) * 100 + "%";
  progressBar.innerHTML = `Loading ${loaded}/${total}`;
  2;
  startButton.style.visibility = "hidden";
};

manager.onLoad = function () {
  progress.style.display = "none";
  overlay.style.visibility = "visible";
  startButton.style.visibility = "visible";
  startButton.addEventListener("click", () => {
    renderLoop();
    startButton.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  });
};

// Setting up the scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Handle window resizing
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Skybox
// http://wwwtyro.github.io/space-3d

const loader = new THREE.CubeTextureLoader(manager);
loader.setPath(dataPath);

const skyboxTextures = loader.load([
  "txt/skybox_front.png",
  "txt/skybox_back.png",
  "txt/skybox_top.png",
  "txt/skybox_bottom.png",
  "txt/skybox_left.png",
  "txt/skybox_right.png",
]);
scene.background = skyboxTextures;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const controls = new THREE.OrbitControls(camera, renderer.domElement); // CONTROLS
camera.position.set(10, 20, 30);
controls.update();

const renderLoop = function () {
  requestAnimationFrame(renderLoop);

  // TWEEN.update();

  controls.update(); // CONTROLS

  renderer.render(scene, camera);
};
