import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Box({ color }) {
    const box = useRef();

    const [xRotationSpeed] = useState(() => Math.random());
    const [yRotationSpeed] = useState(() => Math.random());

    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

    const [position, setPosition] = useState(resetPosition());

    function resetPosition() {
        // Vector3(x, y, z):
        let v = new Vector3( (Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
        
        // Space 2 units from Polar Bear
        if (v.x < 0) v.x -= 2;
        if (v.x > 0) v.x += 2;

        return v;
        // setPosition(v);
    }

    useFrame((state, delta) => {
        box.current.position.set(position.x, position.y, position.z);
        box.current.rotation.x += delta * xRotationSpeed;
        box.current.rotation.y += delta * yRotationSpeed;
    }, [xRotationSpeed, yRotationSpeed, position]);

    return (
        <mesh ref={box} scale={scale} castShadow>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={color} envMapIntensity={0.15}/>
        </mesh>
    );
}

export function Boxes() {
    const [arr] = useState(() => {
        let a = [];
        for (let i = 0; i < 100; i++) a.push(0);
        return a;
    });

    return <>
        {arr.map((e, i) => <Box key={i} color={i % 2 === 0 ? [0.8, 1.15, 1.7] : [0.1, 0.7, 3]} />)}
    </>
}