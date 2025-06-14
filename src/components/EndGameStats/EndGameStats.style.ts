import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;   /* horizontal centering */
  align-items: flex-end;     /* align everything to the bottom */
  height: 1080px;
  width: 1920px;
  background: rgba(0, 0, 0, 0.6); 
  color: white;
  font-family: "Segoe UI", sans-serif;
  font-size: 24px;
  box-sizing: border-box;
  padding-bottom: 74px; /* initial distance from bottom, adjust freely */
`;

export const TeamWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end; /* makes each column bottom-aligned */
  gap: 40px;
`;

export const TeamColumn = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PlayerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px; /* fixed width for consistent layout */
  flex-shrink: 0;
`;

export const StatLabelColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64.5px;
  margin-bottom: 12.5px;
`;

export const PlayerCell = styled.div`
  width: 180px;
  text-align: center;
  font-size: 50px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Monofonto"; monospace;
`;

export const PlayerName = styled.div`
  font-size: clamp(20px, 5vw, 40px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  text-align: center;
  font-family: "Monofonto"; monospace;

  transform: translateY(-40px); 
`;

export const StatLabel = styled.div`
  width: 250px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #ccc;
  text-transform: uppercase;
`;

export const PlayerNameWrapper = styled.div`
  height: 110px;  /* increased from 60px to allow shifting */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* keep this to prevent overflow elsewhere */
`;


export const StatGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 41px;
`;