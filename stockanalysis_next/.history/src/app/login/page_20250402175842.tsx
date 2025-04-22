"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import api from "../../services/apis";

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
    color: parseFloat(change) >= 0 ? "#00ff00" : "#ff4444",
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
      textRef.current.position.y += 0.01;
      if (textRef.current.position.y > 5) {
        textRef.current.position.y = -5;
        setStock(getRandomStock());
      }
    }
  });

  return (
    <Text3D ref={textRef} position={position}>
      {`${stock.symbol} ${stock.price} (${stock.change})`}
    </Text3D>
  );
};

function NeonBackground() {
  const mesh = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
      materialRef.current.uniforms.resolution.value.set(
        size.width,
        size.height
      );
    }
  });

  return (
    <mesh ref={mesh} scale={[15, 15, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        uniforms={{
          uTime: { value: 0 },
          resolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
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
            uniform vec2 resolution;
            void main() {
              vec3 neonColor = vec3(0.0, 1.0, 1.0);
              float glow = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
              gl_FragColor = vec4(neonColor * glow, 0.3);
            }
          `}
        transparent
      />
    </mesh>
  );
}

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({ defaultValues: { email: "", password: "" } });

  const doLogin = async (data: any) => {
    setLoading(true);
    try {
      const loginData: { message: string; token: string } = await api.post(
        "/login",
        data
      );
      console.log("登入成功", loginData);
      localStorage.setItem("token", loginData.token);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

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
        <Form {...form}>
          <form
            onSubmit={() => form.handleSubmit(doLogin)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "帳號為必填" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>帳號</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="請輸入帳號"
                      className="w-full bg-gray-800 border border-neon text-white p-2 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "密碼為必填" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密碼</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="請輸入密碼"
                      className="w-full bg-gray-800 border border-neon text-white p-2 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              variant="ghost"
              disabled={loading}
            >
              {loading ? "登入中..." : "登入"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
