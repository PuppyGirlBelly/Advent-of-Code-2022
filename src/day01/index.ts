import run from "aocrunner";
import answer from "./functions.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return answer(input, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return answer(input, 3);
};

run({
  part1: {
    tests: [
      {
        input: `1000
                2000
                3000

                4000

                5000
                6000

                7000
                8000
                9000

                10000`,
        expected: "24000",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
                2000
                3000

                4000

                5000
                6000

                7000
                8000
                9000

                10000`,
        expected: "45000",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
