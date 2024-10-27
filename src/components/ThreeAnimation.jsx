import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text, Sphere } from '@react-three/drei';

function BirthdayCake() {
  const cakeRef = useRef();
  const candleRef = useRef();

  useFrame((state, delta) => {
    cakeRef.current.rotation.y += delta * 0.5;
    candleRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1.5;
  });

  return (
    <group>
      <Box ref={cakeRef} args={[2, 1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FFC0CB" />
      </Box>
      <Sphere ref={candleRef} args={[0.1, 32, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
      </Sphere>
      <Text
        position={[0, 0.6, 1.01]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.2}
        color="#FF1493"
      >
        Happy Birthday!
      </Text>
    </group>
  );
}

function ThreeAnimation() {
  return (
    <div className="w-full h-64">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BirthdayCake />
      </Canvas>
    </div>
  );
}

export default ThreeAnimation;