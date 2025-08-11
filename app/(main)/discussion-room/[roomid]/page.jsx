/*"use client";
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
import { getToken } from '@/services/GlobalServices';

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

  const connectToServer=async ()=>{
    setEnableMic(true);

    // Init AssemblyAI
    realtimeTranscriber.current=new RealtimeTranscriber({
      token:await getToken(),
      sample_rate: 16000
    })

    realtimeTranscriber.current.on('transcript', async(transcript) => {
      console.log("Transcript:", transcript);
    });




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
                      if (!realtimeTranscriber.current) return;
                      // Reset the silence detection timer on audio input
                      clearTimeout(silenceTimeout);
                      const buffer = await blob.arrayBuffer();
                      console.log(buffer);
                      realtimeTranscriber.current.sendAudio(buffer);

                    

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

  // disconnect function to stop recording and release the microphone
  // const disconnect = async (e) => {
  //   e.preventDefault();
  //   await realtimeTranscriber.current.close();
  //   recorder.current.pauseRecording();
  //   recorder.current=null;
  //   setEnableMic(false);
  // }
    const disconnect = async (e) => {
    e.preventDefault();
       if (realtimeTranscriber.current) {
        await realtimeTranscriber.current.close();
        realtimeTranscriber.current = null;
    }
    
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

export default DiscussionRoom;

*/

// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { useQuery } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { CoachingExperts } from '@/services/Options';
// import { UserButton } from '@stackframe/stack';
// import { Button } from '@/components/ui/button';

// const DiscussionRoom = () => {
//   const { roomid } = useParams();
//   const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
//   const [expert, setExpert] = useState(null);
//   const [enableMic, setEnableMic] = useState(false);
//   const recorder = useRef(null);
//   const websocket = useRef(null);
//   let silenceTimeout;

//   useEffect(() => {
//     if (DiscussionRoomData) {
//       const Expert = CoachingExperts.find(item => item.name === DiscussionRoomData.expertName);
//       console.log("Expert:", Expert);
//       setExpert(Expert);
//     }
//   }, [DiscussionRoomData]);

//   const connectToServer = async () => {
//     setEnableMic(true);

//     // Connect to AssemblyAI new Universal Streaming API
//     websocket.current = new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${process.env.ASSEMBLYAI_API_KEY}`);

//     websocket.current.onopen = () => {
//       console.log("WebSocket connected, starting recording...");
//       startRecording();
//     };

//     websocket.current.onmessage = (message) => {
//       const data = JSON.parse(message.data);
//       if (data.text) {
//         console.log("Transcript:", data.text);
//       }
//     };

//     websocket.current.onerror = (err) => {
//       console.error("WebSocket error:", err);
//     };

//     websocket.current.onclose = (event) => {
//       console.log("WebSocket closed:", event);
//     };
//   };

//   const startRecording = () => {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then((stream) => {
//         recorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });

//         recorder.current.ondataavailable = async (event) => {
//           clearTimeout(silenceTimeout);
//           if (websocket.current?.readyState === WebSocket.OPEN) {
//             const buffer = await event.data.arrayBuffer();
//             websocket.current.send(buffer);
//           }

//           silenceTimeout = setTimeout(() => {
//             console.log("User stopped talking...");
//           }, 2000);
//         };

//         recorder.current.start(250);
//       })
//       .catch((err) => console.error("Recording error:", err));
//   };

//   const disconnect = (e) => {
//     e.preventDefault();

//     if (recorder.current) {
//       recorder.current.stop();
//       const stream = recorder.current.stream;
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//       recorder.current = null;
//     }

//     if (websocket.current) {
//       websocket.current.close();
//       websocket.current = null;
//     }

//     clearTimeout(silenceTimeout);
//     setEnableMic(false);
//     console.log("Disconnected and mic released.");
//   };

