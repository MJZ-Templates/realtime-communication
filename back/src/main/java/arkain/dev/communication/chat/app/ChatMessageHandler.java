package arkain.dev.communication.chat.app;

import arkain.dev.communication.chat.app.dto.ChatMessageDto;
import arkain.dev.communication.chat.app.dto.ChatResponseMessage;
import arkain.dev.communication.chat.dao.entity.MessageType;

public interface ChatMessageHandler {

    boolean supports(MessageType type);

    ChatResponseMessage handleMessage(String roomId, ChatMessageDto message);
}
