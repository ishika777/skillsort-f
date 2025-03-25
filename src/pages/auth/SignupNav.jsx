import ThemeButton from '@/components/shared/ThemeButton'
import React from 'react'

const SignupNav = () => {
  return (
    <div className='flex justify-between items-start w-full h-fit'>
        <div className="text-3xl font-bold text-start pl-6 pt-4 mb-10 flex items-center justify-between gap-2">
            <img width={35} src='./logo.png' alt='logo' />
                <span className="text-red-500">Skill</span>Sort 
            </div>
        <ThemeButton />
    </div>
  )
}

export default SignupNav