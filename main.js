// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // White background

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load Google colors
const colors = [
    new THREE.Color(0x4285F4), // Blue
    new THREE.Color(0xEA4335), // Red
    new THREE.Color(0xFBBC05), // Yellow
    new THREE.Color(0x34A853)  // Green
];

// Create 3D text
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    const textGeometry = new THREE.TextGeometry('GDSC', {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    });

    const materials = colors.map(color => new THREE.MeshBasicMaterial({ color }));
    const textMesh = new THREE.Mesh(textGeometry, materials);
    
    // Center the text
    textGeometry.computeBoundingBox();
    const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
    textMesh.position.set(centerOffset, 3, 0); // Adjust position to middle top for mobile

    scene.add(textMesh);
});

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Adjust camera and renderer on window resize
window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
