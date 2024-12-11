// {
//   stoneCount6: 68,
//   stoneCount25: 183435,
//   stoneCount75: 218279375708592
// }
// Elapsed: 67ms

type StonesInBlink = Record<number, number>;

const cache: Record<number | string, number[]> = {
  0: [1],
};

function blinkAway(stones: number[], blinks: number): number {
  let currentStones = stones.reduce((agg, stone) => {
    agg[stone] = (agg[stone] ?? 0) + 1;
    return agg;
  }, {} as StonesInBlink);
  let nextStones: StonesInBlink = {};

  while (blinks > 0) {
    Object.entries(currentStones)
      .forEach(([stone, count]) => {
        const cached = cache[stone];
        if (cached) {
          cached.forEach((c) => {
            nextStones[c] = (nextStones[c] ?? 0) + count;
          });
          return;
        }

        const stoneNum = Number(stone);
        const log10 = Math.floor(Math.log10(stoneNum));
        if (log10 % 2 !== 0) {
          const factor = Math.pow(10, Math.ceil(log10 / 2));
          const float = stoneNum / factor;
          const left = Math.floor(float);
          const right = Math.round((float - left) * factor);
          nextStones[left] = (nextStones[left] ?? 0) + count;
          nextStones[right] = (nextStones[right] ?? 0) + count;
          cache[stone] = [left, right];
          return;
        }

        const multiplied = stoneNum * 2024;
        nextStones[multiplied] = (nextStones[multiplied] ?? 0) + count;
        cache[stone] = [multiplied];
      });

    currentStones = nextStones;
    nextStones = {};
    blinks -= 1;
  }

  return Object.values(currentStones).reduce((agg, count) => agg + count);
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const stones = text.trim().split(" ").map(Number);

  return {
    stoneCount6: blinkAway(stones, 6),
    stoneCount25: blinkAway(stones, 25),
    stoneCount75: blinkAway(stones, 75),
  };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
