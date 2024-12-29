type Schematic = [number, number, number, number, number];

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const lockPatterns = text.matchAll(/#####\n((?:[.#]{5}\n){5})\.\.\.\.\./g);
  const keyPatterns = text.matchAll(/\.\.\.\.\.\n((?:[.#]{5}\n){5})#####/g);

  const locks = lockPatterns.reduce((agg, [, lockPattern]) => {
    const lock: Schematic = [0, 0, 0, 0, 0];
    lockPattern.split("\n").forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === "#") {
          lock[x]++;
        }
      });
    });
    agg.push(lock);
    return agg;
  }, [] as Schematic[]);

  const keys = keyPatterns.reduce((agg, [, keyPattern]) => {
    const key: Schematic = [0, 0, 0, 0, 0];
    keyPattern.split("\n").forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === "#") {
          key[x]++;
        }
      });
    });
    agg.push(key);
    return agg;
  }, [] as Schematic[]);

  const possiblePairs = locks.reduce((agg, lock) => {
    keys.forEach((key) => {
      if (lock.every((lockHeight, i) => lockHeight + key[i] <= 5)) {
        agg++;
      }
    });
    return agg;
  }, 0);

  return { possiblePairs };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
