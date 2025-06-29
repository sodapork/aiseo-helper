'use client'

import { useEffect, useRef, useState } from 'react'

interface DynamicBackgroundProps {
  children: React.ReactNode
}

export default function DynamicBackground({ children }: DynamicBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }
    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50"
    >
      {/* Moderate dynamic gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, ${isHovering ? '0.4' : '0.15'}) 0%, 
            rgba(34, 197, 94, ${isHovering ? '0.3' : '0.1'}) 25%, 
            rgba(255, 255, 255, ${isHovering ? '0.9' : '0.95'}) 50%, 
            rgba(147, 51, 234, ${isHovering ? '0.2' : '0.05'}) 75%, 
            rgba(59, 130, 246, ${isHovering ? '0.15' : '0.03'}) 100%)`,
          transition: 'background 0.5s ease-in-out',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 