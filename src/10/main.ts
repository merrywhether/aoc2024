// { trailheadScores: 789, trailheadRatings: 1735 }
// Elapsed: 5ms

type Position = [x: number, y: number];
type Id = number;
type Tile = {
  height: number;
  reachablePeaks: Id[];
  id: Id;
};
type TrailMap = Tile[][];

function getNeighbors([x, y]: Position): Position[] {
  return [
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
  ];
}

function descend(
  positions: Position[],
  nextHeight: number,
  trailMap: TrailMap,
) {
  if (nextHeight >= 0) {
    const nextPositions = positions.reduce((agg, position) => {
      const tile = trailMap[position[1]][position[0]];
      getNeighbors(position).forEach(([x, y]) => {
        const neighborTile = trailMap[y]?.[x];
        if (neighborTile && neighborTile.height === nextHeight) {
          agg[neighborTile.id] ??= [x, y];
          neighborTile.reachablePeaks.push(...tile.reachablePeaks);
        }
      });
      return agg;
    }, {} as Record<Id, Position>);
    descend(Object.values(nextPositions), nextHeight - 1, trailMap);
  }
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { trailMap, trailheads, peaks } = text.split("\n").reduce(
    (agg, line, idxY) => {
      if (line) {
        agg.trailMap.push(
          line.split("").map((char, idxX) => {
            const height = Number(char);
            if (height === 0) {
              agg.trailheads.push([idxX, idxY]);
            }
            if (height === 9) {
              agg.peaks.push([idxX, idxY]);
              return {
                height,
                reachablePeaks: [agg.nextTileId],
                id: agg.nextTileId++,
              };
            }
            return {
              height,
              reachablePeaks: [],
              id: agg.nextTileId++,
            };
          }),
        );
      }
      return agg;
    },
    {
      trailMap: [] as TrailMap,
      trailheads: [] as Position[],
      peaks: [] as Position[],
      nextTileId: 0,
    },
  );

  descend(peaks, 8, trailMap);

  return {
    trailheadScores: trailheads.reduce(
      (agg, [x, y]) => agg + new Set(trailMap[y][x].reachablePeaks).size,
      0,
    ),
    trailheadRatings: trailheads.reduce(
      (agg, [x, y]) => agg + trailMap[y][x].reachablePeaks.length,
      0,
    ),
  };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
