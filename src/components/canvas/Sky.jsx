import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Sky = () => {
  const sky = useGLTF("./sky/scene.gltf");
  const skyRef = useRef();

  useFrame(() => {
    // Update the rotation of the sky based on its own rotation
    skyRef.current.rotation.y += 0.001;
  });

  return <primitive ref={skyRef} object={sky.scene} />;
};

const SkyCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas>
        <Suspense fallback={<CanvasLoader />}>
          {/* <OrbitControls autoRotate /> */}
          <Sky />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkyCanvas;
