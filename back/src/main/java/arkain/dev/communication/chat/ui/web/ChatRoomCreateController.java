package arkain.dev.communication.chat.ui.web;

import arkain.dev.communication.chat.app.dto.RoomIdResponseDto;
import arkain.dev.communication.chat.app.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class ChatRoomCreateController {

    private final ChatRoomService chatRoomService;

    @PostMapping
    public ResponseEntity<RoomIdResponseDto> createChatRoom(@RequestParam String name) {
        return ResponseEntity.ok(chatRoomService.createRoom(name));
    }
}
