package arkain.dev.communication.chat.dao.entity;

import arkain.dev.communication.common.dao.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
public class ChatMessage extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private ChatRoom room;

    private String sender;

    private String content;

    private boolean solved = false;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    public static ChatMessage create(ChatRoom room, String sender, String content, String type) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.room = room;
        chatMessage.sender = sender;
        chatMessage.content = content;
        chatMessage.type = MessageType.valueOf(type);
        return chatMessage;
    }

    public void solveProblem() {
        this.solved = true;
    }
}
