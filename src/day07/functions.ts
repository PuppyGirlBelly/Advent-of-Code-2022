const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const isSmallEnough = function fitsAnswerCriteria(input: number): boolean {
  return input < 100000;
};

const isNumber = function checkIfNumber(input: string): boolean {
  return !Number.isNaN(Number(input));
};

const hasKey = function isKeyOfObject<T>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
};

/*
 * Okay so a big admission, this answer is mostly copied from u/betarevos'
 * answer to Day 7;
 *     https://www.reddit.com/r/adventofcode/comments/zesk40/comment/iz8c7ne/
 *     https://github.com/betaveros/advent-of-code-2022/blob/main/p7.noul
 *
 * I am currently suffering from some intense covid and spent many hours trying
 * to implement a solution before giving up so that I can move on. And I figure
 * that implementing a solution from another language (with a lot of syntactic
 * sugar) is still more effortful than a copied solution.
 */

const parentDirs = function createArrayOfParents(dirs: string[]): string[][] {
  const prefix: string[] = [];
  const parents: string[][] = [];

  dirs.forEach((obj: string) => {
    prefix.push(obj);
    parents.push([...prefix]);
  });

  return parents;
};

const getDirs = function createDirectories(input: string): {
  [index: string]: number;
} {
  const lines = splitLines(input);
  let pwd: string[] = [];
  const dirs: { [index: string]: number } = {};

  lines.forEach((l: string) => {
    const line = l.split(/\s/);
    if (line.includes("cd") && line.includes("/")) {
      pwd = ["/"];
    } else if (line.includes("cd") && line.includes("..")) {
      pwd.pop();
    } else if (line.includes("cd")) {
      pwd.push(`${line[line.length - 1]}/`);
    } else if (isNumber(line[0])) {
      parentDirs(pwd).forEach((parents: string[]) => {
        const d = parents.join("");
        if (!hasKey(d, dirs)) dirs[d] = 0;
        dirs[d] += Number(line[0]);
      });
    }
  });

  return dirs;
};

const day1 = function answer(input: string) {
  const dirs = getDirs(input);

  const total = Object.values(dirs)
    .filter((dir: number) => isSmallEnough(dir))
    .reduce((sum: number, val: number) => sum + val, 0);

  return total;
};

const day2 = function answer(input: string) {
  const dirs = getDirs(input);
  const root: number = dirs["/"] || 0;

  const FS_SIZE = 70000000;
  const UPDATE_SIZE = 30000000;
  const target = UPDATE_SIZE - (FS_SIZE - root);

  const filtered = Object.values(dirs).filter((size: number) => size > target);
  const smallest = Math.min(...filtered);

  return smallest;
};

export { day1, day2 };
