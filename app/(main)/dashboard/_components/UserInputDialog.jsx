import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CoachingExperts,coachingOption } from '@/services/Options';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LoaderCircle } from 'lucide-react';

export const UserInputDialog = ({children, coachingOption}) => {

  const [selectedExpert, setSelectedExpert] = useState();
  const [topic, setTopic] = useState();
  const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateDiscussionRoom);
  const [loading, setLoading] = useState(false);
  console.log("coachingOption:", coachingOption)

  const OnClickNext=async()=>{
    setLoading(true);
    const result = await createDiscussionRoom({
      topic:topic,
      coachingOption: coachingOption?.name,
      expertName: selectedExpert
    })
    console.log(result);
    setLoading(false);
  }


  return (
    <Dialog>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{coachingOption?.name}</DialogTitle>
      <DialogDescription asChild>
       <div className='mt-3'>
        <h2 className='text-black'>Enter a topic to master your skills in {coachingOption?.name}</h2>

        <Textarea placeholder="Enter your topic here..." 
        className='mt-2'

        onChange={(e) => setTopic(e.target.value)}
        />

        <h2 className='text-black pt-4'>Select Your Coaching Expert</h2>

        <div className='grid grid-cols-3 md:grid-cols-5  gap-6 mt-3'>
            {CoachingExperts.map((expert, index) => (
               <div key={index} onClick={()=> setSelectedExpert(expert.name)} >
                <img src={expert.avatar} alt={expert.name} 
                width={100}
                height={100}
                className={`rounded-2xl h-[80px] w-[80px] object-cover hover:scale-105 transition-all cursor-pointer p-1 border-primary
                  ${selectedExpert == expert.name && 'border'}
                `}
                />
                <h2 className='text-center'>{expert.name}</h2>
               </div> 
            ))}
        </div>
            {/* user Input button */}
        <div className='flex gap-5 justify-end mt-5 '>

          <DialogClose asChild>
            <Button variant={'ghost'}>Cancel</Button>
          </DialogClose>
          

          <Button disabled={(!topic || !selectedExpert || loading)} onClick={OnClickNext}> 
            {loading&&<LoaderCircle className='animate-spin'/>}
            
            
            Next</Button>

        </div>
       </div>



      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}
