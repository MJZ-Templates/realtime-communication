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
    fetchInitialMessages,
  } = useChatMessage({ roomId, username });

  const currentUrl = useMemo(() => window.location.href, []);
  const isComposing = useRef(false);
  const didMount = useRef(false);
  const focusRef = useRef(null);

  const handleCreate = (newUsername) => {
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

  useEffect(() => {
    focusRef.current?.focus();
  });

  useEffect(() => {
    if (!didMount.current) {
      if (!username) {
        showModalBox();
      }
      didMount.current = true;
    }
  }, [username, showModalBox]);

  useEffect(() => {
    fetchInitialMessages();
  }, [fetchInitialMessages]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    showToast();
    setTimeout(hideToast, 2000);
  };

  const renderMessage = useCallback((msg, index) => {
    if (msg.type === 'JOIN' || msg.type === 'LEAVE') {
      return (
        <SystemMessage key={msg.id ?? `msg-${index}`} content={msg.content} />
      );
    }
    return (
      <MessageItem
        key={msg.id ?? `msg-${index}`}
        sender={msg.sender}
        sendAt={msg.sendAt}
        content={msg.content}
      />
    );
  }, []);

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
