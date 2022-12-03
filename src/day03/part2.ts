const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

// UNIQUE SOLUTION STARTS HERE

const findMatch = function findMatchingCharInTwoStrings(
  a: string,
  b: string,
  c: string,
): string {
  const match = a
    .split("")
    .filter((char) => b.includes(char) && c.includes(char));

  return match[0];
};

const priorityOf = function calculatePriority(c: string): number {
  const offset = c === c.toLowerCase() ? 96 : 38;
  return c.charCodeAt(0) - offset;
};

const solve = function getItemAndPriority(...line: string[]): number {
  const match = findMatch(line[0], line[1], line[2]);
  return priorityOf(match);
};

const calcTotal = function calculateScores(input: string[]): number {
  let total = 0;

  for (let index = 0; index < input.length; index += 3) {
    total += solve(input[index], input[index + 1], input[index + 2]);
  }

  return total;
};

const solution = function answer(input: string): number {
  const lines = splitLines(input);
  return calcTotal(lines);
};

export default solution;
