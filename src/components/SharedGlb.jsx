// sharedGlb.js
import { useGLTF } from "@react-three/drei";
import girlScene from "../assets/3d/girl.glb";
import contactAnimalScene from '../assets/3d/girl.glb';

export const useGirlGLTF = () => useGLTF(girlScene);
export const useContactAnimalGLTF = () => useGLTF(contactAnimalScene);
