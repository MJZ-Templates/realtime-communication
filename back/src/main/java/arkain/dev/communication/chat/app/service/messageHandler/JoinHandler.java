package arkain.dev.communication.chat.app.service.messageHandler;

import arkain.dev.communication.chat.app.service.ChatMessageService;
import arkain.dev.communication.chat.app.service.ChatRoomService;
import arkain.dev.communication.chat.dao.entity.MessageType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JoinHandler extends AbstractSystemMessageHandler {

    private final static String JOIN_MESSAGE_SUFFIX = " has joined the room";

    public JoinHandler(ChatRoomService chatRoomService, ChatMessageService chatMessageService) {
        super(chatRoomService, chatMessageService);
    }

    @Override
    public boolean supports(MessageType type) {
        return MessageType.JOIN == type;
    }

    @Override
    protected String getSuffixMessage() {
        log.info("JoinHandler: getSuffixMessage");
        return JOIN_MESSAGE_SUFFIX;
    }

    @Override
    protected MessageType getMessageType() {
        return MessageType.JOIN;
    }
}
