'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AvatarMenu = () => {
  const [isHovered, setIsHovered] = useState(false)

  
  const handleMouseEnter = () => {
    setIsHovered(true)

  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Avatar onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
      <AvatarFallback>CN</AvatarFallback>
      
      {isHovered && (
        <div className=''>
          <ul>
            <li>Logout</li>
            <li>Settings</li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      )}
    </Avatar>
  )
}

export default AvatarMenu
