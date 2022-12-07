const isAllUnique = function allCharactersInStringAreUnique(
  input: string
): boolean {
  return new Set(input).size === input.length;
};

const findMarker = function findFourUniqueCharacters(
  input: string,
  subStrLen: number,
): number {
  for (let i = subStrLen; i < input.length; i += 1) {
    const subStr = input.slice(i - subStrLen, i);
    if (isAllUnique(subStr)) {
      return i;
    }
  }

  return 0;
};

const day1 = function answer(input: string) {
  return findMarker(input, 4);
};

const day2 = function answer(input: string) {
  return findMarker(input, 14);
};

export { day1, day2 };
