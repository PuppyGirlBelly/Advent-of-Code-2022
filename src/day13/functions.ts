const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const splitEmptyLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]{2}/);
};

const filterEmptyLines = function removeEmptyLines(input: string): string {
  return input.replace(/[\r\n]{2}/g, "\n");
};

const getLeftAndRight = function parseListsIntoLeftAndRight(input: string) {
  const [left, right] = splitLines(input);
  return { left: JSON.parse(left), right: JSON.parse(right) };
};

const isSame = function checkIfIdentical(
  left: number | number[],
  right: number | number[],
): boolean {
  if (typeof left === "number" && typeof right === "number") {
    return left === right;
  }

  if (typeof left === "object" && typeof right === "object") {
    if (left.length !== right.length) return false;
    for (let i = 0; i < left.length; i += 1) {
      const l = left[i];
      const r = right[i];

      if (l !== r) return false;
    }
    return true;
  }

  return false;
};

const getFirst = function getFirstInteger(input: number | number[]) {
  if (typeof input === "number") return input;

  if (typeof input === "object") {
    return getFirst(input[0]);
  }

  return null;
};

const compare = function compareLeftAndRight(
  left: number[] | number,
  right: number[] | number,
): boolean {
  if (typeof left === "number" && typeof right === "number") {
    return left < right;
  }

  if (typeof left === "object" && typeof right === "object") {
    for (let i = 0; i < left.length; i += 1) {
      const l = left[i];
      const r = right[i];

      if (!isSame(l, r)) {
        if (r === undefined) return false;
        return compare(l, r);
      }
    }
    return true;
  }

  if (typeof left === "number" && typeof right === "object") {
    return compare([left], right);
  }
  if (typeof left === "object" && typeof right === "number") {
    return compare(left, [right]);
  }

  return false;
};

const day1 = function answer(input: string) {
  const pairs = splitEmptyLines(input).map((str) => getLeftAndRight(str));
  const indexes: number[] = [];
  pairs.forEach(({ left, right }, i) => {
    if (compare(left, right)) indexes.push(i + 1);
  });
  return indexes.reduce((acc, val) => {
    return acc + val;
  }, 0);
};

const day2 = function answer(input: string) {
  const str = filterEmptyLines(input);
  const lines = splitLines(str).map((line) => JSON.parse(line));
  lines.splice(0, 0, [[2]]);
  lines.splice(0, 0, [[6]]);
  lines.sort((a, b) => getFirst(a) - getFirst(b));

  const array = lines.map((line) => JSON.stringify(line));

  const div1 = array.indexOf("[[2]]") + 1;
  const div2 = array.indexOf("[[6]]") + 1;

  return div1 * div2;
};

export { day1, day2 };
