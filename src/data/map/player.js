// player
// 1. id
// 2. STR
// 3. DEX
// 4. INT
// 5. HP
// 6. ATK
// 7. MAG
// 8. DEF
// 9. SPD
// 10. EXP
// 11. RIGHT
// 12. LEFT
// 13. HEAD
// 14. ARMOR
// 15. SHOES
// 16. ACCESSOR

export const initPlay = n => {
  const players = [];
  for (let i = 0; i < n; i++) {
    players.push({
      id: i + 1,
      STR: 4,
      DEX: 4,
      INT: 4,
      HP: 20,
      ATK: { D: 2, V: 0 },
      MAG: { D: 2, V: 0 },
      DEF: 2,
      SPD: { R: 2, F: 2 },
      EXP: 0
      // RIGHT: 0,
      // LEFT: 0,
      // HEAD: 0,
      // ARMOR: 0,
      // SHOES: 0,
      // ACCESSOR: 0,
    });
  }
  return players;
};
