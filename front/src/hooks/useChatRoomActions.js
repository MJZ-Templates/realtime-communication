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

  const validateAndJoinRoom = async ({ roomId, onError }) => {
    try {
      const { isExists } = await validateRoomId(roomId);
      if (isExists) {
        openRoom(roomId);
      } else {
        onError?.('The room does not exist.');
      }
    } catch (error) {
      onError?.('Error validating room ID.');
    }
  };

  return { createRoom, validateAndJoinRoom };
};
