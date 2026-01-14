"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
	MeshDistortMaterial,
	MeshTransmissionMaterial,
	Environment,
	Sparkles,
	RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

// Card with play icon cutout (hole straight through)
function CardWithCutout({ color }: { color: string }) {
	const geometry = useMemo(() => {
		// Card shape (rectangle with rounded corners approximation)
		const cardWidth = 1;
		const cardHeight = 0.7;
		const shape = new THREE.Shape();

		// Simple rectangle for the card
		shape.moveTo(-cardWidth / 2, -cardHeight / 2);
		shape.lineTo(cardWidth / 2, -cardHeight / 2);
		shape.lineTo(cardWidth / 2, cardHeight / 2);
		shape.lineTo(-cardWidth / 2, cardHeight / 2);
		shape.lineTo(-cardWidth / 2, -cardHeight / 2);

		// Play icon hole (triangle pointing right)
		const hole = new THREE.Path();
		const scale = 1.2; // Size of play icon
		hole.moveTo(-0.1 * scale, 0.14 * scale);
		hole.lineTo(0.14 * scale, 0);
		hole.lineTo(-0.1 * scale, -0.14 * scale);
		hole.lineTo(-0.1 * scale, 0.14 * scale);

		shape.holes.push(hole);

		// Extrude to give thickness
		const extrudeSettings = {
			depth: 0.05,
			bevelEnabled: true,
			bevelThickness: 0.01,
			bevelSize: 0.01,
			bevelSegments: 2,
		};

		return new THREE.ExtrudeGeometry(shape, extrudeSettings);
	}, []);

	return (
		<mesh geometry={geometry} position={[0, 0, -0.025]}>
			<meshStandardMaterial
				color={color}
				emissive={color}
				emissiveIntensity={0.5}
				metalness={0.8}
				roughness={0.2}
				transparent
				opacity={0.9}
				side={THREE.DoubleSide}
			/>
		</mesh>
	);
}

// Floating media card that flows through the portal
function MediaCard({
	index,
	total,
	color,
	hasPlayIcon = false,
}: {
	index: number;
	total: number;
	color: string;
	hasPlayIcon?: boolean;
}) {
	const meshRef = useRef<THREE.Group>(null);
	const materialRef = useRef<THREE.MeshStandardMaterial>(null);

	// Random properties for each card - determines chaotic behavior on left side
	const randomProps = useMemo(
		() => ({
			speed: 0.2 + Math.random() * 0.25,
			offset: (index / total) * Math.PI * 2,
			// Messy Y offset for left side
			yOffset: (Math.random() - 0.5) * 4,
			zOffset: (Math.random() - 0.5) * 3,
			rotationSpeed: (Math.random() - 0.5) * 0.04,
			scale: 0.35 + Math.random() * 0.25,
			// Orderly Y position for right side (stacked rows)
			orderlyY: ((index % 5) - 2) * 0.1,
			// Subtle wobble parameters for right side
			wobbleSpeed: 0.2 + Math.random() * 0.4,
			wobbleAmount: 0.03 + Math.random() * 0.01,
		}),
		[index, total]
	);

	useFrame((state) => {
		if (!meshRef.current) return;

		const time =
			state.clock.elapsedTime * randomProps.speed + randomProps.offset;
		const globalTime = state.clock.elapsedTime;

		// Flow from left (-10) to right (10), looping
		const x = ((time * 1.8) % 20) - 10;

		// Calculate convergence factor: peaks at center (x=0), falls off on both sides
		const convergeFactor = Math.max(0, 1 - Math.abs(x) / 3);
		// Smooth the convergence
		const smoothConverge = convergeFactor * convergeFactor;

		// Calculate transition factor for left->right behavior change
		// Transition happens sharply as cards pass through the center ball
		// 0 when x < -1.5 (chaotic), transitions between -1.5 and 1.5, 1 when x > 1.5 (orderly)
		// center zone where the transition happens smoothly, so that the cards are not too chaotic or too orderly
		const transitionZone = 1.05;
		const transitionFactor = Math.min(
			1,
			Math.max(0, (x + transitionZone) / (transitionZone * 2))
		);
		const smoothTransition =
			transitionFactor * transitionFactor * (3 - 2 * transitionFactor);

		// Y position: chaotic on left, converge at center, orderly rows on right with wobble
		const chaoticYFactor = 1.5;
		const chaoticY =
			Math.sin(time * 2.5 + randomProps.offset) * chaoticYFactor +
			randomProps.yOffset;
		const orderlyY =
			randomProps.orderlyY +
			Math.sin(globalTime * randomProps.wobbleSpeed + index) *
				randomProps.wobbleAmount *
				8;
		// Converge toward 0 at center
		const baseY =
			chaoticY * (1 - smoothTransition) + orderlyY * smoothTransition;
		const y = baseY * (1 - smoothConverge * 0.8);

		// Z position: scattered on left, converge at center, slight depth variation on right
		const chaoticZ =
			Math.cos(time * 2 + randomProps.offset) * 1.5 + randomProps.zOffset;
		const orderlyZ =
			Math.cos(globalTime * randomProps.wobbleSpeed * 0.7 + index * 0.5) * 0.15;
		const baseZ =
			chaoticZ * (1 - smoothTransition) + orderlyZ * smoothTransition;
		const z = baseZ * (1 - smoothConverge * 0.9);

		meshRef.current.position.set(x, y, z);

		// Scale: slightly larger and uniform on right side
		const chaoticScale = randomProps.scale;
		const orderlyScale = 0.45;
		const scale =
			chaoticScale * (1 - smoothTransition) + orderlyScale * smoothTransition;
		meshRef.current.scale.setScalar(scale);

		// Rotation: tumbling on left, facing camera on right with gentle wobble
		const tumbleFactor = 1 - smoothTransition;

		// Base rotations for chaotic left side
		const chaoticRotX = time * randomProps.rotationSpeed * 30;
		const chaoticRotY = time * randomProps.rotationSpeed * 45;
		const chaoticRotZ = Math.sin(time) * 0.4;

		// Target rotation for right side: facing camera in PORTRAIT (90deg Z rotation) with subtle bobbing
		const orderlyRotX =
			Math.sin(globalTime * randomProps.wobbleSpeed + index) * 0.1;
		const orderlyRotY =
			Math.sin(globalTime * randomProps.wobbleSpeed * 0.8 + index) * 0.1;
		const orderlyRotZ =
			Math.PI / 2 +
			Math.sin(globalTime * randomProps.wobbleSpeed * 0.6 + index * 0.3) * 0.08;

		meshRef.current.rotation.x =
			chaoticRotX * tumbleFactor + orderlyRotX * smoothTransition;
		meshRef.current.rotation.y =
			chaoticRotY * tumbleFactor + orderlyRotY * smoothTransition;
		meshRef.current.rotation.z =
			chaoticRotZ * tumbleFactor + orderlyRotZ * smoothTransition;

		// Glow effect: brighter at center transition
		const centerGlow = Math.max(0, 1 - Math.abs(x) / 2);
		if (materialRef.current) {
			materialRef.current.emissiveIntensity = 0.3 + centerGlow * 2.5;
		}
	});

	return (
		<group ref={meshRef}>
			{hasPlayIcon ? (
				<CardWithCutout color={color} />
			) : (
				<RoundedBox args={[1, 0.7, 0.05]} radius={0.05} smoothness={4}>
					<meshStandardMaterial
						ref={materialRef}
						color={color}
						emissive={color}
						emissiveIntensity={0.5}
						metalness={0.8}
						roughness={0.2}
						transparent
						opacity={0.9}
					/>
				</RoundedBox>
			)}
		</group>
	);
}

