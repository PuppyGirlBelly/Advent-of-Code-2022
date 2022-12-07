import run from "aocrunner";
import { day1, day2 } from "./functions.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  day1(input);
  return "";
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  day2(input);
  return "";
};

run({
  part1: {
    tests: [
      {
        input: ``,
        expected: "",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
