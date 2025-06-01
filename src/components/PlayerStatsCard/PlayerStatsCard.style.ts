import styled from "styled-components";

export const StatCardWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 40px;
  width: 600px;
  font-family: Monofonto, Helvetica, sans-serif;
  overflow: hidden;
`;

export const ColorBarBlue = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 585px;
  height: 70px;
  background: #178bff;
  z-index: 0;
  border-radius: 16px;
`;

export const ColorBarOrange = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 585px;
  height: 70px;
  background: #ff5622;
  z-index: 0;
  border-radius: 16px;
`;

export const StatCardContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 5px;
`;

export const StatCardPlayerName = styled.p`
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin: -1px 0 15px 10px;
  text-align: left;
`;

export const StatCardStatRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  transform: translateY(-7px);
`;

// Wrap each stat name and value in a flex row container
export const StatPair = styled.div`
  display: flex;
  flex-direction: row;  // side by side
  align-items: center;  // vertically centered
  gap: 8px;
`; 

export const StatCardStatName = styled.p<{ $strokeColor: string }>`
  font-size: 30px;
  margin: 0;
  color: white;
  text-shadow:
    -.5px -.5px 0 ${({ $strokeColor }) => $strokeColor},
     .5px -.5px 0 ${({ $strokeColor }) => $strokeColor},
    -.5px  .5px 0 ${({ $strokeColor }) => $strokeColor},
     .5px  .5px 0 ${({ $strokeColor }) => $strokeColor};
`;

export const StatCardStatValue = styled.p<{ $strokeColor: string }>`
  font-size: 50px;
  font-weight: bold;
  margin: 0;
  color: white;
  text-shadow:
    -1px -1px 0 ${({ $strokeColor }) => $strokeColor},
     1px -1px 0 ${({ $strokeColor }) => $strokeColor},
    -1px  1px 0 ${({ $strokeColor }) => $strokeColor},
     1px  1px 0 ${({ $strokeColor }) => $strokeColor};
`;
