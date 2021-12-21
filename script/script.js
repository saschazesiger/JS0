import * as THREE from './lib/three.module.js'
import {GLTFLoader} from './lib/GLTFLoader.js'
import {OrbitControls} from './lib/OrbitControls.js'


class app {
  constructor() {
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

    this.models()

    this.light = new THREE.PointLight( 0x404040 );
    this.light.position.set(10, 10, 10)
    this.light.power = 50
    this.ambientlight = new THREE.AmbientLight(0x404040)
    this.ambientlight.intensity = 2
    this.scene.add(this.light);
    this.scene.add(this.ambientlight);

    const controls = new OrbitControls(
      this.camera, this.renderer.domElement);
    controls.target.set(0, 20, 0);
    controls.update();
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

  models(){
    const loader = new GLTFLoader();
    loader.load(
      '../objects/baum.glb',
      gltf => {
        this.gltfscene = gltf.scene
        this.scene.add(gltf.scene)
        this.renderer.setAnimationLoop( this.render.bind(this));
      },
      xhr => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      err => {
        console.log('error')
      } 
    )
  }
  render( ){
    this.gltfscene.rotateY(0.01);
    this.renderer.render( this.scene, this.camera );
  }
}

let build = null;

window.addEventListener('DOMContentLoaded', () => {
  build = new app();

});


