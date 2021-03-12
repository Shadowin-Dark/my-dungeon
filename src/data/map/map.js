export const buildMap = (n, m) => {
  const map = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < m; j++) {
      row.push({
        keyID: `map-unit-${i}-${j}`,
        fieldID: 2,
        hide: true
      });
    }
    map.push(row);
  }
  return map;
};
