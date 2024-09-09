/*
Auto-generated by: https://github.com/pmndrs/gltfjsx and edited
Author: Thinu Harini
Title: Girl
*/

import React, { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from 'three';
import girlScene from '../assets/3d/girl.glb';

const ContactGirlModel = ({ currentAnimation, ...props }) => {
  const girlRef = useRef();
  const { nodes, materials, animations } = useGLTF(girlScene);
  const { actions } = useAnimations(animations, girlRef);

  useEffect(() => {
    // Stop all animations
    Object.values(actions).forEach((action) => action.stop());

    // Play the animation based on currentAnimation prop
    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation])

  useFrame(() => {
    if (girlRef.current) {
      const rightForeArmBone = girlRef.current.getObjectByName('mixamorigRightForeArm');

      if (rightForeArmBone) {
        // Adjust the bone rotation a little bit
        rightForeArmBone.rotation.x = MathUtils.degToRad(10);
        rightForeArmBone.rotation.y = MathUtils.degToRad(-10);
        rightForeArmBone.rotation.z = MathUtils.degToRad(-20);
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

export default ContactGirlModel;