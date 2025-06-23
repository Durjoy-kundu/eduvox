"use client"
import { BlurFade } from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { CoachingOptions } from '@/services/CoachingOptions';
import { useUser } from '@stackframe/stack'
import React from 'react'
import { UserInputDialog } from './UserInputDialog';

const FeatureAssistants = () => {
    const user = useUser();
return (
    <div>
        <div className='flex justify-between items-center'>
            <div>
                <h2 className='font-medium text-gray-500'>My WorkSpace</h2>
                <h1 className='text-3xl font-semibold'>Welcome Back,    {user?.displayName}</h1>
            </div>
            <Button className="hover:bg-red-500"
            >Profile</Button>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10 mt-10'>
            {CoachingOptions.map((option, index) => (
                    <BlurFade key={option.icon} delay={0.25 + index * 0.05} inView>
                        <div key={index} className='p-3 bg-secondary rounded-3xl flex flex-col items-center justify-center '>
            <UserInputDialog coachingOptions = {option}>
                <div key={index} className='flex items-center justify-center '>
                    <img src={option.icon} alt={option.name} 
                    width={150}
                    height={150}
                    className='h-[70px] w-[70px] 
                    cursor-pointer
                    transform transition-transform duration-300 hover:rotate-180'
                    />
                    <h2 className=''>{option.name}</h2>
                </div>
                </UserInputDialog>
                </div>
                </BlurFade>
            ))}
        </div>
    
    </div>
)
}

export default FeatureAssistants