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

const day1 = function answer(input: string) {
  return input;
};

const day2 = function answer(input: string) {
  return input;
};

export { day1, day2 };
