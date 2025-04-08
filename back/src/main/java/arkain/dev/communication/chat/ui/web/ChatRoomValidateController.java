package arkain.dev.communication.chat.ui.web;

import arkain.dev.communication.chat.app.dto.ChatRoomValidateDto;
import arkain.dev.communication.chat.app.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class ChatRoomValidateController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/validate/{enterCode}")
    public ResponseEntity<ChatRoomValidateDto> validateChatRoom(@PathVariable("enterCode") String enterCode) {
        return ResponseEntity.ok(chatRoomService.validateRoom(enterCode));
    }
}
