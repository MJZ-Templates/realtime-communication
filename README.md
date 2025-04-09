## 💬 Real-time Q&A App with Spring Boot & React
* Built with Spring Boot 3.4.4 and Amazon Corretto 21
* Host Q&A sessions in real time – perfect for events, lectures, or live streams
* ✨ Live question sync – Users can submit questions and see updates instantly via WebSocket (STOMP)
* ✅ Question resolution tracking – Mark questions as answered to manage audience engagement
* 🔗 Easy room sharing – Create a room and share the unique link or join using a room number
* ⚡ Streamlined architecture – Clean separation of domain, service, and controller layers for rapid development

## 📂 Project Structure
front
```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── Button.jsx
    │   ├── Input.jsx
    │   ├── MessageCheckBox.jsx
    │   ├── MessageItem.jsx
    │   ├── Modal.jsx
    │   ├── QuestionInputBox.jsx
    │   ├── RoomHeader.jsx
    │   ├── SystemMessage.jsx
    │   └── Toast.jsx
    ├── hooks
    │   ├── useChatMessage.js
    │   ├── useChatRoomActions.js
    │   ├── useLocalStorage.js
    │   ├── useRoomUI.js
    │   ├── useToast.js
    │   └── useWebSocket.js
    ├── index.css
    ├── index.js
    ├── pages
    │   ├── HomePage.jsx
    │   └── RoomDetailPage.jsx
    ├── reportWebVitals.js
    ├── services
    │   ├── apis
    │   │   ├── chat.js
    │   │   ├── chatRoom.js
    │   │   └── instance.js
    │   └── socket
    │       └── socketClient.js
    └── setupTests.js

```

back
```
.
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle
└── src
    └── main
        ├── java
        │   └── arkain
        │       └── dev
        │           └── communication
        │               ├── CommunicationApplication.java
        │               ├── chat
        │               │   ├── app
        │               │   │   ├── ChatMessageHandler.java
        │               │   │   ├── dto
        │               │   │   │   ├── ChatMessageDto.java
        │               │   │   │   ├── ChatRequestMessage.java
        │               │   │   │   ├── ChatResponseMessage.java
        │               │   │   │   ├── ChatRoomResponseDto.java
        │               │   │   │   ├── ChatRoomValidateDto.java
        │               │   │   │   └── RoomIdResponseDto.java
        │               │   │   └── service
        │               │   │       ├── ChatMessageHandlerService.java
        │               │   │       ├── ChatMessageService.java
        │               │   │       ├── ChatRoomService.java
        │               │   │       └── messageHandler
        │               │   │           ├── AbstractSystemMessageHandler.java
        │               │   │           ├── ChatHandler.java
        │               │   │           ├── JoinHandler.java
        │               │   │           ├── LeaveHandler.java
        │               │   │           └── SolveHandler.java
        │               │   ├── dao
        │               │   │   ├── ChatMessageRepository.java
        │               │   │   ├── ChatRoomRepository.java
        │               │   │   └── entity
        │               │   │       ├── ChatMessage.java
        │               │   │       ├── ChatRoom.java
        │               │   │       └── MessageType.java
        │               │   └── ui
        │               │       ├── message
        │               │       │   └── ChatController.java
        │               │       └── web
        │               │           ├── ChatMessageController.java
        │               │           ├── ChatMessageQueryController.java
        │               │           ├── ChatRoomCreateController.java
        │               │           └── ChatRoomValidateController.java
        │               ├── common
        │               │   ├── dao
        │               │   │   └── BaseTimeEntity.java
        │               │   └── handler
        │               │       └── GlobalExceptionHandler.java
        │               └── config
        │                   ├── AuditConfig.java
        │                   ├── CorsConfig.java
        │                   └── WebSocketConfig.java
        └── resources
            ├── application.properties
            ├── static
            └── templates

```

## 🔧 Tip & Guide
1. **Get URL and Port**
    - You can get the default URL/Port and add URL/Port in the top right.
    - Hover on the [Preview]->[Running URL and Port] button in menu bar.

2. **Command feature**
    - You can simply run your script using the shortcut icons on the top right.
    - Hover on the [Run]->[Add run command] button in menu bar.

3. **SSH Configuration**
    - This feature is only available for membership users.
    - You can SSH to the Arkain container from the outside via the [Menu]->[SSH Configuration] in menu bar.

## 💬 Support & Documentation
Visit [https://arkain.io](https://arkain.io/) to support and learn more about using arkain.

To watch usage guides, visit [https://docs.arkain.io](https://docs.arkain.io/).
