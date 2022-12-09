const to2dArray = function stringArrayTo2DNumArray(input: string): number[][] {
  const lines = input.split(/[\r\n]/);
  const arrays = lines.map((line) => line.split("").map((c) => Number(c)));
  return arrays;
};

const getCol = function getColumnFrom2DArray<T>(
  matrix: T[][],
  col: number,
): T[] {
  return matrix.map((row) => row[col]);
};

const isVisible = function isTreeVisible(
  forest: number[][],
  x: number,
  y: number,
): number {
  const col = getCol(forest, x);
  const row = forest[y];
  const origin = forest[y][x];

  const north = col.slice(0, y).every((tree) => tree < origin);
  const south = col.slice(y + 1).every((tree) => tree < origin);
  const east = row.slice(0, x).every((tree) => tree < origin);
  const west = row.slice(x + 1).every((tree) => tree < origin);

  if (north || south || east || west) {
    return 1;
  }
  return 0;
};

const getScore = function getTreeSenicScore(
  forest: number[][],
  x: number,
  y: number,
): number {
  const col = getCol(forest, x);
  const row = forest[y];
  const origin = forest[y][x];

  const north = col.slice(0, y).reverse();
  const south = col.slice(y + 1);
  const east = row.slice(0, x).reverse();
  const west = row.slice(x + 1);

  let northScore = north.findIndex((tree) => tree >= origin) + 1;
  northScore = northScore === 0 ? north.length : northScore;
  let southScore = south.findIndex((tree) => tree >= origin) + 1;
  southScore = southScore === 0 ? south.length : southScore;
  let eastScore = east.findIndex((tree) => tree >= origin) + 1;
  eastScore = eastScore === 0 ? east.length : eastScore;
  let westScore = west.findIndex((tree) => tree >= origin) + 1;
  westScore = westScore === 0 ? west.length : westScore;

  return northScore * southScore * eastScore * westScore;
};

const day1 = function answer(input: string) {
  const forest = to2dArray(input);
  const numRows = forest.length;
  const numCols = forest[0].length;
  let count = 0;

  for (let y = 1; y < numRows - 1; y += 1) {
    for (let x = 1; x < numCols - 1; x += 1) {
      count += isVisible(forest, x, y);
    }
  }

  const perimeter = forest.length * 2 + (forest[0].length - 2) * 2;

  return count + perimeter;
};

const day2 = function answer(input: string) {
  const forest = to2dArray(input);
  const numRows = forest.length;
  const numCols = forest[0].length;
  let highest = 0;

  for (let y = 1; y < numRows - 1; y += 1) {
    for (let x = 1; x < numCols - 1; x += 1) {
      const score: number = getScore(forest, x, y);
      highest = score > highest ? score : highest;
    }
  }

  return highest;
};

export { day1, day2 };
