import { useEffect, useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { TextureLoader, SRGBColorSpace } from 'three'
import type { Group } from 'three'

function LogoDisc() {
  const sourceTexture = useLoader(TextureLoader, '/uf9.png')
  const texture = useMemo(() => {
    const nextTexture = sourceTexture.clone()
    nextTexture.colorSpace = SRGBColorSpace
    nextTexture.needsUpdate = true
    return nextTexture
  }, [sourceTexture])
  const groupRef = useRef<Group>(null)

  useEffect(() => () => texture.dispose(), [texture])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    // Rotate around world Y axis (turntable style)
    groupRef.current.rotation.y += delta * 0.5
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        <mesh>
          <planeGeometry args={[3.8, 3.8]} />
          <meshBasicMaterial
            map={texture}
            transparent
            alphaTest={0.05}
            side={2}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#FFD700" />
      <pointLight position={[0, 3, 3]} intensity={0.5} color="#FFD700" />

      <Suspense fallback={null}>
        <LogoDisc />
      </Suspense>
    </>
  )
}

export default function UF9Logo3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
