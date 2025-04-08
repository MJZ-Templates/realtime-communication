import styled from '@emotion/styled';
import { useState } from 'react';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useChatRoomActions } from '../hooks/useChatRoomActions';
import useToast from '../hooks/useToast';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const { toastMessage, showToast } = useToast();
  const { createRoom, validateAndJoinRoom } = useChatRoomActions();

  const handleCreate = async (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    await createRoom({
      name: trimmedName,
      onSuccess: handleClose,
      onError: showToast,
    });
  };

  const handleClose = () => {
    setNewRoomName('');
    setShowModal(false);
  };

  const handleEnterRoom = async (e) => {
    if (e.key === 'Enter' && roomName.trim()) {
      await validateAndJoinRoom({
        name: roomName.trim(),
        onError: showToast,
      });
    }
  };

  return (
    <Wrapper>
      <Container>
        <Message>
          <OnboardingTitle>Welcome to ChatRoom!</OnboardingTitle>
          <OnboardingSubtitle>
            Real-time conversations, one room away.
          </OnboardingSubtitle>
          <OnboardingDescription>
            ChatRoom lets you instantly create or join a secure chat space — no
            signups, no friction. Whether you're brainstorming with your team,
            hosting a Q&A, or just catching up, your conversation starts here.
          </OnboardingDescription>
        </Message>

        <StyledInput
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter the room name"
          onKeyDown={handleEnterRoom}
        />
        <CreateRoomLink onClick={() => setShowModal(true)}>
          or create new room
        </CreateRoomLink>
      </Container>
      {showModal && (
        <Modal
          ModalText="Create New Room"
          placeholder="Enter room name"
          onClick={handleCreate}
          ButtonText="Create"
          value={newRoomName}
          setValue={setNewRoomName}
          onClose={handleClose}
        />
      )}
      {toastMessage && <Toast message={toastMessage} />}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #a0c4ff, #cdb4db);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const Container = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 64px 48px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 960px;
  box-sizing: border-box;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 48px 24px;
    border-radius: 16px;
  }
`;

const Message = styled.div`
  text-align: center;
  margin-bottom: 40px;
  max-width: 720px;
  padding: 0 20px;
`;

const OnboardingTitle = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #222;
  margin-bottom: 20px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const OnboardingSubtitle = styled.p`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  line-height: 1.7;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const OnboardingDescription = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #666;
  line-height: 1.8;
  margin-bottom: 36px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  font-size: 18px;
`;

const CreateRoomLink = styled.a`
  margin-top: 10px;
  font-size: 18px;
  color: #555;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #4f63ff;
  }
`;