// Central portal/singularity - glass sphere with distortion
function CentralPortal() {
	const portalRef = useRef<THREE.Mesh>(null);
	const glassRef = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		const time = state.clock.elapsedTime;

		if (portalRef.current) {
			portalRef.current.rotation.z = time * 0.5;
			portalRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
		}
		if (glassRef.current) {
			glassRef.current.rotation.y = time * 0.2;
			glassRef.current.rotation.x = Math.cos(time * 0.25) * 0.1;
		}
	});

	return (
		<group position={[0, 0, 0]}>
			{/* Glass sphere with transmission/refraction for distortion effect */}
			<mesh ref={glassRef}>
				<sphereGeometry args={[0.85, 64, 64]} />
				<MeshTransmissionMaterial
					backside
					samples={16}
					thickness={0.5}
					chromaticAberration={0.3}
					anisotropy={0.3}
					distortion={0.5}
					distortionScale={0.5}
					temporalDistortion={0.2}
					transmission={2}
					transparent={true}
					opacity={0.4}
					roughness={0.1}
					ior={1.5}
					color="#c4b5dc"
				/>
			</mesh>
			{/* Inner dark core with subtle distortion */}
			{/* <mesh ref={portalRef} scale={0.3}>
				<sphereGeometry args={[0.8, 16, 16]} />
				<MeshDistortMaterial
					color="#2a1a4c"
					emissive="#c4b5dc"
					emissiveIntensity={0.5}
					transparent={true}
					opacity={0.1}
					distort={0.8}
					speed={0.1}
					roughness={0.1}
				/>
			</mesh> */}
		</group>
	);
}

