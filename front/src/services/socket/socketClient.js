import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const createStompClient = (roomId, onMessageReceived) => {
  const socket = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => console.log('[STOMP]', str),
    onConnect: () => {
      client.subscribe(`/topic/chat/${roomId}`, (message) => {
        const parsed = JSON.parse(message.body);
        onMessageReceived(parsed);
      });
    },
    onStompError: (frame) => {
      console.error('[STOMP ERROR]', frame.headers['message']);
    },
  });

  return client;
};
