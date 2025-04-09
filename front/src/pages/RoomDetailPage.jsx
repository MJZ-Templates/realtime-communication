import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MessageItem from '../components/MessageItem';
import Modal from '../components/Modal';
import QuestionInputBox from '../components/QuestionInputBox';
import RoomHeader from '../components/RoomHeader';
import SystemMessage from '../components/SystemMessage';
import Toast from '../components/Toast';
import useChatMessage from '../hooks/useChatMessage';
import useLocalStorage from '../hooks/useLocalStorage';
import useRoomUIStore from '../hooks/useRoomUI';

const Room = () => {
  const { roomId } = useParams();
  const [username, setUsername] = useLocalStorage(`username-${roomId}`, '');

  const {
    question,
    showModal,
    copied,
    setQuestion,
    showModalBox,
    hideModalBox,
    showToast,
    hideToast,
  } = useRoomUIStore();

  const {
    messages,
    roomName,
    sendChatMessage,
    sendJoinMessage,
    sendSolveMessage,
    sendLeaveMessage,
    fetchInitialMessages,
  } = useChatMessage({ roomId, username });

  const currentUrl = useMemo(() => window.location.href, []);
  const isComposing = useRef(false);
  const didMount = useRef(false);
  const focusRef = useRef(null);

  useEffect(() => {
    // Focus on input when the component mounts
    focusRef.current?.focus();
  });

  useEffect(() => {
    // Show modal if username is not set
    console.log(`didMount is ${didMount.current}`);
    if (!didMount.current) {
      if (!username) {
        showModalBox();
      } else {
        // Send join message if username is set
        console.log('sendJoinMessage', username);
        sendJoinMessage(username);
      }
      didMount.current = true;
    }
  }, [username, showModalBox, sendJoinMessage]);

  useEffect(() => {
    // Fetch initial messages when the component mounts
    fetchInitialMessages();
  }, [fetchInitialMessages]);

  useEffect(() => {
    // Disconnect the socket when the component unmounts
    const handleBeforeUnload = (e) => {
      sendLeaveMessage(username);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sendLeaveMessage, username]);

  const handleCreate = (newUsername) => {
    console.log('newUsername', newUsername);
    setUsername(newUsername);
    sendJoinMessage(newUsername);
    hideModalBox();
  };

  const handleSubmit = () => {
    if (question.trim() !== '') {
      sendChatMessage(question);
      setQuestion('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    showToast();
    setTimeout(hideToast, 2000);
  };

  const renderMessage = useCallback(
    (msg, index) => {
      if (msg.type === 'JOIN' || msg.type === 'LEAVE') {
        return (
          <SystemMessage key={msg.id ?? `msg-${index}`} content={msg.content} />
        );
      }

      return (
        <MessageItem
          key={msg.id ?? `msg-${index}`}
          id={msg.id}
          sender={msg.sender}
          sendAt={msg.sendAt}
          checked={msg.solved ?? false}
          onCheck={sendSolveMessage}
          content={msg.content}
        />
      );
    },
    [sendSolveMessage],
  );

  const renderedMessages = useMemo(() => {
    return messages.map(renderMessage);
  }, [messages, renderMessage]);

  return (
    <Wrapper>
      <RoomHeader
        roomName={roomName}
        currentUrl={currentUrl}
        onCopy={handleCopy}
      />

      <QuestionInputBox
        ref={focusRef}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isComposing.current) {
            handleSubmit();
          }
        }}
        onCompositionStart={() => {
          isComposing.current = true;
        }}
        onCompositionEnd={() => {
          isComposing.current = false;
        }}
      />

      <MessageList>{renderedMessages}</MessageList>

      {copied && <Toast message="URL Copied!" />}

      {!username && showModal && (
        <Modal
          ModalText="Enter your name to join the room"
          placeholder="Enter your name"
          onClick={handleCreate}
          ButtonText="Join"
          value={username}
          setValue={setUsername}
          onClose={hideModalBox}
        />
      )}
    </Wrapper>
  );
};

export default Room;

// 스타일은 그대로 유지
const Wrapper = styled.div`
  padding: 40px 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #a0c4ff, #cdb4db);
  font-family: 'Inter', sans-serif;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
