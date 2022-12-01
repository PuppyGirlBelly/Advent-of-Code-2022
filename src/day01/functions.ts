const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

/*
 * Takes a string and splits lines together by two empty lines. Each group
 * of lines is separated into it's own array of strings. Returning an array
 * of array of strings.
 */
const groupLines = function groupLinesByEmptyLines(input: string): string[][] {
  return input.split(/[\r\n]{2}/).map((values) => splitLines(values));
};

const toNumArray = function stringArrayToNumArray(input: string[]): number[] {
  return input.map(Number);
};

const sumArray = function sumUpNumberArray(input: number[]): number {
  return input.reduce((acc, num) => acc + num, 0);
};

const stringToSums = function convertStringToArrayOfSums(
  input: string,
): number[] {
  const values: string[][] = groupLines(input);
  const numValues: number[][] = values.map((v) => toNumArray(v));
  const sums: number[] = numValues.map((v) => sumArray(v));

  return sums;
};

const getHighest = function getHighestNumberInArray(
  numbers: number[],
  range: number,
) {
  return sumArray(numbers.sort((a, b) => b - a).slice(0, range));
};

const answer = function getHighestValuesInString(
  input: string,
  range = 1,
): string {
  const summedInput = stringToSums(input);
  const highest = getHighest(summedInput, range);
  return highest.toString();
};

export default answer;
