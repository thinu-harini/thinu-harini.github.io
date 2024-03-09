import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Eyes = ({ scene, eyesNames }) => {
  const eyesRefs = useRef([]);

  useEffect(() => {
    // Populate the eyesRefs array with refs for each named mesh
    eyesRefs.current = eyesNames.map((name) => {
      const eyesObject = scene.getObjectByName(name);
      if (eyesObject && eyesObject.isMesh) {
        return eyesObject;
      } else {
        console.error(`Mesh named "${name}" not found or is not a valid Mesh.`);
        return null;
      }
    });
  }, [scene, eyesNames]);

  useFrame(({ mouse }) => {
    eyesRefs.current.forEach((eyesRef) => {
      if (eyesRef) {
        // Get mouse coordinates
        const mouseX = (mouse.x * window.innerWidth) / 2;
        const mouseY = (mouse.y * window.innerHeight) / 2;

        const targetRotationY = (mouseX / window.innerWidth) * 0.01;
        const targetRotationX = (mouseY / window.innerHeight) * Math.PI * -0.1;

        eyesRef.rotation.y += (targetRotationY - eyesRef.rotation.y) * 0.1;
        eyesRef.rotation.x += (targetRotationX - eyesRef.rotation.x) * 0.1;
      }
    });
  });

  useEffect(() => {
    if (scene) {
      const allMeshes = [];

      // Traverse the scene and collect all mesh objects
      scene.traverse((object) => {
        if (object.isMesh) {
          allMeshes.push(object);
        }
      });

      // Log the names of all mesh objects
      const meshNames = allMeshes.map((mesh) => mesh.name);
      console.log('All Mesh Names:', meshNames);
    }
  }, [scene]);

  return (
    <>
      {eyesRefs.current.map((eyesRef, index) => (
        eyesRef ? <primitive key={index} object={eyesRef} /> : null
      ))}
    </>
  );
};

export default Eyes;