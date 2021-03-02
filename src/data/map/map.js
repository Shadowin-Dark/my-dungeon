export const buildMap = (n, m) => {
  const map = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < m; j++) {
      row.push({
        keyID: `field-${i}-${j}`,
        id: 1,
        hide: true
      });
    }
    map.push(row);
  }
  map[0][0].user = 1;
  map[0][0].hide = false;
  return map;
};
