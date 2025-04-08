// components/QuestionInputBox.jsx
import styled from '@emotion/styled';
import { BsChatDotsFill } from 'react-icons/bs';
import Input from './Input';

const QuestionInputBox = ({
  value,
  onChange,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  placeholder = 'Type your question',
}) => {
  return (
    <Container>
      <IconWrapper>
        <BsChatDotsFill size={20} />
      </IconWrapper>
      <StyledInput
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        placeholder={placeholder}
        height="48px"
        fontSize="16px"
        borderRadius="12px"
      />
    </Container>
  );
};

export default QuestionInputBox;

const Container = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrapper = styled.div`
  font-size: 28px;
  color: #4f63ff;
`;

const StyledInput = styled(Input)`
  flex: 1;
`;
