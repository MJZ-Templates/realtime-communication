package arkain.dev.communication.chat.app.service.message;

import arkain.dev.communication.chat.app.ChatMessageHandler;
import arkain.dev.communication.chat.app.dto.ChatMessageDto;
import arkain.dev.communication.chat.app.dto.ChatResponseMessage;
import arkain.dev.communication.chat.app.service.ChatMessageService;
import arkain.dev.communication.chat.app.service.ChatRoomService;
import arkain.dev.communication.chat.dao.entity.ChatMessage;
import arkain.dev.communication.chat.dao.entity.ChatRoom;
import arkain.dev.communication.chat.dao.entity.MessageType;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class AbstractSystemMessageHandler implements ChatMessageHandler {

    private static final String SYSTEM_MESSAGE = "System";

    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;

    @Override
    public ChatResponseMessage handleMessage(String roomId, ChatMessageDto message) {
        ChatRoom chatRoom = chatRoomService.getChatRoom(roomId);
        ChatMessage systemMessage = ChatMessage.create(
                chatRoom,
                SYSTEM_MESSAGE,
                message.sender() + getSuffixMessage(),
                getMessageType().toString()
        );
        chatMessageService.saveChatMessage(systemMessage);
        return new ChatResponseMessage(
                systemMessage.getId(),
                SYSTEM_MESSAGE,
                message.sender() + getSuffixMessage(),
                getMessageType().toString(),
                systemMessage.getCreatedAt()
        );
    }

    protected abstract String getSuffixMessage();
    protected abstract MessageType getMessageType();
}
