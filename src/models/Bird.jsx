import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from '@react-three/drei';

import birdScene from "../assets/3d/dragapult.glb";

const Bird = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (isRotating) {
      actions["Armature|Armature|pm0887_00_00_ba10_waitA01|Base Layer"].play();
    } else {
      actions["Armature|Armature|pm0887_00_00_ba02_roar01|Base Layer"].stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  )
}


export default Bird 