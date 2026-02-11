'use client';

import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { Socket } from 'socket.io-client';

interface VideoCallProps {
  socket: Socket;
  userId: string; // My user ID
  recipientId: string; // User ID to call
  onClose: () => void;
}

export default function VideoCall({ socket, userId, recipientId, onClose }: VideoCallProps) {
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }
    });

    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    socket.on('callEnded', () => {
        leaveCall();
    });

    return () => {
        socket.off('callUser');
        socket.off('callEnded');
    };
  }, [socket]);

  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: userId,
      });
    });

    peer.on('stream', (userStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = userStream;
      }
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer.on('stream', (userStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = userStream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
        connectionRef.current.destroy();
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    socket.emit('endCall', { to: recipientId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <video playsInline muted ref={myVideo} autoPlay className="w-full h-full object-cover" />
            <span className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">Tu</span>
          </div>
          <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            {callAccepted && !callEnded ? (
              <video playsInline ref={userVideo} autoPlay className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                A aguardar ligação...
              </div>
            )}
            <span className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">Outro participante</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 p-6 bg-gray-800">
          {!callAccepted && !receivingCall && (
            <button
              onClick={() => callUser(recipientId)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2"
            >
              <span>📞</span> Iniciar Chamada
            </button>
          )}

          {receivingCall && !callAccepted && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-white font-medium">Chamada a receber...</p>
              <button
                onClick={answerCall}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2"
              >
                <span>📞</span> Atender
              </button>
            </div>
          )}

          <button
            onClick={leaveCall}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2"
          >
            <span>❌</span> Desligar
          </button>
        </div>
      </div>
    </div>
  );
}
