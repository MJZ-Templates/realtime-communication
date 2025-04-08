import { useCallback, useState } from 'react';
import { getChatMessages } from '../services/apis/chat';
import useWebSocket from './useWebSocket';

const useChatMessage = ({ roomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState('');

  const onMessageReceived = useCallback((msg) => {
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === msg.id);
      return exists ? prev : [msg, ...prev];
    });
  }, []);

  const { sendMessage } = useWebSocket(roomId, onMessageReceived);

  const sendChatMessage = (content) => {
    const msg = {
      roomId,
      sender: username,
      content,
      type: 'CHAT',
      sendAt: new Date(),
    };
    sendMessage(msg);
  };

  const sendJoinMessage = () => {
    const msg = {
      roomId,
      sender: username,
      content: `${username} has joined the room.`,
      type: 'JOIN',
      sendAt: new Date(),
    };
    sendMessage(msg);
  };

  const fetchInitialMessages = useCallback(async () => {
    const data = await getChatMessages(roomId);
    setMessages(data.messages);
    setRoomName(data.roomName);
  }, [roomId]);

  return {
    messages,
    roomName,
    sendChatMessage,
    sendJoinMessage,
    fetchInitialMessages,
  };
};

export default useChatMessage;
