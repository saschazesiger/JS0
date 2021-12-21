import * as THREE from './lib/three.module.js'
//import {GLTFLoader} from './lib/GLTFLoader.js'
import {OrbitControls} from './lib/OrbitControls.js'


class app {
  constructor() {
    this.initalize();
  }

  initalize() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.resize();
    }, false);

    this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    this.camera.position.set(75, 20, 0);

    this.scene = new THREE.Scene();

    const controls = new OrbitControls(
      this.camera, this.renderer.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    this.planegeometry = new THREE.PlaneGeometry(100, 100)
    this.planematerial = new THREE.MeshBasicMaterial({color: 0x00ff00})
    this.plane = new THREE.Mesh(this.planegeometry, this.planematerial)
    this.plane.rotateX(Math.PI + (Math.PI / 2))

    this.scene.add(this.plane)

    this.raf();
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  raf() {
    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera);
      this.raf();
    });
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new app();

});

