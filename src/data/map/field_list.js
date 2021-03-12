export const FieldList = [
  {
    id: 0,
    name: '隐藏',
    description: '地块被隐藏'
  },
  {
    id: 1,
    name: '测试1',
    description: '这是一块空地',
    sideEffect: {
      movestart: { dice: 0, func: player => player },
      movein: [0, player => player],
      moveout: [0, player => player],
      battle: (player, monster) => [player, monster],
      moveend: player => player
    }
  },
  {
    id: 2,
    name: '测试2',
    description: '回合开始时掷一枚骰子，点数>3方可移动',
    sideEffect: {
      movestart: {
        dice: 1,
        func: (player, diceList) => {
          const dice = diceList[0];
          if (dice <= 3) {
            player.SPD = { ...player.SPD, R: 0 };
          }
          return { ...player };
        }
      },
      movein: [0, player => player],
      moveout: [0, player => player],
      battle: (player, monster) => [player, monster],
      moveend: player => player
    }
  }
];
