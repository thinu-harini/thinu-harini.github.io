import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Girl = ({ isMobile }) => {
  const girl = useGLTF("./cartoon_girl/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor='black' />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      <hemisphereLight skyColor="#ffffff" groundColor="#000000" intensity={0.4} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={{ width: 1024, height: 1024 }}
      />
      <pointLight intensity={1} />
      <primitive
        object={girl.scene}
        scale={isMobile ? 2.8 : 3.1} //0.8 : 4.2
        position={isMobile ? [0, -2.8, 0] : [0, -2.6, 0]}
        rotation={[0, 1, 0]}
      />
    </mesh>
  );
};

const GirlCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    // camera={{ position: [-4, 3, 6], near: 0.1, far: 200, fov: 55 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          // reverseOrbit
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
        // autoRotateSpeed={2}
        />
        <Girl isMobile={isMobile} />
      </Suspense>
      <Preload all />

    </Canvas>
  );
};

export default GirlCanvas;