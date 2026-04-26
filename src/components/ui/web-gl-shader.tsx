import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: any
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle Theme switching for WebGL
  useEffect(() => {
    if (!mounted || !sceneRef.current.renderer) return
    
    // Final check for actually active theme
    const currentTheme = resolvedTheme || theme || "dark"
    const clearColor = currentTheme === "dark" ? 0x000000 : 0xFFFFFF
    
    sceneRef.current.renderer.setClearColor(new THREE.Color(clearColor))
    
    if (sceneRef.current.uniforms) {
      sceneRef.current.uniforms.isDark.value = currentTheme === "dark" ? 1.0 : 0.0
    }
  }, [theme, resolvedTheme, mounted])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform float isDark;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        // Adjust wave intensity based on background
        float intensity = isDark > 0.5 ? 0.05 : 0.02;

        float r = intensity / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = intensity / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = intensity / abs(p.y + sin((bx + time) * xScale) * yScale);
        
        if (isDark < 0.5) {
          // On light backgrounds, make colors slightly deeply saturated but not glowing
          r = pow(r, 0.8) * 0.4;
          g = pow(g, 0.8) * 0.4;
          b = pow(b, 0.8) * 0.4;
        }

        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      
      const currentTheme = resolvedTheme || theme || "dark"
      refs.renderer.setClearColor(new THREE.Color(currentTheme === "dark" ? 0x000000 : 0xFFFFFF))

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
        isDark: { value: currentTheme === "dark" ? 1.0 : 0.0 }
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.01;
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const width = window.innerWidth
      const height = window.innerHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    initScene()
    animate()
    window.addEventListener("resize", handleResize)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", handleResize)
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, []) // Dependency array empty for init only - theme side effect handles the rest

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full block z-0 pointer-events-none"
    />
  )
}
