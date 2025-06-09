import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', { text: input, toLang: 'es' });
    setInput('');
  };

  return (
    <div>
      <h3>Chat</h3>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}><b>Original:</b> {msg.original} <br/><b>Translated:</b> {msg.translated}</p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
