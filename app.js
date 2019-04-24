"use strict";

// Scene setup
var scene = new THREE.Scene();
// Camera setup: FoV, perspective, near, far
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Add boxes in the scene
var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshBasicMaterial( { color:"rgb(240,138,93)"} );
var cube = new THREE.Mesh( geometry, material );

// Add Sphere in the scene

// var geometry = new THREE.SphereGeometry( 5, 32, 32 );
// var material = new THREE.MeshBasicMaterial( {color:"rgb(240,138,93)"} );
// var sphere = new THREE.Mesh( geometry, material );

scene.add( cube );


camera.position.z = 5;

// Render Scene with cube
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();


