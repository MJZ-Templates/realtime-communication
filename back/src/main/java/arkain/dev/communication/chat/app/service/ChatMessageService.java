package arkain.dev.communication.chat.app.service;

import arkain.dev.communication.chat.app.dto.ChatMessageDto;
import arkain.dev.communication.chat.app.dto.ChatResponseMessage;
import arkain.dev.communication.chat.app.dto.ChatRoomResponseDto;
import arkain.dev.communication.chat.dao.ChatMessageRepository;
import arkain.dev.communication.chat.dao.entity.ChatMessage;
import arkain.dev.communication.chat.dao.entity.ChatRoom;
import arkain.dev.communication.chat.dao.entity.MessageType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;

    public ChatMessage findChatMessage(Long id) {
        return chatMessageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Chat message not found"));
    }

    public ChatResponseMessage saveChatMessage(String enterCode, ChatMessageDto dto) {
        ChatRoom chatRoom = chatRoomService.getChatRoom(enterCode);
        ChatMessage chatMessage = ChatMessage.create(
                chatRoom,
                dto.sender(),
                dto.content(),
                dto.type());
        chatMessageRepository.save(chatMessage);
        return new ChatResponseMessage(
                chatMessage.getId(),
                chatMessage.getSender(),
                chatMessage.getContent(),
                chatMessage.getType().toString(),
                chatMessage.isSolved(),
                chatMessage.getCreatedAt()
        );
    }

    public void saveChatMessage(ChatMessage message) {
        chatMessageRepository.save(message);
    }

    public ChatRoomResponseDto getMessages(String roomId) {
        ChatRoom chatRoom = chatRoomService.getChatRoom(roomId);
        List<ChatMessage> findMessages = chatMessageRepository.findByRoomIdOrderByCreatedAtDesc(roomId);
        List<ChatResponseMessage> messages = findMessages.stream()
                .map(message -> new ChatResponseMessage(
                        message.getId(),
                        message.getSender(),
                        message.getContent(),
                        message.getType().toString(),
                        message.isSolved(),
                        message.getCreatedAt()))
                .toList();

        return new ChatRoomResponseDto(
                chatRoom.getId(),
                chatRoom.getName(),
                messages);
    }

    public ChatResponseMessage solveProblem(ChatMessageDto message) {
        ChatMessage chatMessage = findChatMessage(message.id());
        chatMessage.solveProblem();
        return new ChatResponseMessage(
                chatMessage.getId(),
                chatMessage.getSender(),
                chatMessage.getContent(),
                MessageType.SOLVE.toString(),
                chatMessage.isSolved(),
                chatMessage.getCreatedAt()
        );
    }
}
