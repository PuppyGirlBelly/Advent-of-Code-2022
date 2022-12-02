const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const LOSE = 0;
const TIE = 3;
const WIN = 6;

const WIN_VALUES: { [key: string]: number } = {
  "A X": ROCK + TIE,
  "A Y": PAPER + WIN,
  "A Z": SCISSORS + LOSE,
  "B X": ROCK + LOSE,
  "B Y": PAPER + TIE,
  "B Z": SCISSORS + WIN,
  "C X": ROCK + WIN,
  "C Y": PAPER + LOSE,
  "C Z": SCISSORS + TIE,
};

const OUTCOMES: { [key: string]: number } = {
  "A X": SCISSORS + LOSE,
  "A Y": ROCK + TIE,
  "A Z": PAPER + WIN,
  "B X": ROCK + LOSE,
  "B Y": PAPER + TIE,
  "B Z": SCISSORS + WIN,
  "C X": PAPER + LOSE,
  "C Y": SCISSORS + TIE,
  "C Z": ROCK + WIN,
};

interface Calculator {
  (input: string): number;
}

const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const calcMove = function calculateScore(input: string): number {
  return WIN_VALUES[input];
};

const decode = function decodeOutcomeAndCalculateScore(input: string) {
  return OUTCOMES[input];
};

// const modulo = function modulo(i: number, d: number): number {
//   return ((i % d) + d) % d;
// };

// const calcMove = function calculatePlayerVsElf(input: string) {
//   const elf = input.charCodeAt(0) - 64;
//   const player = input.charCodeAt(2) - 87;

//   const outcome = modulo(player + 4 - elf, 3) * 3;

//   return player + outcome;
// };

// const decode = function decodeMoveAndCalcScore(input: string) {
//   const elf = input.charCodeAt(0) - 64;
//   const outcome = input.charCodeAt(2) - 88;

//   const player = modulo(outcome + elf + 2, 3);

//   return player + outcome * 3;
// };

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

const day2p1 = function answer(input: string): number {
  const lines = splitLines(input);
  return calcTotal(lines, calcMove);
};

const day2p2 = function answer(input: string): number {
  const lines = splitLines(input);
  return calcTotal(lines, decode);
};

export { day2p1, day2p2 };
