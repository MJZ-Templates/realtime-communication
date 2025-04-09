import { useCallback, useState } from 'react';
import { getChatMessages } from '../services/apis/chat';
import useWebSocket from './useWebSocket';

const useChatMessage = ({ roomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState('');

  const onMessageReceived = useCallback((msg) => {
    if (msg.type === 'SOLVE') {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, solved: true } : m)),
      );
      return;
    }
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === msg.id);
      return exists ? prev : [msg, ...prev];
    });
  }, []);

  const { sendMessage } = useWebSocket(roomId, onMessageReceived);

  const sendChatMessage = (content) => {
    sendMessage({
      roomId,
      sender: username,
      content,
      type: 'CHAT',
      sendAt: new Date(),
    });
  };

  const sendJoinMessage = (username) => {
    sendMessage({
      roomId,
      sender: username,
      content: `${username} has joined the room.`,
      type: 'JOIN',
      sendAt: new Date(),
    });
  };

  const sendLeaveMessage = useCallback(
    (username) => {
      sendMessage({
        roomId,
        sender: username,
        content: `${username} has left the room.`,
        type: 'LEAVE',
        sendAt: new Date(),
      });
    },
    [roomId, sendMessage],
  );

  const sendSolveMessage = (messageId) => {
    sendMessage({
      id: messageId,
      roomId,
      sender: username,
      content: '',
      type: 'SOLVE',
      sendAt: new Date(),
    });
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
    sendSolveMessage,
    sendLeaveMessage,
    fetchInitialMessages,
  };
};

export default useChatMessage;
