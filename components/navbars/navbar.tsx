import React from 'react'
import Menudesktop from './menu-desktop'
import { ShoppingCart, User } from 'lucide-react'
import AcmeLogo from './acme-logo'
import MenuMobile from './menu-mobile'

function Navbar() {
  return (
    <>
      <div className='p-4 bg-amber-700'>
        <AcmeLogo />
      </div>
      <div className='flex items-center justify-between p-4  cursor-pointer  bg-amber-200'>

        <div className='hidden sm:flex'>
          <Menudesktop />
        </div>
        <div className='flex sm:hidden'>
          <MenuMobile />
        </div>

        <div className='flex items-center justify-between gap-2 sm:gap-7'>
          <User strokeWidth={1} className='cursor-pointer' />
          <ShoppingCart strokeWidth={1} className='cursor-pointer' />
        </div>

      </div>
    </>
  )
}

export default Navbar



    // <div className='flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-6xl'>
    //   <AcmeLogo/>
    //   <div className='items-center justify-between hidden sm:flex'>
    //     <Menudesktop/>
    //   </div>
    //   <div className='flex sm:hidden'>
    //     <MenuMobile/>
    //   </div>
    //   <div className='flex items-center justify-between gap-2 sm:gap-7'>
    //     <User strokeWidth={1} className='cursor-pointer'/>
    //     <ShoppingCart strokeWidth={1} className='cursor-pointer'/>
    //   </div>
      
    // </div>