import { useEffect, useRef } from 'react';
import { createStompClient } from '../services/socket/socketClient';

export default function useWebSocket(roomId, onMessageReceived) {
  const client = useRef(null);

  useEffect(() => {
    client.current = createStompClient(roomId, onMessageReceived);
    client.current.activate();

    return () => {
      client.current.deactivate();
    };
  }, [roomId, onMessageReceived]);

  const sendMessage = (msg) => {
    if (!client.current || !client.current.connected) return;
    client.current.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(msg),
    });
  };

  return { sendMessage };
}
