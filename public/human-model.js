import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;
let raycaster, mouse;
let markers = [];
let humanGroup;
let isLoaded = false;

// Detailed anatomical markers matching innerbody.com reference style
const markerData = [
    // Head & Neck
    { part: 'frontalis', pos: [0, 1.72, 0.08], name: "Frontalis" },
    { part: 'temporalis', pos: [0.08, 1.7, 0], name: "Temporalis" },
    { part: 'masseter', pos: [0.07, 1.62, 0.06], name: "Masseter" },
    { part: 'sternocleidomastoid', pos: [0.06, 1.5, 0.05], name: "Sternocleidomastoid" },
    { part: 'trapezius', pos: [0.12, 1.45, -0.05], name: "Trapezius" },

    // Torso (Front)
    { part: 'pectoralis_major', pos: [0.15, 1.35, 0.12], name: "Pectoralis Major" },
    { part: 'pectoralis_minor', pos: [0.22, 1.4, 0.1], name: "Pectoralis Minor" }, // Deep to major, visualized
    { part: 'rectus_abdominis', pos: [0.05, 1.05, 0.11], name: "Rectus Abdominis" },
    { part: 'external_oblique', pos: [0.18, 1.0, 0.08], name: "External Oblique" },
    { part: 'serratus_anterior', pos: [0.22, 1.2, 0.05], name: "Serratus Anterior" },

    // Torso (Back)
    { part: 'latissimus_dorsi', pos: [0.18, 1.1, -0.1], name: "Latissimus Dorsi" },
    { part: 'infraspinatus', pos: [0.15, 1.4, -0.1], name: "Infraspinatus" },
    { part: 'teres_major', pos: [0.22, 1.35, -0.08], name: "Teres Major" },
    { part: 'erector_spinae', pos: [0, 1.0, -0.1], name: "Erector Spinae" },

    // Shoulder & Arm
    { part: 'deltoid_anterior', pos: [0.26, 1.42, 0.06], name: "Deltoid (Anterior)" },
    { part: 'deltoid_lateral', pos: [0.30, 1.42, 0], name: "Deltoid (Lateral)" },
    { part: 'deltoid_posterior', pos: [0.26, 1.42, -0.06], name: "Deltoid (Posterior)" },
    { part: 'biceps_brachii', pos: [0.28, 1.2, 0.06], name: "Biceps Brachii" },
    { part: 'triceps_brachii', pos: [0.28, 1.2, -0.06], name: "Triceps Brachii" },
    { part: 'brachioradialis', pos: [0.32, 1.0, 0.02], name: "Brachioradialis" },
    { part: 'flexor_carpi_radialis', pos: [0.32, 0.8, 0.05], name: "Flexor Carpi Radialis" },
    { part: 'extensor_digitorum', pos: [0.32, 0.8, -0.05], name: "Extensor Digitorum" },

    // Hip & Leg
    { part: 'gluteus_maximus', pos: [0.12, 0.85, -0.12], name: "Gluteus Maximus" },
    { part: 'gluteus_medius', pos: [0.18, 0.9, -0.05], name: "Gluteus Medius" },
    { part: 'tensor_fasciae_latae', pos: [0.18, 0.85, 0.08], name: "Tensor Fasciae Latae" },
    { part: 'sartorius', pos: [0.12, 0.7, 0.1], name: "Sartorius" },
    { part: 'rectus_femoris', pos: [0.10, 0.55, 0.1], name: "Rectus Femoris" },
    { part: 'vastus_lateralis', pos: [0.16, 0.55, 0.08], name: "Vastus Lateralis" },
    { part: 'vastus_medialis', pos: [0.06, 0.45, 0.08], name: "Vastus Medialis" },
    { part: 'adductor_longus', pos: [0.04, 0.65, 0.05], name: "Adductor Longus" },
    { part: 'gracilis', pos: [0.02, 0.55, 0.05], name: "Gracilis" },
    { part: 'biceps_femoris', pos: [0.12, 0.5, -0.08], name: "Biceps Femoris" },
    { part: 'semitendinosus', pos: [0.06, 0.5, -0.08], name: "Semitendinosus" },

    // Lower Leg
    { part: 'tibialis_anterior', pos: [0.08, 0.2, 0.06], name: "Tibialis Anterior" },
    { part: 'gastrocnemius', pos: [0.10, 0.25, -0.08], name: "Gastrocnemius" },
    { part: 'soleus', pos: [0.10, 0.15, -0.06], name: "Soleus" },
    { part: 'peroneus_longus', pos: [0.14, 0.2, 0], name: "Peroneus Longus" },
];

