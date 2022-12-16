interface Coordinates {
  x: number;
  y: number;
}

interface Sensor extends Coordinates {
  range: number;
}

interface Range {
  start: Coordinates;
  end: Coordinates;
}

const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const getDistance = function calcManhattanDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const toSensor = function stringToSensor(input: string): Sensor {
  const [x, y, beaconX, beaconY] = input
    .match(/-?\d+/g)
    ?.map((num) => Number(num)) ?? [0, 0, 0, 0];

  const range = getDistance(x, y, beaconX, beaconY);

  return { x, y, range };
};

const toBeacon = function stringToBeacon(input: string): Coordinates {
  const [_x, _y, beaconX, beaconY] = input
    .match(/-?\d+/g)
    ?.map((num) => Number(num)) ?? [0, 0, 0, 0];

  return { x: beaconX, y: beaconY };
};

const occupiedInRow = function occupiedSpacesSenorAndRow(
  s: Sensor,
  row: number,
): Range {
  const distance = Math.abs(s.y - row);
  if (distance > s.range) {
    return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, };
  }

  const halfWidth = s.range - distance;
  const x1 = s.x - halfWidth;
  const x2 = s.x + halfWidth;

  return { start: { x: x1, y: row }, end: { x: x2, y: row } };
};

const day1 = function answer(input: string) {
  const sensors = splitLines(input).map((line) => toSensor(line));
  const checkLine = 2000000;
  let lowest = Number.POSITIVE_INFINITY;
  let highest = Number.NEGATIVE_INFINITY;

  sensors.forEach((s) => {
    const range = occupiedInRow(s, checkLine);
    if (range.start.x !== 0 && range.end.x !== 0) {
      lowest = range.start.x < lowest ? range.start.x : lowest;
      highest = range.end.x > highest ? range.end.x : highest;
    }
  });

  return highest - lowest;
};

const day2 = function answer(input: string) {
  const sensors = splitLines(input).map((line) => toSensor(line));
  const max = 20;

  for (let row = 0; row <= max; row += 1) {
    const occupied = Array(max).fill("░");

    sensors.forEach((s) => {
      const range = occupiedInRow(s, row);
      if (range.start.x !== 0 && range.end.x !== 0) {
        // console.log(`start: ${start} | end: ${end}`);
        const size = range.end.x - range.start.x;
        const filled = Array(size).fill("█");
        occupied.splice(range.start.x, size, filled);
      }
    });
    console.log(`${row.toString().padStart(2)}: ${occupied.join("")}`);
  }

  return 0;
};

export { day1, day2 };
