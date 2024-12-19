type Map = string[][];
type Position = [x: number, y: number];
type Move = "<" | "^" | ">" | "v";

const moveMap = {
  "<": [-1, 0],
  "^": [0, -1],
  ">": [1, 0],
  "v": [0, 1],
};

function getNextPosition(current: Position, move: Move): Position {
  const [dx, dy] = moveMap[move];
  return [current[0] + dx, current[1] + dy];
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { map, moves, start } = text.split("\n").reduce((agg, line, idx) => {
    if (line.match(/^[#.O@]+$/)) {
      const row = line.split("");
      const start = row.findIndex((cell) => cell === "@");
      if (start !== -1) {
        agg.start = [start, idx];
        row[start] = ".";
      }
      agg.map.push(row);
    } else if (line.match(/^[<^>v]+$/)) {
      agg.moves.push(...(line.split("") as Move[]));
    }

    return agg;
  }, { map: [] as Map, moves: [] as Move[], start: [0, 0] as Position });

  let current = start;
  moves.forEach((move) => {
    const next = getNextPosition(current, move);

    switch (map[next[1]]?.[next[0]]) {
      case "#":
        return;
      case ".":
        current = next;
        return;
      case "O": {
        let nextInDirection = getNextPosition(next, move);
        while (map[nextInDirection[1]]?.[nextInDirection[0]]) {
          if (map[nextInDirection[1]][nextInDirection[0]] === "#") {
            break;
          }
          if (map[nextInDirection[1]][nextInDirection[0]] === "O") {
            nextInDirection = getNextPosition(nextInDirection, move);
            continue;
          }
          if (map[nextInDirection[1]][nextInDirection[0]] === ".") {
            map[nextInDirection[1]][nextInDirection[0]] = "O";
            map[next[1]][next[0]] = ".";
            current = next;
            return;
          }
        }
      }
    }
  });

  const gpsSum = map.reduce((agg, row, y) => {
    return agg + row.reduce((agg2, cell, x) => {
      if (cell === "O") {
        agg2 += y * 100 + x;
      }
      return agg2;
    }, 0);
  }, 0);

  return { gpsSum };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
