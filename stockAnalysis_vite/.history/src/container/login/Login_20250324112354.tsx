import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const stockSymbols = [
  "AAPL",
  "TSLA",
  "MSFT",
  "GOOGL",
  "AMZN",
  "NVDA",
  "META",
  "NFLX",
  "AMD",
  "BABA",
];

function getRandomStock() {
  const symbol = stockSymbols[Math.floor(Math.random() * stockSymbols.length)];
  const price = (Math.random() * 1000).toFixed(2);
  const change = (Math.random() * 10 - 5).toFixed(2);
  return {
    symbol,
    price,
    change,
    color: change >= "0" ? "#00ff00" : "#ff4444",
  };
}

const FloatingStock = ({
  position,
}: {
  position: [number, number, number];
}) => {
  const textRef = useRef<THREE.Mesh>(null);
  const [stock, setStock] = useState(getRandomStock());

  useFrame(() => {
    if (textRef.current) {
      textRef.current.position.y += 0.01; // 向上移動
      if (textRef.current.position.y > 5) {
        textRef.current.position.y = -5; // 重置位置
        setStock(getRandomStock()); // 更新股票數據
      }
    }
  });

  return (
    <Text ref={textRef} position={position} fontSize={0.5} color={stock.color}>
      {`${stock.symbol} ${stock.price} (${stock.change})`}
    </Text>
  );
};

function NeonBackground() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh ref={mesh} scale={[15, 15, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        attach="material"
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
        fragmentShader={`
            varying vec2 vUv;
            uniform float uTime;
            void main() {
              vec3 neonColor = vec3(0.0, 1.0, 1.0);
              float glow = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
              gl_FragColor = vec4(neonColor * glow, 0.3); // 透明度 0.3，避免影響股票數據
            }
          `}
        transparent
      />
    </mesh>
  );
}

export default function Login() {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <NeonBackground />
          {Array.from({ length: 20 }).map((_, i) => (
            <FloatingStock
              key={i}
              position={[
                (Math.random() - 0.5) * 10,
                Math.random() * 10 - 5,
                (Math.random() - 0.5) * 3,
              ]}
            />
          ))}
        </Canvas>
      </div>

      {/* 右側登入表單 */}
      <div className="relative z-10 w-full max-w-sm bg-gray-900 bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-neon">登入</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-neon mb-1">帳號</label>
            <Input
              className="w-full bg-gray-800 border border-neon text-white p-2 rounded"
              placeholder="請輸入帳號"
            />
          </div>
          <div>
            <label className="block text-neon mb-1">密碼</label>
            <Input
              type="password"
              className="w-full bg-gray-800 border border-neon text-white p-2 rounded"
              placeholder="請輸入密碼"
            />
          </div>
          <Button className="w-full" variant={"ghost"}>
            登入
          </Button>
        </form>
      </div>
    </div>
  );
}
