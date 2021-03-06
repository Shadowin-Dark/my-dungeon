export const ajustPositions = (map, x, y) => {
  const n = map.length;
  let m = 0;
  if (n > 0) {
    m = map[0].length;
  }

  const positions = [];

  if (y > 0) {
    positions.push({ x, y: y - 1 });
  }
  if (y < m - 1) {
    positions.push({ x, y: y + 1 });
  }
  if (x > 0) {
    positions.push({ x: x - 1, y });
    if (x % 2 === 1 && y > 0) {
      positions.push({ x: x - 1, y: y - 1 });
    } else if (x % 2 === 0 && y < m - 1) {
      positions.push({ x: x - 1, y: y + 1 });
    }
  }
  if (x < n - 1) {
    positions.push({ x: x + 1, y });
    if (x % 2 === 1 && y > 0) {
      positions.push({ x: x + 1, y: y - 1 });
    } else if (x % 2 === 0 && y < m - 1) {
      positions.push({ x: x + 1, y: y + 1 });
    }
  }
  console.log('positions', positions);
  return positions;
};
