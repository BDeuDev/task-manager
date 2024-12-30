'use client'
import { ReactNode, useState } from 'react'

interface TooltipProps {
  children: ReactNode
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Tooltip({ children, text, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`
          absolute z-10 px-2 py-1 text-sm text-white bg-gray-800 
          rounded-md whitespace-nowrap ${positionClasses[position]}
          after:content-[''] after:absolute 
          ${position === 'top' ? 'after:top-full after:left-1/2 after:-translate-x-1/2 after:border-t-gray-800' : ''}
          ${position === 'bottom' ? 'after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-b-gray-800' : ''}
          ${position === 'left' ? 'after:left-full after:top-1/2 after:-translate-y-1/2 after:border-l-gray-800' : ''}
          ${position === 'right' ? 'after:right-full after:top-1/2 after:-translate-y-1/2 after:border-r-gray-800' : ''}
          after:border-4 after:border-transparent
        `}>
          {text}
        </div>
      )}
    </div>
  )
} 