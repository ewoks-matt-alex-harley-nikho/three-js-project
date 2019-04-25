"use strict";

//Global stuff

var appContainer,
    scene,
    controls,
    createClouds,
    createDragon,
    camera,
    Colors,
    dragon,
    hemisphereLight,
    HEIGHT,
    renderer,
    shadowLight,
    sky,
    skyObjects,
    WIDTH,

Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
    gray: 0xdfdfdf,
    green: 0x616f39
};

HEIGHT = window.innerHeight;
WIDTH = window.innerWidth;

// Scene Creation

function createScene() {

    // Scene setup
    scene = new THREE.Scene();


    // Calls on WebGL
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });


    // camera

    // Camera setup: FoV, perspective, near, far
    camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, .5, 1000);
    camera.position.z = 5;

    // controls

    // controls = new THREE.OrbitControls(camera);
    // controls.update();


    // Creates Fog - distance based
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // Scene Render and DOM call
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    appContainer = document.getElementById('app');
    appContainer.appendChild(renderer.domElement);
}

function createLights() {
    // A hemisphere light is a gradient colored light;
    // the first parameter is the sky color, the second parameter is the ground color,
    // the third parameter is the intensity of the light
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

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
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // to activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);

}

//////////////////////////////
///////// Clouds ////////////
/////////////////////////////

createClouds = function () {

    this.mesh = new THREE.Object3D();
    var boxCloud = new THREE.BoxGeometry(20, 20, 20);
    var boxCloudMat = new THREE.MeshNormalMaterial({ shading: THREE.flatShading });

    var cloudBlocks = 4.2 + Math.floor(Math.random() * 3);

    for (var i = 0; i < cloudBlocks; i++) {
        var newMesh = new THREE.Mesh(boxCloud, boxCloudMat)
        newMesh.position.x = i * 10;
        newMesh.position.y = Math.random() * 15;
        newMesh.rotation.y = Math.random() * Math.PI * 2;
        newMesh.position.z = Math.random() * 15;
        newMesh.rotation.z = Math.random() * Math.PI * 2;


        var cloudSize = .3 + Math.random() * 1.2;
        newMesh.scale.set(cloudSize, cloudSize, cloudSize);

        // allow each cube to cast and to receive shadows
        newMesh.castShadow = true;
        newMesh.receiveShadow = true;

        // add the cube to the container we first created
        this.mesh.add(newMesh);
    }
};

// Define a Sky Object
skyObjects = function () {
    this.mesh = new THREE.Object3D();
    this.nClouds = 21; // Cloud count

    var stepAngle = Math.PI * 2 / this.nClouds;

    // create the clouds
    for (var i = 0; i < this.nClouds; i++) {

        var c = new createClouds;

        // set the rotation and the position of each cloud;
        var a = stepAngle * i; // this is the final angle of the cloud
        var h = 720 + Math.random() * 300; // this is the distance between the center of the axis and the cloud itself

        // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
        c.mesh.position.y = Math.sin(a) * h;
        c.mesh.position.x = Math.cos(a) * h;

        // rotate the cloud according to its position
        c.mesh.rotation.z = a + Math.PI / 2;

        // at random depths inside of the scene
        c.mesh.position.z = -400 - Math.random() * 400;

        // we also set a random scale for each cloud
        var s = 1 + Math.random() * 2;
        c.mesh.scale.set(s, s, s);

        // do not forget to add the mesh of each cloud in the scene
        this.mesh.add(c.mesh);
    }
};

// towards the bottom of the screen
function createSky() {
    sky = new skyObjects;
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
}


dragon = function () {

    //////////////////////////////
    //     Dragon Body Mat     //
    /////////////////////////////

    // material for dragon
    var redMat = THREE.MeshLambertMaterial({
        color: Colors.red,
        shading: THREE.flatShading
    });
    var brownMat = THREE.MeshLambertMaterial({
        color: Colors.brown,
        shading: THREE.flatShading
    });
    var whiteMat = THREE.MeshLambertMaterial({
        color: Colors.white,
        shading: THREE.flatShading
    });
    var pinkMat = THREE.MeshLambertMaterial({
        color: Colors.pink,
        shading: THREE.flatShading
    });
    var blueMat = THREE.MeshLambertMaterial({
        color: Colors.blue,
        shading: THREE.flatShading
    });

    var greenMat = THREE.MeshLambertMaterial({
        color: Colors.green,
        shading: THREE.flatShading
    });

    //////////////////////////////
    //     Dragon Body Geom    //
    /////////////////////////////

    // Body

    var bodyGeom = new THREE.BoxGeometry( 2, 2, 2 );
    var bodyMaterial = greenMat;

    // Wings
    var wingGeom = new THREE.CubeGeometry(5, 5, 5 );
    var wingMaterial = redMat;

    // Face
    var faceGeom = new THREE.BoxGeometry(1, 1, 1 );
    var faceMaterial = greenMat;

    // Eyes
    var eyesGeom = new THREE.PlaneGeometry(1, 1, 1);
    var eyesMaterial = whiteMat;

    // Pupils
    var pupilGeom = new THREE.PlaneGeometry (.3, .3, .3)
    var pupilMaterial = blueMat;

    // Horns
    var hornGeom = new THREE.ConeGeometry(2,2,2)
    var hornMaterial = brownMat;





};
createScene();
createLights();
createSky();
animate();


// Animate Scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // controls.update(); // Fix, not working

    sky.mesh.rotation.z += .01;


}






