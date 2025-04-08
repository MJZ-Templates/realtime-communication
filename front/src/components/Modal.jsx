import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import Input from './Input';

const Modal = ({
  ModalText,
  placeholder,
  ButtonText,
  onClick,
  onClose,
  value: initialValue,
}) => {
  const modalRef = useRef(null);
  const focusRef = useRef(null);
  const [inputValue, setInputValue] = useState(initialValue ?? '');

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  useEffect(() => {
    setInputValue(initialValue ?? '');
  }, [initialValue]);

  const handleConfirm = () => {
    if (inputValue.trim()) {
      onClick(inputValue.trim());
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Backdrop>
      <ModalBox ref={modalRef}>
        <h3>{ModalText}</h3>
        <Input
          ref={focusRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <ButtonRow>
          <ModalButton onClick={handleConfirm}>{ButtonText}</ModalButton>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
        </ButtonRow>
      </ModalBox>
    </Backdrop>
  );
};

export default Modal;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
`;

const ModalBox = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  animation: fadeIn 0.25s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:first-of-type {
    background-color: #4f63ff;
    color: #fff;

    &:hover {
      background-color: #3c4cdc;
    }
  }

  &:last-of-type {
    background-color: #e0e0e0;
    color: #333;

    &:hover {
      background-color: #cccccc;
    }
  }
`;
