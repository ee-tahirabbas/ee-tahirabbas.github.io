/* ============================================================
   Hero 3D scene — a small power network rendered in three.js.
   Nodes = substations, lines = transmission paths, traveling
   sparks = current. Falls back to a static render if three.js
   fails to load or the user prefers reduced motion.
   ============================================================ */
(function () {
  var wrap = document.getElementById("hero-canvas-wrap");
  if (!wrap || typeof THREE === "undefined") return;

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isSmall = window.innerWidth < 720;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
  camera.position.set(0, 1.4, 13);

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  wrap.appendChild(renderer.domElement);

  var group = new THREE.Group();
  scene.add(group);

  // ---- Build node layout: three layers, like a one-line diagram ----
  var layerY = [3.2, 0, -3.2];
  var layerCount = [4, 6, 4];
  var nodes = [];
  var layers = [];

  layerY.forEach(function (y, li) {
    var count = layerCount[li];
    var layerNodes = [];
    for (var i = 0; i < count; i++) {
      var x = (i - (count - 1) / 2) * 2.6;
      var z = (Math.random() - 0.5) * 2.4;
      var pos = new THREE.Vector3(x, y, z);
      nodes.push(pos);
      layerNodes.push(pos);
    }
    layers.push(layerNodes);
  });

  // ---- Edges: connect adjacent layers + bus links within mid layer ----
  var edges = [];
  function nearestLinks(fromLayer, toLayer, linksPer) {
    fromLayer.forEach(function (fromPos) {
      var sorted = toLayer.slice().sort(function (a, b) {
        return a.distanceTo(fromPos) - b.distanceTo(fromPos);
      });
      for (var k = 0; k < linksPer; k++) {
        if (sorted[k]) edges.push([fromPos, sorted[k]]);
      }
    });
  }
  nearestLinks(layers[0], layers[1], 2);
  nearestLinks(layers[1], layers[2], 1);
  for (var m = 0; m < layers[1].length - 1; m++) {
    edges.push([layers[1][m], layers[1][m + 1]]);
  }

  // ---- Materials ----
  var cyan = new THREE.Color(0x54c7d4);
  var copper = new THREE.Color(0xc97a3d);

  var lineMat = new THREE.LineBasicMaterial({ color: 0x3a4252, transparent: true, opacity: 0.55 });
  var nodeGeo = new THREE.IcosahedronGeometry(0.14, 0);

  edges.forEach(function (pair) {
    var geo = new THREE.BufferGeometry().setFromPoints(pair);
    var line = new THREE.Line(geo, lineMat);
    group.add(line);
  });

  nodes.forEach(function (pos, idx) {
    var color = idx % 5 === 0 ? copper : cyan;
    var mat = new THREE.MeshBasicMaterial({ color: color });
    var mesh = new THREE.Mesh(nodeGeo, mat);
    mesh.position.copy(pos);
    group.add(mesh);

    var haloMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.18 });
    var halo = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), haloMat);
    halo.position.copy(pos);
    group.add(halo);
  });

  // ---- Traveling sparks (current flow) ----
  var sparkGeo = new THREE.SphereGeometry(0.06, 8, 8);
  var sparks = [];
  var SPARK_COUNT = isSmall ? 4 : 8;
  for (var s = 0; s < SPARK_COUNT; s++) {
    var mat = new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? cyan : copper });
    var mesh = new THREE.Mesh(sparkGeo, mat);
    group.add(mesh);
    sparks.push({
      mesh: mesh,
      edge: edges[Math.floor(Math.random() * edges.length)],
      t: Math.random(),
      speed: 0.25 + Math.random() * 0.25
    });
  }

  group.rotation.x = -0.12;
  group.position.y = -0.3;

  // ---- Mouse parallax ----
  var mouseX = 0, mouseY = 0;
  window.addEventListener("mousemove", function (e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ---- Resize ----
  window.addEventListener("resize", function () {
    camera.aspect = wrap.clientWidth / wrap.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  });

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    var dt = Math.min(clock.getDelta(), 0.05);

    if (!prefersReduced) {
      group.rotation.y += dt * 0.09;
      group.rotation.x += ((-0.12 + mouseY * 0.12) - group.rotation.x) * 0.04;

      sparks.forEach(function (spark) {
        spark.t += dt * spark.speed;
        if (spark.t >= 1) {
          spark.t = 0;
          spark.edge = edges[Math.floor(Math.random() * edges.length)];
        }
        var a = spark.edge[0], b = spark.edge[1];
        spark.mesh.position.lerpVectors(a, b, spark.t);
      });
    }

    renderer.render(scene, camera);
  }

  if (prefersReduced) {
    renderer.render(scene, camera);
  } else {
    animate();
  }
})();
