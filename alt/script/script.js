import * as three from './lib/three.module.js'
import {GLTFLoader} from './lib/GLTFLoader.js'
import {OrbitControls} from './lib/OrbitControls.js'

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    const camera = new three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set( 0, 0, 5 );

    const scene = new three.Scene();
    scene.background = new three.Color(0x0000ff);

    const ambient = new three.HemisphereLight(0xffffff, 0xbbbbff, 0.5);
    scene.add(ambient);

    const light = new three.DirectionalLight( 0xFFFFFF, 1.5 );
    light.position.set( 0.2, 1, 1);
    scene.add(light);

    const renderer = new three.WebGLRenderer({ antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = three.sRGBEncoding;
    container.appendChild( renderer.domElement );
 

    const controls = new OrbitControls( camera, renderer.domElement );

