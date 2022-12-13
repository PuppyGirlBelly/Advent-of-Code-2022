const splitLines = function splitStringByLines(input: string): string[] {
  return input.split(/[\r\n]/);
};

const splitTo2D = function splitStringTo2DArray(input: string): number[][] {
  return splitLines(input).map((line) =>
    line.split("").map((c) => c.charCodeAt(0)),
  );
};

interface Coordinates {
  x: number;
  y: number;
}

const find = function findCoordinates(
  grid: number[][],
  value: number,
): Coordinates {
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      if (grid[y][x] === value) return { x, y };
    }
  }
  return { x: -1, y: -1 };
};

const findAll = function findCoordinates(
  grid: number[][],
  value: number,
): Coordinates[] {
  const coords = [];
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      if (grid[y][x] === value) coords.push({ x, y })
    }
  }
  return coords;
};

const cloneEmpty = function clone2dArray<T>(array: T[][]): boolean[][] {
  return array.map((sub) => {
    return sub.map((_) => false);
  });
};

const bfs = function breadthFirstSearch(
  grid: number[][],
  start: Coordinates,
  end: Coordinates,
): number {
  const width = grid[0].length;
  const height = grid.length;
  const visited = cloneEmpty(grid);
  const queue = [];

  queue.push([start, 0]);
  visited[start.y][start.x] = true;

  while (queue.length > 0) {
    const [node, length] = queue.shift() ?? { x: 0, y: 0 };
    const nodeHeight = grid[node.y][node.x];
    if (node.x === end.x && node.y === end.y) return length;
    [
      [0, -1],
      [-1, 0],
      [0, 1],
      [1, 0],
    ].forEach(([dx, dy]) => {
      const nx = node.x + dx;
      const ny = node.y + dy;

      if (nx > -1 && nx <= width && ny > -1 && ny < height) {
        // console.log(`(${nx}, ${ny})`);
        const newNode = { x: nx, y: ny };
        const newNodeHeight = grid[ny][nx];
        // console.log(`node: ${node.x}, ${node.y} | end: ${end.x}, ${end.y}`);
        // console.log(`isTaller: ${grid[node.y][node.x] + 1 >= newNode} | visited: ${!visited[ny][nx]}`);
        if (nodeHeight + 1 >= newNodeHeight && !visited[ny][nx]) {
          visited[ny][nx] = true;
          queue.push([newNode, length + 1]);
        }
      }
    });
  }
  return 99999;
};

const day1 = function answer(input: string) {
  const map = splitTo2D(input);
  const start = find(map, "S".charCodeAt(0));
  const end = find(map, "E".charCodeAt(0));
  map[start.y][start.x] = "a".charCodeAt(0);
  map[end.y][end.x] = "z".charCodeAt(0);

  const length = bfs(map, start, end);

  return length;
};

const day2 = function answer(input: string) {
  const map = splitTo2D(input);
  const starts = findAll(map, "a".charCodeAt(0));
  const end = find(map, "E".charCodeAt(0));
  // map[start.y][start.x] = "a".charCodeAt(0);
  map[end.y][end.x] = "z".charCodeAt(0);

  let smallest = 99999;

  starts.forEach((s) => {
    const length = bfs(map, s, end);
    smallest = length < smallest ? length : smallest;
  });

  return smallest;
};

export { day1, day2 };
