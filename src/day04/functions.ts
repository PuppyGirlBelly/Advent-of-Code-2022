const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const toArray = function splitStringInto2dArray(input: string): number[][] {
  return input.split(",").map((str) => {
    return str.split("-").map((i) => {
      return Number(i);
    });
  });
};

const to2dArray = function turnInputTo2dArrays(input: string): number[][][] {
  return splitLines(input).map((line) => toArray(line));
};

const totalOverlap = function checkIfTwoRangesOverlapCompletely(
  input: number[][],
) {
  if (input[0][0] <= input[1][0] && input[0][1] >= input[1][1]) return true;
  if (input[0][0] >= input[1][0] && input[0][1] <= input[1][1]) return true;
  return false;
};

const anyOverlap = function checkIfTwoRangesOverlapCompletely(
  input: number[][],
) {
  if (input[0][0] >= input[1][0] && input[0][0] <= input[1][1]) return true;
  if (input[0][1] >= input[1][0] && input[0][1] <= input[1][1]) return true;
  if (input[1][0] >= input[0][0] && input[1][0] <= input[0][1]) return true;
  if (input[1][1] >= input[0][1] && input[1][1] <= input[0][1]) return true;
  return false;
};

const calcP1 = function return1IfOverlap(input: number[][]): number {
  return totalOverlap(input) ? 1 : 0;
};

const calcP2 = function return1IfOverlap(input: number[][]): number {
  return anyOverlap(input) ? 1 : 0;
};

const part1 = function part1Solution(input: string) {
  const lines = to2dArray(input);
  return lines.reduce((acc, val) => acc + calcP1(val), 0);
};

const part2 = function part1Solution(input: string) {
  const lines = to2dArray(input);
  return lines.reduce((acc, val) => acc + calcP2(val), 0);
};

export { part1, part2 };
