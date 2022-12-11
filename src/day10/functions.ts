/* eslint-disable no-console */
/* eslint-disable consistent-return */
import * as fs from "node:fs";

interface Instruction {
  cycles: number;
  op: string;
  val: number;
}

const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const parse = function stringToInstruction(input: string): Instruction {
  const ins = input.split(/\s/);
  if (ins[0] === "noop") {
    return { cycles: 1, op: "noop", val: 0 };
  }
  return { cycles: 2, op: "addx", val: Number(ins[1]) };
};

const strength = function getSignalStrength(
  regX: number,
  cycle: number,
): number {
  return regX * cycle;
};

const write = function writeStringToFile(output: string) {
  fs.writeFile("./answer.md", output, (err) => {
    if (err) return console.log(err);
    console.log(`File written to answer.md`);
  });
};

const day1 = function answer(input: string) {
  const lines = splitLines(input);
  const checkCycles = [20, 60, 100, 140, 180, 220];

  let regX = 1;
  let cycle = 1;
  const signalStrengths: number[] = [];

  lines.forEach((line) => {
    const instruction = parse(line);

    for (let c = 0; c < instruction.cycles; c += 1) {
      if (checkCycles.includes(cycle)) {
        const value = strength(regX, cycle);
        signalStrengths.push(value);
        checkCycles.shift();
      }

      cycle += 1;

      if (instruction.op === "addx" && c === 1) {
        regX += instruction.val;
      }
    }
  });

  return signalStrengths.reduce((sum, val) => sum + val, 0);
};

const day2 = function answer(input: string) {
  const lines = splitLines(input);

  let regX = 1;
  let cycle = 0;
  const screen: string[] = [];

  lines.forEach((line) => {
    const instruction = parse(line);

    for (let c = 0; c < instruction.cycles; c += 1) {
      const sprite = [regX - 1, regX, regX + 1];
      const xPos = cycle % 40;

      if (sprite.includes(xPos)) {
        screen.push("#");
      } else {
        screen.push(" ");
      }

      cycle += 1;

      if (instruction.op === "addx" && c === 1) {
        regX += instruction.val;
      }
    }
  });

  write(
    screen
      .map((v, i) => {
        if (i % 40 === 0) {
          return `\n${v}`;
        }
        return v;
      })
      .join(""),
  );
};

export { day1, day2 };
