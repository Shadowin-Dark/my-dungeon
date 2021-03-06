import React, { useState } from 'react';

export const Players = React.memo(({ players }) => {
  console.log('Rendering Players');
  return (
    <>
      {players.map(player => (
        <Player key={player.id} player={player} />
      ))}
    </>
  );
});

const Player = React.memo(({ player }) => {
  const [showDetails, setShowDetails] = useState(true);
  return (
    <>
      <div onClick={() => setShowDetails(!showDetails)}>{`Player ${player.id}`}</div>
      {showDetails && (
        <>
          <div>{`STR: ${player.STR}`}</div>
          <div>{`DEX:${player.DEX}`}</div>
          <div>{`INT:${player.INT}`}</div>
          <div>{`HP: ${player.HP}`}</div>
          <div>{`ATK: ${player.ATK.D}D + ${player.ATK.V}`}</div>
          <div>{`MAG: ${player.MAG.D}D + ${player.MAG.V}`}</div>
          <div>{`DEF:${player.DEF}`}</div>
          <div>{`EXP:${player.EXP}`}</div>
          <div>{`SPD:${player.SPD.R}/${player.SPD.F}`}</div>
        </>
      )}
    </>
  );
});
