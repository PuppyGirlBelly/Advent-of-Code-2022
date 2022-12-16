/* eslint-disable no-restricted-syntax */
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

const horizontalRange = function getSensorsRangeByRow(
  s: Sensor,
  row: number,
): Range {
  const distance = Math.abs(s.y - row);
  if (distance > s.range) {
    return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
  }

  const halfWidth = s.range - distance;
  const x1 = s.x - halfWidth;
  const x2 = s.x + halfWidth;

  return { start: { x: x1, y: row }, end: { x: x2, y: row } };
};

const notInSensor = function checkIfPointIsInsideAnySensor(
  x: number,
  y: number,
  sensors: Sensor[],
): boolean {
  let isOutside = true;

  for (let i = 0; i < sensors.length; i += 1) {
    const s = sensors[i];
    const distance = getDistance(s.x, s.y, x, y);

    if (distance <= s.range) {
      isOutside = false;
    }
  }

  return isOutside;
};

const day1 = function answer(input: string) {
  const sensors = splitLines(input).map((line) => toSensor(line));
  const checkLine = 2000000;
  let lowest = Number.POSITIVE_INFINITY;
  let highest = Number.NEGATIVE_INFINITY;

  sensors.forEach((s) => {
    const range = horizontalRange(s, checkLine);
    if (range.start.x !== 0 && range.end.x !== 0) {
      lowest = range.start.x < lowest ? range.start.x : lowest;
      highest = range.end.x > highest ? range.end.x : highest;
    }
  });

  return highest - lowest;
};

/* I'll admit it, I got stumped. I couldn't figure out today's Part 2 so I
 * ended up using another person's work as basis for my own...
 * https://www.reddit.com/r/adventofcode/comments/zmcn64/comment/j0af7mb/?utm_source=share&utm_medium=web2x&context=3
 * https://gist.github.com/bluepichu/1e967aa8322bd2e4fd3913aefcbeaa9b
 */
const day2 = function answer(input: string) {
  const sensors = splitLines(input).map((line) => toSensor(line));
  const limit = 4000000;

  for (let i = 0; i < sensors.length; i += 1) {
    const sensor = sensors[i];
    for (let xMod = -1; xMod <= 1; xMod += 1) {
      for (let yMod = -1; yMod <= 1; yMod += 1) {
        for (let permX = 0; permX <= sensor.range + 1; permX += 1) {
          const permY = sensor.range + 1 - permX;
          const x = sensor.x + permX * xMod;
          if (x >= 0 && x <= limit) {
            const y = sensor.y + permY * yMod;
            if (y >= 0 && y <= limit) {
              if (notInSensor(x, y, sensors)) {
                // console.log(`${x}, ${y}`);
                return x * 4000000 + y;
              }
            }
          }
        }
      }
    }
  }
};

export { day1, day2 };
