import api from './instance';

export const getChatMessages = async (roomId) => {
  const response = await api.get(`/chat/${roomId}`);
  return response.data;
};
