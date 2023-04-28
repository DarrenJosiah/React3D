import React, { useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh } from 'three'

export function PolarBear() {
    
    // "Polar Bear" (https://skfb.ly/6S7wF) by cedes is licensed under Creative Commons Attribution-ShareAlike (http://creativecommons.org/licenses/by-sa/4.0/)
    
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + 'models/polar_bear/scene.gltf'
    )

    useEffect(() => {
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        gltf.scene.position.set(0. -0.035, 0);

        // There are sub-components in the drawing, eg. legs, head...
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf]);

    return <primitive object={gltf.scene} />;
}