export function init3DModel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.Fog(0x0f172a, 3, 12);

    // CAMERA
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 4);

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.5;
    controls.maxDistance = 6;
    controls.target.set(0, 0.9, 0);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Low ambient
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0f172a, 0.6); // Sky/Ground
    scene.add(hemiLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(2, 4, 3);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048; // High res shadow
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    const rimLight = new THREE.SpotLight(0x6366f1, 5); // Intense Rim
    rimLight.position.set(-2, 3, -4);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // RAYCASTER
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // MODEL
    createHuman();

    // EVENTS
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    animate();
}

function createHuman() {
    humanGroup = new THREE.Group();
    scene.add(humanGroup);

    const loader = new GLTFLoader();
    const loadingElem = document.getElementById('loading-3d');
    if (loadingElem) loadingElem.innerText = "Loading Anatomical Model...";

    const modelUrl = './human_model.glb';

    loader.load(modelUrl,
        (gltf) => {
            const model = gltf.scene;

            // Normalize Model
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            if (size.length() === 0) return;

            // Rescale to approx 1.8m height
            const targetHeight = 1.8;
            const scaleFactor = targetHeight / size.y;
            model.scale.set(scaleFactor, scaleFactor, scaleFactor);

            // Re-center
            model.position.x = -center.x * scaleFactor;
            model.position.y = -box.min.y * scaleFactor;
            model.position.z = -center.z * scaleFactor;

            // Apply "Muscle" Material Styles
            // Premium "Anatomy" Material
            const muscleMaterial = new THREE.MeshStandardMaterial({
                color: 0x8b0000, // Deep blood red
                roughness: 0.4,  // Slightly shiny like tissue
                metalness: 0.15,
                transparent: true, // Enable transparency
                opacity: 0.9,      // Slightly translucent
                side: THREE.DoubleSide
            });

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // Override texture with muscle material
                    child.material = muscleMaterial;
                }
            });

            humanGroup.add(model);

            // Reposition markers based on new scale
            createMarkers();

            if (loadingElem) loadingElem.remove();
            isLoaded = true;
            console.log("Model Loaded Successfully");
        },
        (xhr) => {
            if (loadingElem && xhr.total > 0) {
                const percent = (xhr.loaded / xhr.total * 100).toFixed(0);
                loadingElem.innerText = `Loading Body: ${percent}%`;
            }
        },
        (error) => {
            console.error('An error happened loading the model:', error);
            if (loadingElem) loadingElem.innerHTML = `
                Error loading model.<br>
                <div style="font-size:12px; margin-top:10px; opacity:0.7;">
                    Please ensure <b>human_model.glb</b> is in public folder.
                </div>
            `;
        }
    );
}

function createMarkers() {
    const markerGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });

    markerData.forEach(data => {
        // Create Left
        const meshL = new THREE.Mesh(markerGeo, markerMat.clone());
        meshL.position.set(data.pos[0], data.pos[1], data.pos[2]);
        meshL.userData = { part: data.part, name: data.name };
        humanGroup.add(meshL);
        markers.push(meshL);

        // Mirror Right if x is significant
        if (Math.abs(data.pos[0]) > 0.01) {
            const meshR = new THREE.Mesh(markerGeo, markerMat.clone());
            meshR.position.set(-data.pos[0], data.pos[1], data.pos[2]);
            meshR.userData = { part: data.part, name: data.name }; // Keep same ID for simplicity
            humanGroup.add(meshR);
            markers.push(meshR);
        }
    });
}

function onWindowResize() {
    const container = renderer.domElement.parentElement;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function onMouseMove(event) {
    event.preventDefault();
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Hover effect
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(markers);

    markers.forEach(m => {
        if (m !== window.selectedMarker) {
            m.material.color.set(0xffffff);
            m.scale.set(1, 1, 1);
            m.material.opacity = 0.5;
        }
    });

    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const hovered = intersects[0].object;
        if (hovered !== window.selectedMarker) {
            hovered.material.color.set(0x818cf8);
            hovered.scale.set(1.5, 1.5, 1.5);
            hovered.material.opacity = 1;
        }
    } else {
        document.body.style.cursor = 'default';
    }
}

function onMouseClick(event) {
    event.preventDefault();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(markers);

    if (intersects.length > 0) {
        const selected = intersects[0].object;
        window.selectedMarker = selected;

        // Visual highlight
        markers.forEach(m => {
            m.material.color.set(0xffffff);
            m.scale.set(1, 1, 1);
        });
        selected.material.color.set(0x6366f1); // Indigo Active
        selected.scale.set(2, 2, 2);

        // Dispatch selection
        const evt = new CustomEvent('bodyPartSelected', {
            detail: {
                part: selected.userData.part,
                name: selected.userData.name
            }
        });
        document.dispatchEvent(evt);
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