// Particle streams
function ParticleStreams() {
	const particlesRef = useRef<THREE.Points>(null);
	const count = 500;

	const positions = useMemo(() => {
		const pos = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			pos[i * 3] = (Math.random() - 0.5) * 20;
			pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
			pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
		}
		return pos;
	}, []);

	const speeds = useMemo(() => {
		return Array.from({ length: count }, () => 0.01 + Math.random() * 0.01);
	}, []);

	useFrame(() => {
		if (!particlesRef.current) return;

		const posArray = particlesRef.current.geometry.attributes.position
			.array as Float32Array;

		for (let i = 0; i < count; i++) {
			// Move particles from left to right
			posArray[i * 3] += speeds[i];

			// Reset when off screen
			if (posArray[i * 3] > 10) {
				posArray[i * 3] = -10;
				posArray[i * 3 + 1] = (Math.random() - 0.5) * 8;
				posArray[i * 3 + 2] = (Math.random() - 0.5) * 6;
			}

			// Accelerate toward center
			const distFromCenter = Math.abs(posArray[i * 3]);
			if (distFromCenter < 3) {
				const centerPull = (2.5 - distFromCenter) / 3;
				posArray[i * 3 + 1] *= 1 - centerPull * 0.02;
				posArray[i * 3 + 2] *= 1 - centerPull * 0.02;
			}
		}

		particlesRef.current.geometry.attributes.position.needsUpdate = true;
	});

	return (
		<points ref={particlesRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					args={[positions, 3]}
					count={count}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.05}
				color="#9b7bbd"
				transparent
				opacity={0.5}
				sizeAttenuation
			/>
		</points>
	);
}

// Grid lines for futuristic effect
function GridLines() {
	const linesRef = useRef<THREE.Group>(null);

	useFrame((state) => {
		if (linesRef.current) {
			linesRef.current.position.x = ((state.clock.elapsedTime * 0.5) % 2) - 1;
		}
	});

	return (
		<group
			ref={linesRef}
			position={[0, -2, -3]}
			rotation={[-Math.PI / 4, 0, 0]}
		>
			{Array.from({ length: 20 }).map((_, i) => (
				<mesh key={i} position={[(i - 10) * 1, 0, 0]}>
					<boxGeometry args={[0.01, 0.01, 20]} />
					<meshBasicMaterial color="#9b7bbd" transparent opacity={0.2} />
				</mesh>
			))}
			{Array.from({ length: 20 }).map((_, i) => (
				<mesh key={`h-${i}`} position={[0, 0, (i - 10) * 1]}>
					<boxGeometry args={[20, 0.01, 0.01]} />
					<meshBasicMaterial color="#9b7bbd" transparent opacity={0.2} />
				</mesh>
			))}
		</group>
	);
}

// Main scene component
function Scene() {
	const cardColors = [
		"#9b7bbd",
		"#7c5cb8",
		"#c4b5dc",
		"#6b4c9a",
		"#b8a5d4",
		"#8b6baf",
	];

	return (
		<>
			{/* Ambient and point lights */}
			<ambientLight intensity={0.2} />
			<pointLight position={[0, 0, 3]} intensity={2} color="#9b7bbd" />
			<pointLight position={[-5, 2, 2]} intensity={1} color="#7c5cb8" />
			<pointLight position={[5, -2, 2]} intensity={1} color="#c4b5dc" />

			{/* Central portal */}
			<CentralPortal />

			{/* Flowing media cards - some with play icons (video cards) */}
			{Array.from({ length: 15 }).map((_, i) => (
				<MediaCard
					key={i}
					index={i}
					total={15}
					color={cardColors[i % cardColors.length]}
					hasPlayIcon={i % 3 === 0} // Every 3rd card has a play icon
				/>
			))}

			{/* Particle streams */}
			<ParticleStreams />

			{/* Sparkles around portal */}
			<Sparkles
				count={100}
				scale={6}
				size={2}
				speed={0.4}
				color="#9b7bbd"
				opacity={0.6}
			/>

			{/* Grid lines */}
			<GridLines />

			{/* Environment for reflections */}
			<Environment preset="night" />
		</>
	);
}

// Camera animation
function CameraRig() {
	const { camera } = useThree();

	useFrame((state) => {
		const time = state.clock.elapsedTime;
		camera.position.x = Math.sin(time * 0.1) * 0.5;
		camera.position.y = Math.cos(time * 0.15) * 0.3;
		camera.lookAt(0, 0, 0);
	});

	return null;
}

// Main export component
export function FlowingMediaScene() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="w-full h-full bg-gradient-to-b from-background via-primary/5 to-background" />
		);
	}

	return (
		<div className="w-full h-full relative">
			{/* Subtle gradient overlays for edge blending */}
			<div className="absolute inset-0 pointer-events-none z-10">
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
				<div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background/50 to-transparent" />
				<div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background/50 to-transparent" />
			</div>

			<Canvas
				camera={{ position: [0, 0, 8], fov: 60 }}
				dpr={[1, 2]}
				gl={{ antialias: true, alpha: true }}
				style={{ background: "transparent" }}
			>
				<Scene />
				<CameraRig />
			</Canvas>
		</div>
	);
}
