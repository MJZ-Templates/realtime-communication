import styled from '@emotion/styled';
import React, { useCallback, useEffect, useRef } from 'react';
import Input from './Input';

const Modal = ({
  ModalText,
  placeholder,
  ButtonText,
  onClick,
  onClose,
  value,
  setValue,
}) => {
  const modalRef = useRef(null);
  const focusRef = useRef(null);

  const handleClickOutside = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    },
    [onClose],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && typeof value === 'string' && value.trim()) {
        onClick(value);
        onClose();
      }
    },
    [onClick, onClose, value],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    focusRef.current?.focus();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return (
    <Backdrop>
      <ModalBox ref={modalRef}>
        <h3>{ModalText}</h3>
        <Input
          ref={focusRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
        <ButtonRow>
          <ModalButton
            onClick={() => {
              onClick(value);
            }}
          >
            {ButtonText}
          </ModalButton>
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
