import { createChatRoom, validateRoomId } from '../services/apis/chatRoom';

export const useChatRoomActions = () => {
  const openRoom = (roomId) => {
    const url = `${window.location.origin}/room/${encodeURIComponent(roomId)}`;
    window.open(url, '_blank');
  };

  const createRoom = async ({ name, onError, onSuccess }) => {
    try {
      const { id } = await createChatRoom(name);
      openRoom(id);
      onSuccess?.();
    } catch (error) {
      onError?.('Error creating chat room.');
    }
  };

  const validateAndJoinRoom = async ({ name, onError }) => {
    try {
      const { isExists } = await validateRoomId(name);
      if (isExists) {
        openRoom(name);
      } else {
        onError?.('The room does not exist.');
      }
    } catch (error) {
      onError?.('Error validating room ID.');
    }
  };

  return { createRoom, validateAndJoinRoom };
};
