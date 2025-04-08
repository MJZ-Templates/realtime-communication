package arkain.dev.communication.chat.app.dto;

import java.time.LocalDateTime;

public record ChatMessageDto(
        Long id,
        String roomId,
        String sender,
        String content,
        String type,
        LocalDateTime sendAt) {
}
