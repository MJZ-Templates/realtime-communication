package arkain.dev.communication.chat.app.service;

import arkain.dev.communication.chat.app.dto.ChatRoomValidateDto;
import arkain.dev.communication.chat.app.dto.RoomIdResponseDto;
import arkain.dev.communication.chat.dao.ChatRoomRepository;
import arkain.dev.communication.chat.dao.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public RoomIdResponseDto createRoom(String name) {
        ChatRoom newRoom = chatRoomRepository.save(new ChatRoom(name));
        return new RoomIdResponseDto(newRoom.getId());
    }

    public ChatRoom getChatRoom(String enterCode) {
        return chatRoomRepository.findById(enterCode)
                .or(() -> chatRoomRepository.findByName(enterCode))
                .orElseThrow(() -> new IllegalArgumentException("Chat room not found"));
    }

    public ChatRoomValidateDto validateRoom(String enterCode) {
        return new ChatRoomValidateDto(chatRoomRepository.existsByIdOrName(enterCode));
    }
}
