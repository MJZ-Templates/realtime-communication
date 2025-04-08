import styled from '@emotion/styled';

const Toast = ({ message = 'Copied!', duration = 2000 }) => {
  return <StyledToast>{message}</StyledToast>;
};

export default Toast;

const StyledToast = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  background-color: rgba(255, 255, 255, 0.6);
  color: rgba(0, 0, 0, 0.8);
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  animation: fadeInOut 2s ease-in-out;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    10% {
      opacity: 1;
      transform: translateY(0);
    }
    90% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
  }
`;
