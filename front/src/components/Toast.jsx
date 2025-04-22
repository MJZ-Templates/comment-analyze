import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

const Toast = ({ message, duration = 1000, onDone }) => {
  const [visible, setVisible] = useState(false);
  const [localMessage, setLocalMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setLocalMessage(message);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  useEffect(() => {
    if (!visible && localMessage) {
      const cleanup = setTimeout(() => {
        onDone?.();
        setLocalMessage(null);
      }, 300); // fadeOut duration
      return () => clearTimeout(cleanup);
    }
  }, [visible, localMessage, onDone]);

  if (!localMessage) return null;

  return <Container $visible={visible}>{localMessage}</Container>;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 12px 20px;
  background-color: #333;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  z-index: 1000;

  animation: ${({ $visible }) =>
    $visible
      ? css`
          ${fadeIn} 0.3s ease-out
        `
      : css`
          ${fadeOut} 0.3s ease-in
        `};
  animation-fill-mode: forwards;
`;

export default Toast;
