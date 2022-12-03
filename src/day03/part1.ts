interface Calculator {
  (input: string): number;
}

const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const calcTotal = function calculateScores(
  input: string[],
  callback: Calculator,
): number {
  let total = 0;

  input.forEach((line: string) => {
    total += callback(line);
  });

  return total;
};

// UNIQUE SOLUTION STARTS HERE

const bisect = function bisectStringInHalf(input: string): string[] {
  const half = input.length / 2;

  return [input.slice(0, half), input.slice(half)];
};

const findMatch = function findMatchingCharInTwoStrings(
  a: string,
  b: string,
): string {
  const match = a.split("").filter((c) => b.includes(c));

  return match[0];
};

const priorityOf = function calculatePriority(c: string): number {
  const offset = c === c.toLowerCase() ? 96 : 38;
  return c.charCodeAt(0) - offset;
};

const solve = function getItemAndPriority(input: string): number {
  const [a, b] = bisect(input);
  const match = findMatch(a, b);
  return priorityOf(match);
};

const solution = function answer(input: string): number {
  const lines = splitLines(input);
  return calcTotal(lines, solve);
};

export default solution;
