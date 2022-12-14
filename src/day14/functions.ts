interface Coordinates {
  x: number;
  y: number;
}

const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const toCoords = function splitLineToCoordinates(input: string): Coordinates[] {
  return input.split(" -> ").map((str) => {
    const s = str.split(",");
    return { x: Number(s[0]), y: Number(s[1]) };
  });
};

const getLine = function getRangeFromCoords(
  c1: Coordinates,
  c2: Coordinates,
): Coordinates[] {
  const range = [];

  const xStart = Math.min(c1.x, c2.x);
  const xEnd = Math.max(c1.x, c2.x);
  const yStart = Math.min(c1.y, c2.y);
  const yEnd = Math.max(c1.y, c2.y);

  for (let x = xStart; x <= xEnd; x += 1) {
    for (let y = yStart; y <= yEnd; y += 1) {
      range.push({ x, y });
    }
  }

  return range;
};

const pointsToLines = function turnPointsToLines(
  points: Coordinates[],
): Coordinates[] {
  let lines: Coordinates[] = [];

  for (let i = 1; i < points.length; i += 1) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const line = getLine(p1, p2);
    lines = lines.concat(line);
  }

  return lines;
};

const linesToMap = function turn2DArrayOfObjectsToSet<T>(
  arr: T[][],
): Set<string> {
  const set = new Set(arr.flat().map((elm) => JSON.stringify(elm)));

  return set;
};

const pointFilled = function setHasPoint(
  map: Set<string>,
  point: Coordinates,
): boolean {
  return map.has(`{"x":${point.x},"y":${point.y}}`);
};

const addPoint = function addPointToSet(map: Set<string>, point: Coordinates) {
  map.add(`{"x":${point.x},"y":${point.y}}`);
};

const getAbyss = function getHighestArrayValue(map: Set<string>): number {
  const arr: number[] = Array.from(map)
    .map((elm) => JSON.parse(elm))
    .map((coord) => coord.y);
  return Math.max(...arr) + 1;
};

const sandFall = function letSandFall(
  map: Set<string>,
  sand: Coordinates,
  depth: number,
  maxDepth: number,
): Coordinates {
  if (depth >= maxDepth) return sand;

  const newSand = { x: sand.x, y: sand.y + 1 };

  if (!pointFilled(map, newSand)) {
    return sandFall(map, newSand, depth + 1, maxDepth);
  }
  newSand.x -= 1;
  if (!pointFilled(map, newSand)) {
    return sandFall(map, newSand, depth + 1, maxDepth);
  }
  newSand.x += 2;
  if (!pointFilled(map, newSand)) {
    return sandFall(map, newSand, depth + 1, maxDepth);
  }

  return sand;
};

const day1 = function answer(input: string) {
  const lines = splitLines(input)
    .map((line) => toCoords(line))
    .map((points) => pointsToLines(points));
  const map = linesToMap(lines);

  const sandSource = { x: 500, y: 0 };
  const abyss = getAbyss(map);
  let sandAmount = 0;
  let falling = true;

  while (falling) {
    const sand = sandSource;
    const newSand = sandFall(map, sand, 0, abyss);
    if (newSand.y >= abyss) {
      falling = false;
    } else {
      addPoint(map, newSand);
      sandAmount += 1;
    }
  }

  return sandAmount;
};

const day2 = function answer(input: string) {
  const lines = splitLines(input)
    .map((line) => toCoords(line))
    .map((points) => pointsToLines(points));
  const map = linesToMap(lines);

  const sandSource = { x: 500, y: 0 };
  let sandAmount = 0;
  let falling = true;
  const abyss = getAbyss(map);

  while (falling) {
    const sand = sandSource;
    const newSand = sandFall(map, sand, 0, abyss);
    if (newSand.x === 500 && newSand.y === 0) {
      falling = false;
    }
    addPoint(map, newSand);
    sandAmount += 1;
  }

  return sandAmount;
};

export { day1, day2 };
