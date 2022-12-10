const TAIL_POSITIONS = new Set();

interface Coords {
  x: number;
  y: number;
}

const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const reduce = function reduceToPositiveOrNegative(i: number): number {
  if (i >= 1) return 1;
  if (i <= -1) return -1;
  return 0;
};

const moveTail = function moveTail(head: Coords, tail: Coords): Coords {
  const newTail = tail;
  const diffX = head.x - tail.x;
  const diffY = head.y - tail.y;

  if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
    newTail.x += reduce(diffX);
    newTail.y += reduce(diffY);
  }

  return newTail;
};

const parseTwoKnots = function parseMove(
  input: string,
  head: Coords,
  tail: Coords,
): Coords[] {
  const direction = input.split(/\s/)[0];
  const steps = Number(input.split(/\s/)[1]);
  const newHead = head;
  let newTail = tail;

  for (let i = 0; i < Number(steps); i += 1) {
    switch (direction) {
      case "U":
        newHead.y += 1;
        break;
      case "D":
        newHead.y -= 1;
        break;
      case "R":
        newHead.x += 1;
        break;
      case "L":
        newHead.x -= 1;
        break;
      default:
        break;
    }
    newTail = moveTail(newHead, tail);
    TAIL_POSITIONS.add(`(${newTail.x},${newTail.y})`);
  }

  return [newHead, newTail];
};

const parseTenKnots = function parseMove(
  input: string,
  head: Coords,
  tails: Coords[],
): [Coords, Coords[]] {
  const direction = input.split(/\s/)[0];
  const steps = Number(input.split(/\s/)[1]);
  const newHead = head;
  const newTails = [...tails];

  for (let i = 0; i < Number(steps); i += 1) {
    switch (direction) {
      case "U":
        newHead.y += 1;
        break;
      case "D":
        newHead.y -= 1;
        break;
      case "R":
        newHead.x += 1;
        break;
      case "L":
        newHead.x -= 1;
        break;
      default:
        break;
    }

    let prevKnot = newHead;
    tails.forEach((tail, index) => {
      const knot = moveTail(prevKnot, tail);
      newTails[index] = knot;
      prevKnot = knot;
    });
    TAIL_POSITIONS.add(`(${prevKnot.x},${prevKnot.y})`);
  }

  return [newHead, newTails];
};

const day1 = function answer(input: string) {
  const lines = splitLines(input);
  TAIL_POSITIONS.clear();
  let head: Coords = { x: 0, y: 0 };
  let tail: Coords = { x: 0, y: 0 };

  lines.forEach((line) => {
    [head, tail] = parseTwoKnots(line, head, tail);
  });

  return TAIL_POSITIONS.size;
};

const day2 = function answer(input: string) {
  const lines = splitLines(input);
  TAIL_POSITIONS.clear();
  let head: Coords = { x: 0, y: 0 };
  let tails: Coords[] = Array.from({ length: 9 }, () => ({ x: 0, y: 0 }));

  lines.forEach((line) => {
    [head, tails] = parseTenKnots(line, head, tails);
  });

  console.log(tails);

  return TAIL_POSITIONS.size;
};

export { day1, day2 };
