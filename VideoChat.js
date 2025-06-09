import { useEffect, useRef } from 'react';

export default function VideoChat() {
  const localRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localRef.current.srcObject = stream;
      });
  }, []);

  return <video ref={localRef} autoPlay muted />;
}
