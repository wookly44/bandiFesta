import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Water } from 'three-stdlib';
import * as THREE from 'three';
import { useInView } from "react-intersection-observer";
import waterNormalsFile from '../../../../../assets/waternormals.jpeg';

extend({ Water });

function SceneObject({ onLoaded }) {
    const { camera: threeCamera } = useThree();
    const gltf = useGLTF('/bandiFesta/bandifesta_3d.glb');
    const waterNormals = useLoader(THREE.TextureLoader, waterNormalsFile);
    
    const [scene, camera] = useMemo(() => [
        gltf.scene, 
        gltf.cameras && gltf.cameras.length > 0 ? gltf.cameras[0] : null
    ], [gltf.scene, gltf.cameras]);

    const animations = useAnimations(gltf.animations, scene);
    const waterRef = useRef();

    const waterPlane = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
    const waterConfig = useMemo(() => ({
        textureWidth: 512,
        textureHeight: 512,
        waterNormals,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: true
    }), [waterNormals]);

    useEffect(() => {
        if (camera) {
            const targetFOV = 35;
            threeCamera.fov = targetFOV;
            threeCamera.position.copy(camera.position);
            threeCamera.rotation.copy(camera.rotation);

            const fovFactor = Math.tan((camera.fov * Math.PI) / 360) / Math.tan((targetFOV * Math.PI) / 360);
            const direction = new THREE.Vector3();
            threeCamera.getWorldDirection(direction);
            threeCamera.position.addScaledVector(direction, -fovFactor * 2);
        } else {
            threeCamera.fov = 35;
            threeCamera.position.set(9, 4.5, 13);
            threeCamera.lookAt(2.5, 3, 1.8);
        }

        threeCamera.updateProjectionMatrix();
        scene.fog = new THREE.Fog('black', 5, 50);

        const actions = ['boat_float', 'boat_shake', 'kumo_flow1', 'kumo_flow2'];
        actions.forEach(action => animations.actions[action]?.play());

        if (onLoaded) onLoaded();
    }, [scene, camera, animations.actions, onLoaded, threeCamera]);

    useFrame((state, delta) => {
        if (waterRef.current) {
            waterRef.current.material.uniforms.time.value += delta * 0.25;
        }
    });

    return (
        <>
            <ambientLight intensity={0.45} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="white" />
            <mesh position={[6.5, 5, -5]}>
                <pointLight intensity={80.0} color="#ffaa00" distance={800} decay={0.8} />
            </mesh>
            <water ref={waterRef} args={[waterPlane, waterConfig]} rotation-x={-Math.PI / 2} />
            <primitive object={scene} />
        </>
    );
}

export default function Scene() {
    const canvasRef = useRef();
    const [loading, setLoading] = useState(true);
    const { ref: sceneRef, inView } = useInView({ threshold: 0 });

    useEffect(() => {
        let timer;
        let loadingTimer;

        if (!loading) {
            timer = setTimeout(() => {
                if (canvasRef.current?.parentElement?.parentElement) {
                    canvasRef.current.parentElement.parentElement.classList.add('active');
                }
            }, 1000);
        }

        return () => {
            clearTimeout(timer);
            clearTimeout(loadingTimer);
        };
    }, [loading]);

    return (
        <div className="scene" ref={sceneRef}>
            <div className={`loadingBackdrop${!loading ? ' hidden' : ''}`} />
            <Canvas
                className="canvas"
                ref={canvasRef}
                frameloop={inView ? 'always' : 'demand'}
                gl={{ antialias: true, powerPreference: "high-performance" }}
            >
                <Suspense fallback={null}>
                    <SceneObject onLoaded={() => setLoading(false)} />
                </Suspense>
            </Canvas>
        </div>
    );
}