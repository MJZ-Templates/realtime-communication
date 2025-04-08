package arkain.dev.communication.chat.dao;

import arkain.dev.communication.chat.dao.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {

    boolean existsById(@NonNull String id);

    @Query("select count(c) > 0 from ChatRoom c" +
            " where c.id=:enterCode" +
            " or c.name=:enterCode")
    boolean existsByIdOrName(@Param("enterCode") String enterCode);

    Optional<ChatRoom> findByName(String enterCode);
}
