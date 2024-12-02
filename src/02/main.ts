// { safe: 660, dampSafe: 689 }

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
        agg.safe++;
        agg.dampSafe++;
        return agg;
      }

      const isDampSafe = levels.some((_level, i) => {
        const test = Array.from(levels);
        test.splice(i, 1);
        const dampDirection = test[1] - test[0] > 0 ? 1 : -1;

        return test.every((level, i) => {
          if (i === test.length - 1) {
            return true;
          }

          const difference = test[i + 1] - level;
          return difference * dampDirection >= 1 &&
            difference * dampDirection <= 3;
        });
      });

      if (isDampSafe) {
        agg.dampSafe++;
        return agg;
      }

      console.log(line);
    }

    console.log("---");

    return agg;
  }, { safe: 0, dampSafe: 0 });
}

if (import.meta.main) {
  console.log(await main());
}
