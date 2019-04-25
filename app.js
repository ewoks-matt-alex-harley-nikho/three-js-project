"use strict";

//Global stuff

var hemisphereLight, shadowLight, HEIGHT, WIDTH, Colors, camera, scene, renderer, dragon, appContainer;

Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0
};

HEIGHT = window.innerHeight;
WIDTH = window.innerWidth;

// Scene Creation

function createScene () {

    // Scene setup
    scene = new THREE.Scene();

    // Camera setup: FoV, perspective, near, far
    camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, .5, 1000 );

    // Calls on WebGL
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    camera.position.z = 5;

    // Creates Fog
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // Scene Render and DOM call
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    appContainer = document.getElementById('app');
    appContainer.appendChild( renderer.domElement );

}

function createLights() {
    // A hemisphere light is a gradient colored light;
    // the first parameter is the sky color, the second parameter is the ground color,
    // the third parameter is the intensity of the light
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

    // A directional light shines from a specific direction.
    // It acts like the sun, that means that all the rays produced are parallel.
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    // Set the direction of the light
    shadowLight.position.set(150, 350, 350);

    // Allow shadow casting
    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // to activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

function createDragon () {

    // Add boxes in the scene
    var bodyGeom = new THREE.BoxGeometry( 2, 2, 2 );
    var bodyMaterial = new THREE.MeshBasicMaterial({
        color: Colors.red,
        shading: THREE.flatShading
    });
    dragon = new THREE.Mesh( bodyGeom, bodyMaterial );

    // Head

    // Wings

    // Tail

    scene.add(dragon);

}

createScene();
createLights();
createDragon();
animate();



// Render Scene
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    dragon.rotation.x += 0.01;
    dragon.rotation.y += 0.01;
}






