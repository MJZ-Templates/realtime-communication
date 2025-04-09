package arkain.dev.communication.chat.app.dto;

import java.time.LocalDateTime;

public record ChatResponseMessage(
        Long id,
        String sender,
        String content,
        String type,
        Boolean solved,
        LocalDateTime sendAt
) {
}
