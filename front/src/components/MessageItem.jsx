import styled from '@emotion/styled';
import MessageCheckBox from './MessageCheckBox';

const MessageItem = ({ id, sender, sendAt, content, checked, onCheck }) => {
  const formattedTime = new Date(sendAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <Wrapper>
      <ProfileCircle>{sender.charAt(0).toUpperCase()}</ProfileCircle>
      <MessageMeta>
        <UserName>{sender}</UserName>
        <Time>{formattedTime}</Time>
        <Content>{content}</Content>
      </MessageMeta>
      <MessageCheckBox checked={checked} onChange={() => onCheck(id)} />
    </Wrapper>
  );
};

export default MessageItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 16px 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const ProfileCircle = styled.div`
  width: 48px;
  height: 48px;
  background-color: #ddd;
  border-radius: 50%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 18px;
`;

const MessageMeta = styled.div`
  margin-left: 16px;
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const Time = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
`;

const Content = styled.div`
  font-size: 16px;
  color: #222;
  line-height: 1.5;
`;
