import api from './instance';

export const createChatRoom = async (name) => {
  const response = await api.post('/room', null, {
    params: { name },
  });
  return response.data;
};

export const validateRoomId = async (roomId) => {
  const response = await api.post(`/room/validate/${roomId}`);
  console.log(`validateRoomId response:`, response);
  return response.data;
};
