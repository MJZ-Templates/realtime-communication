package arkain.dev.communication.chat.ui.web;

import arkain.dev.communication.chat.app.dto.ChatMessageDto;
import arkain.dev.communication.chat.app.dto.ChatRoomResponseDto;
import arkain.dev.communication.chat.app.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatMessageQueryController {

    private final ChatMessageService chatMessageService;

    @GetMapping("/{roomId}")
    public ResponseEntity<ChatRoomResponseDto> getMessages(@PathVariable("roomId") String roomId) {
        return ResponseEntity.ok(chatMessageService.getMessages(roomId));
    }
}
