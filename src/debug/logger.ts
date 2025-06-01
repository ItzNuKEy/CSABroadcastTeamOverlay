export const logAssisterDetection = (data: any, prev: any) => {
  console.log("----- Assister Detection Debug -----");

  Object.entries(data.players).forEach(([key, current]) => {
    const prevPlayer = prev.players.find((p: any) => p.name === key);
    const prevAssists = prevPlayer?.assists ?? 0;

    console.log(`Player: ${key}`);
    console.log(`  Previous Assists: ${prevAssists}`);
    console.log(`  Current Assists:  ${current.assists}`);

    if (current.assists > prevAssists) {
      console.log(`  ➤ POTENTIAL ASSISTER DETECTED: ${key}`);
    }
  });

  console.log("------------------------------------");
};