"use client";
import React from 'react'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { CoachingExperts } from '@/services/Options';
import { useEffect, useState } from 'react';
import { UserButton } from '@stackframe/stack';
import { Button } from '@/components/ui/button';

const DiscussionRoom = () => {
    const { roomid } = useParams();
    // const DiscussionRoomData= useQuery(api.DiscussionRoom.GetDiscussionRoom,{id:roomid});
   
    const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom,{ id: roomid });
    //  console.log("fetched room data :", DiscussionRoomData);
    const [expert,setExpert] = useState(null);

  useEffect(() => {
    if (DiscussionRoomData) {
      const Expert =  CoachingExperts.find(item =>item.name == DiscussionRoomData.expertName);
      console.log("Expert:", Expert);
      setExpert(Expert);
    }
  }, [DiscussionRoomData]);

  
  return (
  <div className='-mt-12'>
    <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
    <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>


    <div className='lg:col-span-2'>
      <div className=' h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
           <img src={expert?.avatar} alt={expert?.name} width={200} height={200} 
           className='h-[80px] w-[80px] rounded-full object-cover animate-pulse'/>
           <h2 className='text-gray-500'>
            {expert?.name}
           </h2>
           <div className='p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10'>
            <UserButton/>
           </div>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <Button >Connect</Button>
        </div>
      </div>
      <div>
     <div className=' h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
        <h2>Chat Section</h2>
      </div>
         <h2 className='mt-4 text-gray-400 text-center text-sm '> At the end of conversation we will automatically generate the feedback/Notes from your conversation</h2>
      </div>
     
    </div>
  </div>
    // <div>{roomid ? DiscussionRoomData?.topic || "Loading..." : "No room ID"}</div>
  )
}

export default DiscussionRoom