"use client";
import React from 'react'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { CoachingExperts } from '@/services/Options';
import { useEffect, useState , useRef } from 'react';
import { UserButton } from '@stackframe/stack';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
// const RecordRTC = dynamic(() => import('recordrtc'), { ssr: false });
import RecordRTC from 'recordrtc';
import { RealtimeTranscriber } from 'assemblyai';

const DiscussionRoom = () => {
    const { roomid } = useParams();
    // const DiscussionRoomData= useQuery(api.DiscussionRoom.GetDiscussionRoom,{id:roomid});
   
    const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom,{ id: roomid });
    //  console.log("fetched room data :", DiscussionRoomData);
    const [expert,setExpert] = useState(null);
    const [enableMic, setEnableMic] = useState(false);
    const recorder = useRef(null);
    let silenceTimeout;
    const realtimeTranscriber = useRef(null);





  useEffect(() => {
    if (DiscussionRoomData) {
      const Expert =  CoachingExperts.find(item =>item.name == DiscussionRoomData.expertName);
      console.log("Expert:", Expert);
      setExpert(Expert);
    }
  }, [DiscussionRoomData]);

  const connectToServer=()=>{
    setEnableMic(true);

    // Init AssemblyAI
    realtimeTranscriber.current=new RealtimeTranscriber({
      token:'',
      sample_rate: 1600
    })
    
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
              recorder.current = new RecordRTC(stream, {
                  type: 'audio',
                  mimeType: 'audio/webm;codecs=pcm',
                  recorderType: RecordRTC.StereoAudioRecorder,
                  timeSlice: 250,
                  desiredSampRate: 16000,
                  numberOfAudioChannels: 1,
                  bufferSize: 4096,
                  audioBitsPerSecond: 128000,
                  ondataavailable: async (blob) => {
                      // if (!realtimeTranscriber.current) return;
                      // Reset the silence detection timer on audio input
                      clearTimeout(silenceTimeout);

                      const buffer = await blob.arrayBuffer();

                      //console.log(buffer)

                    

                      // Restart the silence detection timer
                      silenceTimeout = setTimeout(() => {
                          console.log('User stopped talking');
                          // Handle user stopped talking (e.g., send final transcript, stop recording, etc.)
                      }, 2000);
                  },
              });
              recorder.current.startRecording();
          })
          .catch((err) => console.error(err));
  }
  }
  // const disconnect = (e) => {
  //   e.preventDefault();

  //   recorder.current.pauseRecording();
  //   recorder.current=null;
  //   setEnableMic(false);
  // }
  const disconnect = (e) => {
  e.preventDefault();

  if (recorder.current) {
    recorder.current.stopRecording(() => {
      // Properly stop all tracks (turn off mic light)
      const stream = recorder.current.stream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      recorder.current = null;
      console.log("Recording stopped and mic released.");
      setEnableMic(false);
    });
  } else {
    console.warn("No active recording to stop.");
    setEnableMic(false);
  }

  // Also clear the silence timer if any
  clearTimeout(silenceTimeout);
};
  
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

          {!enableMic ?<Button onClick={connectToServer}>Connect</Button>
          : <Button variant="destructive" onClick={disconnect}>Disconnect</Button>}
          
          
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