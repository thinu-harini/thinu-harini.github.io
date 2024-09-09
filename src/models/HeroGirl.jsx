/*
Auto-generated by: https://github.com/pmndrs/gltfjsx and edited
Author: Thinu Harini
Title: Girl
*/

import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import girlScene from '../assets/3d/girl.glb';

const HeroGirlModel = ({ ...props }) => {
  const girlRef = useRef();
  const target = useRef(new THREE.Object3D());
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);

  // Access the camera and GL renderer from react-three-fiber
  const { camera, gl } = useThree();

  const { nodes, materials, animations } = useGLTF(girlScene);
  const { actions } = useAnimations(animations, girlRef);

  useEffect(() => {
    const startWaveAnimation = () => {
      Object.values(actions).forEach((action) => {
        if (action) {
          action.stop();
        }
      });

      const waveAction = actions['wave'];
      if (waveAction) {
        waveAction.reset().play().setLoop(THREE.LoopOnce); // Set 'wave' animation to loop once
        waveAction.clampWhenFinished = true;

        setTimeout(startWaveAnimation, 10000); // Schedule the next wave animation after 30 seconds
      } else {
        console.warn('Action "wave" not found in actions:', actions);
      }
    };

    // Start the initial wave animation
    startWaveAnimation();

    // Clean up the timeout on component unmount
    return () => clearTimeout();
  }, [actions]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (event) => {
    if (isLargeScreen) {
      const { clientX, clientY } = event;

      const canvasBounds = gl.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1,
        -((clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), target.current.position), intersection);

      target.current.position.copy(intersection);
    } else {
      // For smaller screens, set the head to a fixed position
      target.current.position.set(-1, 1, 5);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLargeScreen]);

  useFrame(() => {
    if (girlRef.current) {
      const head = girlRef.current.getObjectByName('mixamorigHead');
      if (head) {
        if (isLargeScreen) {
          head.lookAt(target.current.position);
        } else {
          // Set fixed rotation for smaller screens
          head.rotation.set(
            THREE.MathUtils.degToRad(-20),
            THREE.MathUtils.degToRad(-8),
            THREE.MathUtils.degToRad(0)
          );
        }
      }
    }
  });

  //scaling the head
  useFrame(() => {
    if (girlRef.current) {
      const head = girlRef.current.getObjectByName('mixamorigHead');
      if (head) {
        head.scale.set(0.8, 0.8, 0.8);
      }
    }
  });

  return (
    <group ref={girlRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials['skin color']}
            skeleton={nodes.body.skeleton}
          />
          <skinnedMesh
            name="hair_base"
            geometry={nodes.hair_base.geometry}
            material={materials['hair color']}
            skeleton={nodes.hair_base.skeleton}
          />
          <skinnedMesh
            name="shirt"
            geometry={nodes.shirt.geometry}
            material={materials['shirt color']}
            skeleton={nodes.shirt.skeleton}
          />
          <skinnedMesh
            name="shoes"
            geometry={nodes.shoes.geometry}
            material={materials['light hair color ']}
            skeleton={nodes.shoes.skeleton}
          />
          <skinnedMesh
            name="trouser"
            geometry={nodes.trouser.geometry}
            material={materials['trouser color']}
            skeleton={nodes.trouser.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
};

export default HeroGirlModel; 