//   return (
//     <div className='-mt-12'>
//       <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
//       <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
//         <div className='lg:col-span-2'>
//           <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
//             <img src={expert?.avatar} alt={expert?.name} width={200} height={200}
//               className='h-[80px] w-[80px] rounded-full object-cover animate-pulse' />
//             <h2 className='text-gray-500'>{expert?.name}</h2>
//             <div className='p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10'>
//               <UserButton />
//             </div>
//           </div>
//           <div className="mt-5 flex items-center justify-center">
//             {!enableMic ?
//               <Button onClick={connectToServer}>Connect</Button> :
//               <Button variant="destructive" onClick={disconnect}>Disconnect</Button>}
//           </div>
//         </div>
//         <div>
//           <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
//             <h2>Chat Section</h2>
//           </div>
//           <h2 className='mt-4 text-gray-400 text-center text-sm '>
//             At the end of conversation we will automatically generate the feedback/Notes from your conversation
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiscussionRoom;

/*"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { CoachingExperts } from '@/services/Options';
import { UserButton } from '@stackframe/stack';
import { Button } from '@/components/ui/button';

const DiscussionRoom = () => {
  const { roomid } = useParams();
  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });

  const [expert, setExpert] = useState(null);
  const [enableMic, setEnableMic] = useState(false);
  const [transcript, setTranscript] = useState(''); // <-- NEW

  const recorder = useRef(null);
  const websocket = useRef(null);
  let silenceTimeout;

  useEffect(() => {
    if (DiscussionRoomData) {
      const Expert = CoachingExperts.find(item => item.name === DiscussionRoomData.expertName);
      setExpert(Expert);
    }
  }, [DiscussionRoomData]);

  const connectToServer = async () => {
    setEnableMic(true);
    websocket.current = new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${process.env.NEXT_PUBLIC_ASSEMBLY_API_KEY}`); 

    websocket.current.onopen = () => {
      console.log("WebSocket connected, starting recording...");
      startRecording();
    };

    websocket.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.text) {
        console.log("Transcript:", data.text);
        setTranscript(prev => prev + ' ' + data.text); // <-- UPDATE UI
      }
    };

    websocket.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    websocket.current.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        recorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });

        recorder.current.ondataavailable = async (event) => {
          clearTimeout(silenceTimeout);
          if (websocket.current?.readyState === WebSocket.OPEN) {
            const buffer = await event.data.arrayBuffer();
            websocket.current.send(buffer);
          }

          silenceTimeout = setTimeout(() => {
            console.log("User stopped talking...");
          }, 2000);
        };

        recorder.current.start(250); // Every 250ms
      })
      .catch((err) => console.error("Recording error:", err));
  };

  const disconnect = (e) => {
    e.preventDefault();

    if (recorder.current) {
      recorder.current.stop();
      const stream = recorder.current.stream;
      if (stream) stream.getTracks().forEach(track => track.stop());
      recorder.current = null;
    }

    if (websocket.current) {
      websocket.current.close();
      websocket.current = null;
    }

    clearTimeout(silenceTimeout);
    setEnableMic(false);
    console.log("Disconnected and mic released.");
  };

  return (
    <div className='-mt-12'>
      <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
      <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
        <div className='lg:col-span-2'>
          <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
            <img src={expert?.avatar} alt={expert?.name} width={200} height={200}
              className='h-[80px] w-[80px] rounded-full object-cover animate-pulse' />
            <h2 className='text-gray-500'>{expert?.name}</h2>
            <div className='p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10'>
              <UserButton />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center">
            {!enableMic ?
              <Button onClick={connectToServer}>Connect</Button> :
              <Button variant="destructive" onClick={disconnect}>Disconnect</Button>}
          </div>
        </div>

        <div>
          <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-start p-5 overflow-y-auto'>
            <h2 className="text-xl font-semibold mb-2">Live Transcript</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {transcript || 'Waiting for input...'}
            </p>
          </div>
          <h2 className='mt-4 text-gray-400 text-center text-sm'>
            At the end of conversation we will automatically generate the feedback/Notes from your conversation
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DiscussionRoom; */

"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { CoachingExperts } from '@/services/Options';
import { UserButton } from '@stackframe/stack';
import { Button } from '@/components/ui/button';

