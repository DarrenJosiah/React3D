import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Ground() {
 
    // Image by Rob Tuytel from Polyhaven
    // https://polyhaven.com/textures

    const [concrete, asphalt] = useLoader(TextureLoader, [
        process.env.PUBLIC_URL + "textures/terrain-concrete.jpg",
        process.env.PUBLIC_URL + "textures/terrain-asphalt.jpg",
    ]);

    useEffect(() => {
        [concrete, asphalt].forEach((t) => {
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(5, 5);
        });
        
        concrete.encoding = LinearEncoding;
    }, [concrete, asphalt]); 

    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
            
            {/* https://threejs.org/docs/#api/en/geometries/PlaneGeometry */}
            
            <planeGeometry args={[30, 30]} />
            <MeshReflectorMaterial
                roughnessMap={concrete}
                envMapIntensity={0}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[1000, 400]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                mirror={0}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                debug={0}
                reflectorOffset={0.2}
            />
        </mesh>
    )
}