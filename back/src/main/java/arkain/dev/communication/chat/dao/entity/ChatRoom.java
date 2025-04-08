package arkain.dev.communication.chat.dao.entity;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor
public class ChatRoom {
    @Id
    private String id;

    private String name;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<ChatMessage> messages = new ArrayList<>();

    public ChatRoom(String name) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
    }

    public void addChat(ChatMessage chatMessage) {
        messages.add(chatMessage);
        chatMessage.setRoom(this);
    }
}
