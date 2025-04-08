// components/RoomHeader.jsx
import styled from '@emotion/styled';

const RoomHeader = ({ roomName, currentUrl, onCopy }) => {
  return (
    <Wrapper>
      <Title>{roomName}</Title>
      <UrlBox>
        <UrlInput value={currentUrl} readOnly />
        <CopyButton onClick={onCopy}>Copy Link</CopyButton>
      </UrlBox>
    </Wrapper>
  );
};

export default RoomHeader;

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #222;
  margin-bottom: 12px;
`;

const UrlBox = styled.div`
  display: flex;
  gap: 12px;
`;

const UrlInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const CopyButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #4f63ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #3a4fd9;
  }
`;
