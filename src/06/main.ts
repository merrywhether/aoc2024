// { positionCount: 5312, loopCount: 1748 }

type Direction = "y" | "-y" | "x" | "-x";

const rotateRight: Record<Direction, Direction> = {
  "-y": "x",
  "x": "y",
  "y": "-x",
  "-x": "-y",
};

type Position = [y: number, x: number, next: Direction];

type Map = string[][];

function getNextPosition(p: Position): Position {
  switch (p[2]) {
    case "y":
      return [p[0] + 1, p[1], p[2]];
    case "-y":
      return [p[0] - 1, p[1], p[2]];
    case "x":
      return [p[0], p[1] + 1, p[2]];
    case "-x":
      return [p[0], p[1] - 1, p[2]];
  }
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { map, start } = text.split("\n").reduce<
    { map: Map; start: Position }
  >(
    (agg, line, idx) => {
      if (line.match(/^[.#^]+$/)) {
        const chars = line.split("");
        const startX = chars.findIndex((char) => char === "^");
        if (startX !== -1) {
          chars[startX] = ".";
          agg.start = [idx, startX, "-y"];
        }
        agg.map.push(chars);
      }
      return agg;
    },
    { map: [], start: [0, 0, "y"] },
  );

  let guard = start;
  let positionCount = 0;
  const positionHistory = [];

  while (
    guard[0] >= 0 &&
    guard[0] < map.length && guard[1] >= 0 && guard[1] < map[0].length
  ) {
    let next = getNextPosition(guard);
    while (map[next[0]]?.[next[1]] === "#") {
      guard[2] = rotateRight[guard[2]];
      next = getNextPosition(guard);
    }

    if (map[guard[0]][guard[1]] === ".") {
      map[guard[0]][guard[1]] = "X";
      positionCount++;
    }
    positionHistory.push(guard);
    guard = next;
  }

  const loopCount = positionHistory.reduce((agg, position) => {
    const obstruction = getNextPosition(position);
    if (
      obstruction[0] < 0 ||
      obstruction[0] >= map.length || obstruction[1] < 0 ||
      obstruction[1] >= map[0].length ||
      map[obstruction[0]][obstruction[1]] === "O"
    ) {
      return agg;
    }

    const collisionSet = new Set<string>();
    let guard: Position = [...start];
    let guardKey = "";

    while (
      guard[0] >= 0 &&
      guard[0] < map.length && guard[1] >= 0 && guard[1] < map[0].length
    ) {
      let next = getNextPosition(guard);
      while (
        map[next[0]]?.[next[1]] === "#" ||
        next[0] === obstruction[0] && next[1] === obstruction[1]
      ) {
        guardKey = guard.toString();
        if (
          collisionSet.has(guardKey)
        ) {
          map[obstruction[0]][obstruction[1]] = "O";
          return agg + 1;
        }
        collisionSet.add(guardKey);
        guard[2] = rotateRight[guard[2]];
        next = getNextPosition(guard);
      }
      guard = next;
    }
    return agg;
  }, 0);

  return { positionCount, loopCount };
}

if (import.meta.main) {
  console.log(await main());
}
