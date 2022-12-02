import run from "aocrunner";
import { day2p1, day2p2 } from "../day02/functions.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return day2p1(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return day2p2(input);
};

run({
  part1: {
    tests: [
      {
        input: `
A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
