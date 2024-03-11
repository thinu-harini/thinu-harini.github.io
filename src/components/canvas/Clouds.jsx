import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";

const Clouds = (props) => {
  return (
    <Sky
      distance={450000}
      sunPosition={[0, 1, 1]}
      inclination={0}
      azimuth={0.1}
      sunColor="#ff1c42"   // Set sun color
      groundColor="#ffffff"   // Set ground color
      sunIntensity={5}  // Set sun intensity
      rayleigh={1}        // Set atmospheric scattering
      mieCoefficient={0.005} // Set air molecules scattering
      {...props}
    />
  )
};

const CloudsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Clouds />
        </Suspense>

      </Canvas>
    </div>
  );
};

export default CloudsCanvas;