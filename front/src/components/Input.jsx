import styled from '@emotion/styled';

const Input = ({
  value,
  onChange,
  placeholder,
  width,
  height,
  backgroundColor,
  color,
  borderColor,
  focusBorderColor,
  borderRadius,
  fontSize,
  ...rest
}) => {
  return (
    <StyledInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      color={color}
      borderColor={borderColor}
      focusBorderColor={focusBorderColor}
      borderRadius={borderRadius}
      fontSize={fontSize}
      {...rest}
    />
  );
};

export default Input;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '40px'};
  padding: 8px 12px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  color: ${({ color }) => color || '#000'};
  border: 1px solid ${({ borderColor }) => borderColor || '#ccc'};
  border-radius: ${({ borderRadius }) => borderRadius || '6px'};
  font-size: ${({ fontSize }) => fontSize || '14px'};
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: ${({ focusBorderColor }) => focusBorderColor || '#448efe'};
  }
`;
