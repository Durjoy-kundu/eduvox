import React from 'react'
import Image from 'next/image'
import { UserButton } from '@stackframe/stack'

const AppHeader = () => {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center'>
        <img src={'/logo.svg'} alt="logog" 
            width={50}
            height={70}
        
        />
        <UserButton/>

    </div>
  )
}

export default AppHeader