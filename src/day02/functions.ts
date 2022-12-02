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

const calcScore = function calculateScore(input: string): number {
  return WIN_VALUES[input];
};

const calcOutcome = function calcOutcome(input: string) {
  return OUTCOMES[input];
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

const day2p1 = function answer(input: string): number {
  const lines = splitLines(input);
  return calcTotal(lines, calcScore);
};

const day2p2 = function answer(input: string): number {
  const lines = splitLines(input);
  return calcTotal(lines, calcOutcome);
};

export { day2p1, day2p2 };
