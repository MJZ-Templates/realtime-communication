package arkain.dev.communication.chat.app.dto;

import java.util.List;

public record ChatRoomResponseDto(
        String roomId,
        String roomName,
        List<ChatResponseMessage> messages) {
}
