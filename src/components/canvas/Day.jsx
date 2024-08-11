

// export default DayCanvas;


// import React, { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
// import CanvasLoader from "../CanvasLoader";

// const Sky = () => {
//   const sky = useGLTF("./sky1/scene.gltf");
//   const skyRef = useRef();

//   useFrame(() => {
//     // Update the rotation of the sky based on its own rotation
//     skyRef.current.rotation.y += 0.001;
//   });

//   return <primitive ref={skyRef} object={sky.scene} />;
// };

// const DayCanvas = () => {
//   return (
//     <div className='w-full h-auto absolute inset-0 z-[-1]'>
//       <Canvas>
//         <Suspense fallback={<CanvasLoader />}>
//           {/* <OrbitControls autoRotate /> */}
//           <Sky />
//           <Preload all />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// };

// export default DayCanvas;


import React from 'react';
import cloud from '/src/assets/cloud.png';

const DayCanvas = () => {
  return (
    <div className='day-bg w-full h-auto absolute inset-0 z-[-1]'>
      <div className="cloud">
        <img src={cloud} alt="cloud1" className="cloud1" />
        <img src={cloud} alt="cloud2" className="cloud2" />
        <img src={cloud} alt="cloud3" className="cloud3" />
        <img src={cloud} alt="cloud4" className="cloud4" />
      </div>
    </div>
  );
};

export default DayCanvas;