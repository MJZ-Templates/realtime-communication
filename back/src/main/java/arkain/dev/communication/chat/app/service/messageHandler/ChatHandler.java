package arkain.dev.communication.chat.app.service.messageHandler;

import arkain.dev.communication.chat.app.ChatMessageHandler;
import arkain.dev.communication.chat.app.dto.ChatMessageDto;
import arkain.dev.communication.chat.app.dto.ChatResponseMessage;
import arkain.dev.communication.chat.app.service.ChatMessageService;
import arkain.dev.communication.chat.dao.entity.MessageType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatHandler implements ChatMessageHandler {

    private final ChatMessageService chatMessageService;

    @Override
    public boolean supports(MessageType type) {
        return MessageType.CHAT == type;
    }

    @Override
    public ChatResponseMessage handleMessage(String roomId, ChatMessageDto message) {
        return chatMessageService.saveChatMessage(roomId, message);
    }
}
