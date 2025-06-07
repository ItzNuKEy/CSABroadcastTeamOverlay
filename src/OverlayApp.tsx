import { useEffect } from "react";
import { WebsocketService } from "./services/websocketService";
import { WebsocketContext } from "./contexts/WebsocketContext";
import { Overlay } from "./scenes/Overlay";
import { GameInfoProvider } from "./models/contexts/GameinfoProvider";
import './fonts.css';
import { GameService } from "./services/gameService";

function App() {
  useEffect(() => {
    WebsocketService.init(49322, false);
  }, []); // ✅ Add empty dependency array so it only runs once

  useEffect(() => {
  GameService.replayTagService.init();
  }, []);

  return (
    <WebsocketContext.Provider value={WebsocketService}>
      <GameInfoProvider>
        <Overlay />
      </GameInfoProvider>
    </WebsocketContext.Provider>
  );
}

export default App;
