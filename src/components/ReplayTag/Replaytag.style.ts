import styled, { keyframes } from "styled-components";

// Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ReplayContainer = styled.div<{ team: number }>`
  background-color: ${({ team }) => (team === 0 ? "#007bffcc" : "#ff4500cc")};
  padding: 1rem;
  border-radius: 8px;
  color: white;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  animation: ${fadeIn} 0.4s ease-out;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
  min-width: 300px;
  text-align: center;
  z-index: 1000;
`;

export const ReplayText = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
`;

export const GoalInfo = styled.div`
  font-size: 1rem;
  line-height: 1.4;
  p {
    margin: 0.2rem 0;
  }
`;
