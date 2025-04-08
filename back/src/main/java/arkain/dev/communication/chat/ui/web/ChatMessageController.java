package arkain.dev.communication.chat.ui.web;

import arkain.dev.communication.chat.app.dto.ChatMessageDto;
import arkain.dev.communication.chat.app.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    @PostMapping("/{enterCode}")
    public ResponseEntity<?> handleMessage(@PathVariable("enterCode") String enterCode, @RequestBody ChatMessageDto message) {
        chatMessageService.saveChatMessage(enterCode, message);
        return ResponseEntity.ok().build();
    }
}
