package arkain.dev.communication.chat.dao;

import arkain.dev.communication.chat.dao.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByRoomIdOrderByCreatedAtDesc(String roomId);
}
