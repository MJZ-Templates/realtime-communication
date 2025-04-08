package arkain.dev.communication.chat.app.service.message;

import arkain.dev.communication.chat.app.service.ChatMessageService;
import arkain.dev.communication.chat.app.service.ChatRoomService;
import arkain.dev.communication.chat.dao.entity.MessageType;
import org.springframework.stereotype.Component;

@Component
public class LeaveHandler extends AbstractSystemMessageHandler {

    private final static String LEAVE_MESSAGE_SUFFIX = " has leaved the room";

    public LeaveHandler(ChatRoomService chatRoomService, ChatMessageService chatMessageService) {
        super(chatRoomService, chatMessageService);
    }

    @Override
    public boolean supports(MessageType type) {
        return MessageType.LEAVE == type;
    }


    @Override
    protected String getSuffixMessage() {
        return LEAVE_MESSAGE_SUFFIX;
    }

    @Override
    protected MessageType getMessageType() {
        return MessageType.LEAVE;
    }
}
