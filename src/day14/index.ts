import run from "aocrunner";
import { day1, day2 } from "./functions.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return day1(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return day2(input);
};

run({
  part1: {
    tests: [
      {
        input: `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
// 498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9
// `,
      //   expected: 93,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
