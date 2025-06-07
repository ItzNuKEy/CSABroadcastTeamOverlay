import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  font-family: "Segoe UI", sans-serif;
  font-size: 1.5rem; /* ⬅️ Increased base font */
`;

export const TeamWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 120px; /* ⬅️ More space between blue and orange teams */
`;

export const PlayerStatColumn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px; /* ⬅️ More space between each player's column */
`;

export const StatLabelColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px; /* ⬅️ More vertical space between labels */
`;

export const StatRow = styled.div`
  font-weight: bold;
  text-align: center;
  width: 100px;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ccc;
`;

export const PlayerCell = styled.div`
  width: 100px;
  text-align: center;
  margin-bottom: 6px;
  font-size: 1.3rem;
`;
