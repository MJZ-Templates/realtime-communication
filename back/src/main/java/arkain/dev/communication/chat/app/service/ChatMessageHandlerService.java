package arkain.dev.communication.chat.app.service;

import arkain.dev.communication.chat.app.ChatMessageHandler;
import arkain.dev.communication.chat.app.dto.ChatMessageDto;
import arkain.dev.communication.chat.app.dto.ChatResponseMessage;
import arkain.dev.communication.chat.dao.entity.MessageType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatMessageHandlerService {

    private final List<ChatMessageHandler> handlers;

    public ChatResponseMessage handleMessage(String roomId, ChatMessageDto message) {

        ChatMessageHandler handler = getHandler(MessageType.valueOf(message.type()));
        return handler.handleMessage(roomId, message);
    }

    private ChatMessageHandler getHandler(MessageType type) {
        return handlers.stream()
                .filter(h -> h.supports(type))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No handler found for type " + type));
    }
}