const DiscussionRoom = () => {
  const { roomid } = useParams();
  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });

  const [expert, setExpert] = useState(null);
  const [enableMic, setEnableMic] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);

  const recorder = useRef(null);
  const websocket = useRef(null);

  useEffect(() => {
    if (DiscussionRoomData) {
      const Expert = CoachingExperts.find(item => item.name === DiscussionRoomData.expertName);
      setExpert(Expert);
    }
  }, [DiscussionRoomData]);

  const connectToServer = async () => {
    try {
      setEnableMic(true);
      console.log("Connecting to AssemblyAI...");

      // Create WebSocket connection
      websocket.current = new WebSocket('wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000');

      websocket.current.onopen = () => {
        console.log("WebSocket connected");
        
        // Send authentication message
        websocket.current.send(JSON.stringify({
          token: process.env.NEXT_PUBLIC_ASSEMBLY_API_KEY
        }));

        startRecording();
      };

      websocket.current.onmessage = (message) => {
        try {
          const data = JSON.parse(message.data);
          console.log("Received data:", data);

          if (data.message_type === 'FinalTranscript' && data.text) {
            setTranscript(prev => prev + ' ' + data.text);
            setMessages(prev => [...prev, { text: data.text, type: 'user' }]);
          }
        } catch (err) {
          console.error("Error parsing message:", err);
        }
      };

      websocket.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      websocket.current.onclose = () => {
        console.log("WebSocket closed");
      };
    } catch (error) {
      console.error("Connection error:", error);
      setEnableMic(false);
    }
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted");
        
        recorder.current = new MediaRecorder(stream, {
          mimeType: 'audio/webm'
        });
        
        recorder.current.ondataavailable = async (event) => {
          if (event.data.size > 0 && websocket.current?.readyState === WebSocket.OPEN) {
            try {
              // Convert blob to base64
              const reader = new FileReader();
              reader.onload = () => {
                const base64data = reader.result.split(',')[1];
                // Send audio data as JSON
                websocket.current.send(JSON.stringify({
                  audio_data: base64data
                }));
              };
              reader.readAsDataURL(event.data);
            } catch (error) {
              console.error("Error sending audio data:", error);
            }
          }
        };

        recorder.current.start(250);
        console.log("Recording started");
      })
      .catch((err) => {
        console.error("Microphone access error:", err);
        setEnableMic(false);
      });
  };

  const disconnect = (e) => {
    e.preventDefault();

    if (recorder.current) {
      recorder.current.stop();
      const stream = recorder.current.stream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      recorder.current = null;
    }

    if (websocket.current) {
      websocket.current.close();
      websocket.current = null;
    }

    setEnableMic(false);
    console.log("Disconnected");
  };

  return (
    <div className='-mt-12'>
      <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
      <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
        <div className='lg:col-span-2'>
          <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
            <img 
              src={expert?.avatar} 
              alt={expert?.name} 
              width={200} 
              height={200}
              className='h-[80px] w-[80px] rounded-full object-cover animate-pulse' 
            />
            <h2 className='text-gray-500'>{expert?.name}</h2>
            <div className='p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10'>
              <UserButton />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-4">
            {!enableMic ? (
              <Button onClick={connectToServer}>
                Start Speaking
              </Button>
            ) : (
              <Button variant="destructive" onClick={disconnect}>
                Stop Speaking
              </Button>
            )}
          </div>
        </div>

        <div>
          <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-start p-5 overflow-y-auto'>
            <h2 className="text-xl font-semibold mb-4">Live Transcript</h2>
            <div className="w-full space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg ${
                    message.type === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                  } max-w-[80%]`}
                >
                  {message.text}
                </div>
              ))}
              {enableMic && !messages.length && (
                <p className="text-gray-500 text-center">Waiting for speech input...</p>
              )}
            </div>
          </div>
          <h2 className='mt-4 text-gray-400 text-center text-sm'>
            At the end of conversation we will automatically generate the feedback/Notes from your conversation
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DiscussionRoom;