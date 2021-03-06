import ConsoleSignature from './modules/ConsoleSignature.js';
import PostEffect from './modules/PostEffect.js';
import Sphere from './modules/Sphere.js';

const consoleSignature = new ConsoleSignature();

const canvas = document.getElementById('canvas-webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: false,
  canvas: canvas,
});
const renderBack = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const sceneBack = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const cameraBack = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const clock = new THREE.Clock();
const stats = new Stats();

const postEffect = new PostEffect(renderBack.texture);
const sphere = new Sphere();

const resizeWindow = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cameraBack.aspect = window.innerWidth / window.innerHeight;
  cameraBack.updateProjectionMatrix();
  renderBack.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  sphere.resize();
}
const on = () => {
  window.addEventListener('resize', () => {
    resizeWindow();
  })
}
const initDatGui = () => {
  const gui = new dat.GUI();
  const controller = {
    radius: gui.add(sphere, 'radius', 0, 1000).name('Sphere Radius')
  }
  controller.radius.onChange((value) => {
    sphere.mesh.material.uniforms.radius.value = value;
  });
}
const initStats = () => {
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
}
const render = () => {
  const time = clock.getDelta();
  sphere.render(time);
  renderer.render(sceneBack, cameraBack, renderBack);
  postEffect.render(time);
  renderer.render(scene, camera);
}
const renderLoop = () => {
  stats.begin();
  render();
  stats.end();
  requestAnimationFrame(renderLoop);
}

const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xeeeeee, 1.0);
  cameraBack.position.set(1000, 1000, 1000);
  cameraBack.lookAt(new THREE.Vector3());

  scene.add(postEffect.mesh);
  sceneBack.add(sphere.mesh);

  on();
  initDatGui();
  initStats();
  resizeWindow();
  renderLoop();
}
init();
