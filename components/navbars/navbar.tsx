import React from 'react'
import Menudesktop from './menu-desktop'
import { ShoppingCart, User } from 'lucide-react'
import AcmeLogo from './acme-logo'

function Navbar() {
  return (
    <div className='flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-6xl'>
      <AcmeLogo/>
      <div className='items-center justify-between hidden sm:flex'>
        <Menudesktop/>
      </div>
      <div className='flex sm:hidden'>
        <h1>items menu mobile</h1>
      </div>
      <div className='flex items-center justify-between gap-2 sm:gap-7'>
        <User strokeWidth={1} className='cursor-pointer'/>
        <ShoppingCart strokeWidth={1} className='cursor-pointer'/>
      </div>
      
    </div>
  )
}

export default Navbar