interface Valve {
  id?: string;
  rate: number;
  tunnels: string[];
}

const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const toValve = function stringToValve(input: string): Valve {
  const id = input.substring(6, 8);
  const rate = Number(input.match(/\d+/));
  const tunnels = [...input.concat(",").matchAll(/\w\w,/g)].map((e) =>
    e.toString().replace(",", ""),
  );
  return { id, rate, tunnels };
};

const toCaves = function valvesIntoCaveObject(input: string) {
  const valves = splitLines(input).map((line) => toValve(line));
  const cave: Record<string, Valve> = {};
  valves.forEach((v) => {
    if (v.id) cave[v.id] = { rate: v.rate, tunnels: v.tunnels };
  });
  return cave;
};

const day1 = function answer(input: string) {
  const cave = toCaves(input);
  const visited: string[] = [];
  const MINUTES = 30;
  let flowRate = 0;

  Object.keys(cave).forEach((valve) => {
    visited
    console.log(cave[valve]);
  });

  return 0;
};

const day2 = function answer(input: string) {
  return input;
};

export { day1, day2 };
