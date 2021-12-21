import * as THREE from './lib/three.module.js'
//import {GLTFLoader} from './lib/GLTFLoader.js'
import {OrbitControls} from './lib/OrbitControls.js'


class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    this._camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    this._camera.position.set(75, 20, 0);

    this._scene = new THREE.Scene();

    const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    const geometry = new THREE.PlaneGeometry(100, 100)
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotateX(Math.PI + (Math.PI / 2))

    this._scene.add(mesh)

    this._RAF();
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});
