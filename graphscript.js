// Initialize variables
var scene, camera, renderer, controls;
var vertices = [];
var colors = [];

// Define the function to be graphed
function functionToGraph(x, y) {
  // Graph the hyperbolic paraboloid surface
  return x * x - y * y;
}

init();
animate();

function init() {
  // Create scene and renderer
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 1);
  document.body.appendChild(renderer.domElement);

  // Create camera and add to scene
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(5, 5, 5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  // Add axes helper to the scene
  var axesHelper = new THREE.AxesHelper(20);
  axesHelper.material.linewidth = 20;
  scene.add(axesHelper);

  // Add grid helper to the scene
  var gridHelper = new THREE.GridHelper(22, 22);
  gridHelper.material.color.setHex(0xFFA500); // set grid color to orange
  scene.add(gridHelper);

  // Create plane geometry and material
  var planeGeometry = new THREE.PlaneGeometry(22, 22);
  var planeMaterial = new THREE.MeshBasicMaterial({color: 0x808080, side: THREE.DoubleSide});

  // Create plane mesh and add to scene
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI / 2; // rotate the plane to be perpendicular to the object at the origin
  scene.add(plane);

  // Generate vertices and colors
  var x, y, z, color;
  for (x = -5; x <= 5; x += 0.1) {
    for (y = -5; y <= 5; y += 0.1) {
      z = functionToGraph(x, y);
      vertices.push(new THREE.Vector3(x, y, z));
      color = new THREE.Color(0x000000);
      colors.push(color);
    }
  }

  // Create geometry object
  var geometry = new THREE.ParametricGeometry(function (u, v, dest) {
    var i = Math.floor(u * 100);
    var j = Math.floor(v * 100);
    dest.copy(vertices[i * 101 + j]);
  }, 101, 101);

  // Assign colors to the geometry
  geometry.colors = colors;

  // Create material and mesh
  var material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
  });
  var mesh = new THREE.Points(geometry, material);

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
