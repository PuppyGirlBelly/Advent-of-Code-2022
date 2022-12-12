const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const splitEmptyLines = function splitStringByEmptyLines(
  input: string,
): string[] {
  return input.split(/[\r\n]{2}/);
};

interface Monkey {
  items: number[];
  opOperand: string;
  opNum: number | string;
  divisible: number;
  ifTrue: number;
  ifFalse: number;
}

const parseMonkey = function parseStringToMonkey(input: string): Monkey {
  const lines = splitLines(input);
  lines.shift();
  const items: number[] =
    lines
      .shift()
      ?.replace("Starting items: ", "")
      .split(", ")
      .map((n: string) => Number(n)) || [];
  const opOperand = lines[0].charAt(23);
  let opNum = Number(lines.shift()?.split(/\s/).pop());
  const divisible = Number(lines.shift()?.split(/\s/).pop());
  const ifTrue = Number(lines.shift()?.split(/\s/).pop());
  const ifFalse = Number(lines.shift()?.split(/\s/).pop());

  return {
    items,
    opOperand,
    opNum,
    divisible,
    ifTrue,
    ifFalse,
  };
};

const inspect = function monkeyInspectsItems(monkey: Monkey): number[] {
  const items: number[] = [...monkey.items];

  return newItems;
};

const getMonkeys = function stringToMonkeys(input: string): Monkey[] {
  const monkeyStrings = splitEmptyLines(input);
  return monkeyStrings.map((str) => parseMonkey(str));
};

const day1 = function answer(input: string) {
  const monkeys = getMonkeys(input);
  const business: number[] = Array(monkeys.length).fill(0);

  for (let _i = 0; _i < 20; _i += 1) {
    monkeys.forEach((monkey, index) => {
      if (monkey.items.length !== 0) {
        do {
          const item = monkey.items.shift() ?? 0;
          business[index] += 1;
          let newItem = 0;
          if (Number.isNaN(monkey.opNum)) {
            // eslint-disable-next-line no-eval
            newItem = eval(`${item} ${monkey.opOperand} ${item}`);
          } else {
            // eslint-disable-next-line no-eval
            newItem = eval(`${item} ${monkey.opOperand} ${monkey.opNum}`);
          }

          newItem = Math.floor(newItem / 3);

          if (newItem % monkey.divisible === 0) {
            monkeys[monkey.ifTrue].items.push(newItem);
          } else {
            monkeys[monkey.ifFalse].items.push(newItem);
          }
        } while (monkey.items.length !== 0);
      }
    });
  }

  return business
    .sort((a, b) => {
      return a - b;
    })
    .slice(-2)
    .reduce((acc, val) => acc * val, 1);
};

const day2 = function answer(input: string) {
  const monkeys = getMonkeys(input);
  const business: number[] = Array(monkeys.length).fill(0);
  const lcm = monkeys.reduce((acc, m) => acc *= m.divisible, 1);

  for (let _i = 0; _i < 10000; _i += 1) {
    monkeys.forEach((monkey, index) => {
      if (monkey.items.length !== 0) {
        do {
          const item = monkey.items.shift() ?? 0;
          business[index] += 1;
          let newItem = 0;
          if (Number.isNaN(monkey.opNum)) {
            // eslint-disable-next-line no-eval
            newItem = eval(`${item} ${monkey.opOperand} ${item}`);
          } else {
            // eslint-disable-next-line no-eval
            newItem = eval(`${item} ${monkey.opOperand} ${monkey.opNum}`);
          }

          newItem %= lcm;

          if (newItem % monkey.divisible === 0) {
            monkeys[monkey.ifTrue].items.push(newItem);
          } else {
            monkeys[monkey.ifFalse].items.push(newItem);
          }
        } while (monkey.items.length !== 0);
      }
    });
  }

  return business
    .sort((a, b) => {
      return a - b;
    })
    .slice(-2)
    .reduce((acc, val) => acc * val, 1);
};

export { day1, day2 };
