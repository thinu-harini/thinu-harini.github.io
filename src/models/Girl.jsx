/*
Auto-generated by: https://github.com/pmndrs/gltfjsx and edited
Author: Thinu Harini
Title: Girl
*/
import * as THREE from 'three';
import React, { useEffect, useRef } from "react";
import { useAnimations } from "@react-three/drei";

import girlScene from '../assets/3d/girl.glb';
import { useSkinnedMeshClone } from "../hooks/skinnedMeshClone";

const Girl = ({ currentAnimation, ...props }) => {
  const girlRef = useRef();

  // Using custom hook for loading and cloning skinned meshes
  const { nodes, materials, animations } = useSkinnedMeshClone(girlScene);

  const { actions } = useAnimations(animations, girlRef);

  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());

    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation])

  return (
    <group ref={girlRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials["skin color"]}
            skeleton={nodes.body.skeleton}
          />
          <skinnedMesh
            name="hair_base"
            geometry={nodes.hair_base.geometry}
            material={materials["hair color"]}
            skeleton={nodes.hair_base.skeleton}
          />
          <skinnedMesh
            name="shirt"
            geometry={nodes.shirt.geometry}
            material={materials["shirt color"]}
            skeleton={nodes.shirt.skeleton}
          />
          <skinnedMesh
            name="shoes"
            geometry={nodes.shoes.geometry}
            material={materials["light hair color "]}
            skeleton={nodes.shoes.skeleton}
          />
          <skinnedMesh
            name="trouser"
            geometry={nodes.trouser.geometry}
            material={materials["trouser color"]}
            skeleton={nodes.trouser.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
};

export default Girl;