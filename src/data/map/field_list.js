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
      movestart: user => user,
      movein: [0, user => user],
      moveout: [0, user => user],
      battle: (user, monster) => [user, monster],
      moveend: user => user
    }
  },
  {
    id: 2,
    name: '测试2',
    description: '进入这里需要额外1SPD',
    sideEffect: {
      movestart: user => user,
      movein: [0, user => user],
      moveout: [0, user => user],
      battle: (user, monster) => [user, monster],
      moveend: user => user
    }
  }
];
