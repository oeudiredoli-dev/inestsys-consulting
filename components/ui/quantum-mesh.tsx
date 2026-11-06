"use client";

import { useEffect, useRef } from "react";

export default function QuantumMesh({ size = 48 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Guard: if canvas already attached (React Strict Mode double-invoke), bail
    if (mount.childElementCount > 0) return;

    let rafId: number;
    let domElement: HTMLCanvasElement | null = null;

    (async () => {
      const THREE = await import("three");

      // Re-check after async gap
      if (!mount || mount.childElementCount > 0) return;

      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(DPR);
      renderer.setSize(size, size);
      renderer.setClearColor(0x000000, 0);
      domElement = renderer.domElement;
      mount.appendChild(domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 3.2;

      const geo = new THREE.IcosahedronGeometry(1, 2);
      const wireGeo = new THREE.WireframeGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0xff6b35, opacity: 0.55, transparent: true });
      const wireframe = new THREE.LineSegments(wireGeo, wireMat);

      const innerMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.04, side: THREE.FrontSide });
      const innerMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.92, 2), innerMat);

      const positions = geo.attributes.position;
      const seen = new Map<string, [number, number, number]>();
      for (let i = 0; i < positions.count; i++) {
        const x = +positions.getX(i).toFixed(4);
        const y = +positions.getY(i).toFixed(4);
        const z = +positions.getZ(i).toFixed(4);
        const k = `${x}|${y}|${z}`;
        if (!seen.has(k)) seen.set(k, [x, y, z]);
      }
      const pointGeo = new THREE.BufferGeometry();
      pointGeo.setAttribute("position", new THREE.Float32BufferAttribute(Array.from(seen.values()).flat(), 3));
      const nodes = new THREE.Points(pointGeo, new THREE.PointsMaterial({ color: 0xff8555, size: 0.055, sizeAttenuation: true, transparent: true, opacity: 0.9 }));

      const group = new THREE.Group();
      group.add(wireframe, innerMesh, nodes);
      scene.add(group);

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        group.rotation.y += 0.009;
        group.rotation.x += 0.004;
        renderer.render(scene, camera);
      };
      animate();
    })();

    return () => {
      cancelAnimationFrame(rafId);
      if (domElement && mount.contains(domElement)) mount.removeChild(domElement);
    };
  }, [size]);

  return <div ref={mountRef} style={{ width: size, height: size, flexShrink: 0 }} />;
}
