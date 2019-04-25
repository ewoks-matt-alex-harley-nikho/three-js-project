"use strict";

//Global stuff

var hemisphereLight, controls, createClouds, shadowLight, HEIGHT, WIDTH, Colors, camera, scene, renderer, dragon, appContainer;

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



    // Calls on WebGL
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });


    // camera

    // Camera setup: FoV, perspective, near, far
    camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, .5, 1000 );
    camera.position.z = 5;

    // controls

    controls = new THREE.OrbitControls(camera);
    controls.update;


    // Creates Fog - distance based
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

//////////////////////////////
///////// Clouds ////////////
/////////////////////////////

createClouds = function() {

    this.mesh = new Object3D();

    var boxClouds = new THREE.BoxGeometry(20, 20, 20);
    var boxCloudMat = new THREE.MeshPhongMaterial({
        colors: Colors.white
    });

    var cloudBlocks = 3 + Math.floor(Math.random() * 3);

    for(var i = 0; i < cloudBlocks; i++) {

        var newMesh = THREE.Mesh(boxClouds, boxCloudMat)

        newMesh.position.x = i * 10;
        newMesh.position.y = Math.random() * 15;
        newMesh.rotation.y = Math.random() * Math.PI * 2;
        newMesh.position.z = Math.random() * 15;
        newMesh.rotation.z = Math.random() * Math.PI * 2;


        var cloudSize = .1 + Math.random()*.9;
        newMesh.scale.set(cloudSize, cloudSize, cloudSize);

        // allow each cube to cast and to receive shadows
        newMesh.castShadow = true;
        newMesh.receiveShadow = true;

        // add the cube to the container we first created
        this.mesh.add(newMesh);
    }
};


// function createDragon () {
//
//     //////////////////////////////
//     //     Dragon Body Mat     //
//     /////////////////////////////
//
//     // material for dragon
//     var redMat = THREE.MeshLambertMaterial({
//         color: Colors.red,
//         shading: THREE.flatShading
//     });
//     var brownMat = THREE.MeshLambertMaterial({
//         color: Colors.brown,
//         shading: THREE.flatShading
//     });
//     var whiteMat = THREE.MeshLambertMaterial({
//         color: Colors.white,
//         shading: THREE.flatShading
//     });
//     var pinkMat = THREE.MeshLambertMaterial({
//         color: Colors.pink,
//         shading: THREE.flatShading
//     });
//     var blueMat = THREE.MeshLambertMaterial({
//         color: Colors.blue,
//         shading: THREE.flatShading
//     });
//
//     var greenMat = THREE.MeshLambertMaterial({
//         color: Colors.green,
//         shading: THREE.flatShading
//     });
//
//     //////////////////////////////
//     //     Dragon Body Geom    //
//     /////////////////////////////
//
//     var bodyGeom = new THREE.BoxGeometry( 2, 2, 2 );
//     var bodyMaterial = greenMat;
//
//
//     // Face
//
//     // Horns
//
//     // Wings
//
//     var wingGeom = new THREE.CubeGeometry(5, 5, 5);
//     var wingMaterial = redMat;
//
//     // Tail
//
//     dragon = new THREE.Mesh( bodyGeom, bodyMaterial, wingGeom, wingMaterial );
//
//     scene.add(dragon);
//
// }

createScene();
createLights();
animate();



// Animate Scene
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    update.controls();

    // dragon.rotation.x += 0.01;
    // dragon.rotation.y += 0.01;
}






