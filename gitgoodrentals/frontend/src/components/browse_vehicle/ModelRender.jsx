import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BASE_URL } from '@/constants';

const ModelRender = ({ vehicle }) => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    // Set the renderer size to match the container div
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Set the background color to grey
    scene.background = new THREE.Color(0xffffff);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0); // Set the point to look at
    controls.update();

    const loader = new FBXLoader();

    const INTENSITY = 3;

    // Add lights to the scene
    const light1 = new THREE.DirectionalLight(0xffffff, 10);
    light1.position.set(0, 10, 0);
    light1.intensity = INTENSITY;
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 10);
    light2.position.set(10, 10, 0);
    light2.intensity = INTENSITY;
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xffffff, 10);
    light3.position.set(-10, 10, 0);
    light3.intensity = INTENSITY;
    scene.add(light3);

    const light4 = new THREE.DirectionalLight(0xffffff, 10);
    light4.position.set(0, 10, 10);
    light4.intensity = INTENSITY;
    scene.add(light4);

    const light5 = new THREE.DirectionalLight(0xffffff, 10);
    light5.position.set(0, 10, -10);
    light5.intensity = INTENSITY;
    scene.add(light5);

    // Add a sixth light that shines directly down on the car
    const light6 = new THREE.DirectionalLight(0xffffff, 10);
    light6.position.set(0, -10, 0); // Position the light above the car
    light6.intensity = INTENSITY;
    scene.add(light6);

    loader.load(
      `${BASE_URL}models/${vehicle.model}.fbx`,
      function (object) {

        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const scaleFactor = 1 / Math.max(size.x, size.y, size.z);
    
        object.scale.set(scaleFactor, scaleFactor, scaleFactor);
    
        object.rotation.x = Math.PI;
        object.position.set(0,0,0);
    
        scene.add(object);
      },
      undefined,
      function (error) {
        console.error('An error occurred while loading the 3D model', error);
      }
    );

    camera.position.set(0,-0.5, -0.7);

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }, [vehicle]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
      <div
        ref={containerRef}
        className="rounded-lg w-full sm:w-48 aspect-square overflow-hidden"
        style={{ height: 500, width: 500 }}
      />
    </div>
  );
};

export default ModelRender;