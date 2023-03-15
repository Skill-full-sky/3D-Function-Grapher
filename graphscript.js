// Initialize variables
var scene, camera, renderer, controls;
var vertices = [];

// Define the function to be graphed
function functionToGraph(x, y) {
  // Change this function to graph a hyperbolic paraboloid
  return x * x - y * y;
}

init();
animate();

function init() {
  // Create scene and renderer
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create camera and add to scene
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  scene.add(camera);

  // Add plane and axis helper to the scene
  var planeGeometry = new THREE.PlaneGeometry(2, 2, 10, 10);
  var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x555555,
    wireframe: true,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);

  var axisHelper = new THREE.AxesHelper(2);
  scene.add(axisHelper);

  // Generate vertices
  var x, y, z;
  for (x = -1; x <= 1; x += 0.1) {
    for (y = -1; y <= 1; y += 0.1) {
      z = functionToGraph(x, y);
      vertices.push(new THREE.Vector3(x, y, z));
    }
  }

  // Create geometry object
  var geometry = new THREE.ParametricGeometry(function (u, v, dest) {
    var i = Math.floor(u * 10);
    var j = Math.floor(v * 10);
    dest.set(
      vertices[i * 10 + j].x,
      vertices[i * 10 + j].y,
      vertices[i * 10 + j].z
    );
  }, vertices.length, vertices.length);

  // Create material and mesh
  var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  var mesh = new THREE.Mesh(geometry, material);

  // Add mesh to the scene
  scene.add(mesh);

  // Create mouse controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
