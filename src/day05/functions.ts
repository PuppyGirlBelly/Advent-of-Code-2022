const divide = function divideInputIntoTwo(input: string): string[] {
  return input.split(/[\r\n]{2}/);
};

const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const stackUp = function stackGenerator(str: string): string[][] {
  const lines = splitLines(str);
  const stackNum = lines.pop()?.trim().split(/\s{3}/).length || 0;
  const stacks: string[][] = [...new Array(stackNum)].map(() => []);

  lines.reverse().forEach((line: string) => {
    for (let i = 0; i < stackNum; i += 1) {
      const pos = 1 + i * 4;
      if (line[pos] !== " " && line[pos]) stacks[i].push(line[pos]);
    }
  });

  return stacks;
};

interface Instruction {
  amount: number;
  start: number;
  end: number;
}

const parseMove = function stringToInstruction(input: string): Instruction {
  const arr: number[] = input
    .split(/move\s|\sfrom\s|\sto\s/)
    .filter((x) => x !== "")
    .map((x) => Number(x));
  return { amount: arr[0], start: arr[1], end: arr[2] };
};

const parseMoves = function splitStrToInstruction(
  input: string,
): Instruction[] {
  return splitLines(input).map((line) => parseMove(line));
};

const moveSingleCrate = function moveCrates(stack: string[][], move: Instruction): string[][] {
  const { amount, start, end } = move;
  const newStack = stack;
  for (let i = 0; i < amount; i += 1) {
    const crane = newStack[start - 1].splice(-1, 1);
    newStack[end - 1] = stack[end - 1].concat(crane);
  }
  return newStack;
};

const moveMultiCrates = function moveCrates(
  stack: string[][],
  move: Instruction,
): string[][] {
  const { amount, start, end } = move;
  const newStack = stack;
  const crane = newStack[start - 1].splice(-1 * amount, amount);
  newStack[end - 1] = stack[end - 1].concat(crane);
  return newStack;
};

interface BoxMover {
  (stacks: string[][], moves: Instruction): string[][];
}

const processCrates = function processInstructions(
  stacks: string[][],
  moves: Instruction[],
  callback: BoxMover,
) {
  let newStack = stacks;
  moves.forEach((move) => {
    newStack = callback(newStack, move);
  });
  return newStack;
};

const topCrates = function getLastLetterFromArrays(stacks: string[][]): string {
  let crates = "";

  stacks.forEach((stack: string[]) => {
    crates += stack.slice(-1);
  });

  return crates;
};

const part1 = function solution(input: string) {
  const [stackStr, moveStr] = divide(input);
  const stack = stackUp(stackStr);
  const moves = parseMoves(moveStr);
  const processedStack = processCrates(stack, moves, moveSingleCrate);

  return topCrates(processedStack);
};

const part2 = function solution(input: string) {
  const [stackStr, moveStr] = divide(input);
  const stack = stackUp(stackStr);
  const moves = parseMoves(moveStr);
  const processedStack = processCrates(stack, moves, moveMultiCrates);

  return topCrates(processedStack);
};

export { part1, part2 };
