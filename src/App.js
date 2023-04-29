import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import "./style.css"
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Ground } from './Ground';
import { PolarBear } from './PolarBear';
import { Rings } from './Rings';
import { Texture } from 'three';
import { Boxes } from './Boxes';
import Introduction from './Introduction';

function ElementShow() {
  return (
    <>
      {/* OrbitControls - helps move camera around a fixed point */}
      <OrbitControls target0={[0, 0.35, 0]} maxPolarAngle={1.45} /> 

      <PerspectiveCamera makeDefault fov={80} position={[3, 2, 5]} />

      {/* Mesh – a  Three.js class that represents a 3D object in the scene */}
      {/* This example is a red box, at the center of screen */}
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </mesh> */}

      {/* What you're doing for args is by telling Three.js -> let color = new Color(0,0,0); */}
      {/* Background = black */}
      <color args={[0, 0, 0]} attach="background" />

      {/*  */}
      <spotLight 
        // color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
          color={[0.14, 0.5, 1]}
          intensity={2}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
      />


      {/* Detecting surrounding reflections around the Polar Bear */}
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <PolarBear />
          </>
        )}
      </CubeCamera>

      {/* <Rings /> */}
      <Boxes />
      <Ground />
    </>
  )
}

function App() {
  return (
    // Suspense - a feature in the React library for handling asynchronous rendering
    <Suspense fallback={null}> 
      <Introduction />

      {/* Canvas - Three.js uses to render 3D graphics */}
      <Canvas shadows>
        <ElementShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
