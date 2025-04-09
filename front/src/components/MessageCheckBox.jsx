import styled from '@emotion/styled';

const MessageCheckBox = ({ checked, onChange }) => {
  return (
    <CheckBoxWrapper>
      <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
      <StyledBox checked={checked}>
        {checked && <CheckMark>✔</CheckMark>}
      </StyledBox>
    </CheckBoxWrapper>
  );
};

export default MessageCheckBox;

const CheckBoxWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const StyledBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: ${({ checked }) => (checked ? '#4f63ff' : 'transparent')};
  border: 2px solid ${({ checked }) => (checked ? '#4f63ff' : '#ccc')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
`;

const CheckMark = styled.span`
  color: #fff;
  font-size: 14px;
`;
