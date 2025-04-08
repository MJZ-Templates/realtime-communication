import styled from '@emotion/styled';
import React from 'react';

const SystemMessage = ({ content }) => {
  return (
    <Wrapper>
      <MessageMeta>
        <Content>{content}</Content>
      </MessageMeta>
    </Wrapper>
  );
};

export default SystemMessage;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  background: #f5f3f379;
  padding: 8px 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const MessageMeta = styled.div`
  margin-left: 16px;
  flex: 1;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #222;
  line-height: 1.3;
`;
