export const FieldList = [
  {
    id: 0,
    name: '隐藏',
    description: '地块被隐藏'
  },
  {
    id: 1,
    name: '草地',
    description: '这是一块草地',
    sideEffect: {
      movestart: user => user,
      movein: user => user,
      moveout: user => user,
      battle: (user, monster) => [user, monster],
      moveend: user => user
    }
  }
];
