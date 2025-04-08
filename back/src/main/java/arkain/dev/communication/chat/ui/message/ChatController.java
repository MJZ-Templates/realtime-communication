package arkain.dev.communication.chat.ui.message;

import arkain.dev.communication.chat.app.dto.ChatMessageDto;
import arkain.dev.communication.chat.app.dto.ChatResponseMessage;
import arkain.dev.communication.chat.app.service.message.ChatMessageHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageHandlerService chatMessageHandlerService;

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/chat/{roomId}")
    public ChatResponseMessage sendMessage(@DestinationVariable("roomId") String roomId, ChatMessageDto message) {
        return chatMessageHandlerService.handleMessage(roomId, message);
    }
}
