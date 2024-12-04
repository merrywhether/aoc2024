// { safeLines: 660, dampenedSafeLines: 689 }

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  return text.split("\n").reduce((agg, line) => {
    if (line.match(/^\d/)) {
      const levels = line.split(/\s+/).map(Number);
      const direction = levels[1] - levels[0] > 0 ? 1 : -1;

      const isSafe = levels.every((level, i) => {
        if (i === levels.length - 1) {
          return true;
        }

        const difference = levels[i + 1] - level;
        return difference * direction >= 1 && difference * direction <= 3;
      });

      if (isSafe) {
        agg.safeLines++;
        agg.dampenedSafeLines++;
        return agg;
      }

      const isSafeWithDampening = levels.some((_level, i) => {
        const test = Array.from(levels);
        test.splice(i, 1);
        const direction = test[1] - test[0] > 0 ? 1 : -1;

        return test.every((level, i) => {
          if (i === test.length - 1) {
            return true;
          }

          const difference = test[i + 1] - level;
          return difference * direction >= 1 &&
            difference * direction <= 3;
        });
      });

      if (isSafeWithDampening) {
        agg.dampenedSafeLines++;
        return agg;
      }
    }

    return agg;
  }, { safeLines: 0, dampenedSafeLines: 0 });
}

if (import.meta.main) {
  console.log(await main());
}
