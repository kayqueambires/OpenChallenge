'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AnimatedBackground() {
  const vantaRef = useRef(null)
  const vantaEffectRef = useRef(null) // Armazena a instância do Vanta

  useEffect(() => {
    let mounted = true

    const loadVanta = async () => {
      const VANTA = await import('vanta/dist/vanta.net.min')
      if (!vantaEffectRef.current && vantaRef.current && mounted) {
        vantaEffectRef.current = VANTA.default({
          el: vantaRef.current,
          THREE,
          color: 0x9f71b3,
          backgroundColor: 0x0a0a0a,
          points: 12.0,
          maxDistance: 20.0,
          spacing: 15.0,
        })
      }
    }

    loadVanta()

    return () => {
      mounted = false
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy()
        vantaEffectRef.current = null
      }
    }
  }, [])

  return (
    <div ref={vantaRef} className="w-full h-screen fixed top-0 left-0 -z-10" />
  )
}
