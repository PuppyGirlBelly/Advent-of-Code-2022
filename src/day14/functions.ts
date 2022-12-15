interface Coordinates {
  x: number;
  y: number;
}

const getLine = function getRangeFromPoints(p1: string, p2: string): string[] {
  const range = [];
  const [p1x, p1y] = p1.split(",").map((i) => Number(i));
  const [p2x, p2y] = p2.split(",").map((i) => Number(i));

  const xStart = Math.min(p1x, p2x);
  const xEnd = Math.max(p1x, p2x);
  const yStart = Math.min(p1y, p2y);
  const yEnd = Math.max(p1y, p2y);

  for (let x = xStart; x <= xEnd; x += 1) {
    for (let y = yStart; y <= yEnd; y += 1) {
      range.push(`{"x":${x},"y":${y}}`);
    }
  }

  return range;
};

const inputToFilled = function getInputAndTurnToSetOfFilledSquares(
  input: string,
): Set<string> {
  const arr = input
    .split(/[\r\n]/)
    .map((line) => line.split(" -> "))
    .map((points) => {
      let lines: string[] = [];

      for (let i = 1; i < points.length; i += 1) {
        const p1 = points[i - 1];
        const p2 = points[i];
        const line = getLine(p1, p2);
        lines = lines.concat(line);
      }

      return lines;
    })
    .flat();

  return new Set(arr);
};

const getLowest = function getHighestArrayValue(map: Set<string>): number {
  const arr: number[] = Array.from(map)
    .map((elm) => JSON.parse(elm))
    .map((coord) => coord.y);
  return Math.max(...arr);
};

const nextValidMove = function getNextPos(
  filled: Set<string>,
  point: Coordinates,
): Coordinates {
  const center = { x: point.x, y: point.y + 1 };
  if (!filled.has(`{"x":${center.x},"y":${center.y}}`)) {
    return center;
  }

  const left = { x: point.x - 1, y: point.y + 1 };
  if (!filled.has(`{"x":${left.x},"y":${left.y}}`)) {
    return left;
  }

  const right = { x: point.x + 1, y: point.y + 1 };
  if (!filled.has(`{"x":${right.x},"y":${right.y}}`)) {
    return right;
  }

  return point;
};

const sandFall = function letSandFall(
  filled: Set<string>,
  point: Coordinates,
  maxDepth: number,
): Coordinates {
  if (point.y >= maxDepth) return point;

  const newPoint = nextValidMove(filled, point);

  if (point.x !== newPoint.x && point.y !== newPoint.y) {
    return sandFall(filled, point, maxDepth);
  }

  return point;
};

const day1 = function answer(input: string) {
  const map = inputToFilled(input);
  const ORIGIN = { x: 500, y: 0 };

  const abyss = getLowest(map);
  let sandCount = 0;
  let falling = true;

  // while (falling) {
  for (let _i = 0; _i < 25; _i++) {
    const sand = ORIGIN;
    const newSand = sandFall(map, sand, abyss);
    if (newSand.y >= abyss) {
      falling = false;
    } else {
      map.add(`{"x":${newSand.x},"y":${newSand.y}}`);
      sandCount += 1;
    }
  }

  return sandCount;
};

const day2 = function answer(input: string) {
  // const lines = splitLines(input)
  //   .map((line) => toCoords(line))
  //   .map((points) => pointsToLines(points));
  // const map = linesToMap(lines);

  // const sandSource = { x: 500, y: 0 };
  // let sandAmount = 0;
  // let falling = true;
  // const abyss = getAbyss(map);

  // while (falling) {
  //   const sand = sandSource;
  //   const newSand = sandFall(map, sand, 0, abyss);
  //   if (newSand.x === 500 && newSand.y === 0) {
  //     falling = false;
  //   }
  //   addPoint(map, newSand);
  //   sandAmount += 1;
  // }

  // return sandAmount;
};

export { day1, day2 };
