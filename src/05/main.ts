// { legalUpdateMiddlePageSum: 5955, fixedUpdateMiddlePageSum: 4030 }

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  // precedence rules yield all the pages that must be updated before a given page
  // (and thus can't come after)
  const { precedenceRules, updates } = text.split("\n").reduce((agg, line) => {
    if (line.match(/^\d+\|\d+$/)) {
      const [preceder, follower] = line.split("|").map(Number);
      agg.precedenceRules[follower] ??= [];
      agg.precedenceRules[follower].push(preceder);
    } else if (line.match(/^[\d,]+$/)) {
      agg.updates.push(line.split(",").map(Number));
    }

    return agg;
  }, {
    precedenceRules: {} as Record<number, number[]>,
    updates: [] as number[][],
  });

  function testUpdate(update: number[]) {
    return update.reduce((agg, page, idx) => {
      if (agg.isLegal) {
        if (agg.illegalFollowers.includes(page)) {
          agg.illegalPosition = idx;
          agg.isLegal = false;
        } else if (precedenceRules[page]) {
          agg.illegalFollowers.push(...precedenceRules[page]);
        }
      }
      return agg;
    }, {
      illegalPosition: -Infinity,
      isLegal: true,
      illegalFollowers: [] as number[],
    });
  }

  return updates.reduce((agg, update) => {
    let isDefaultLegal = true;
    let result = testUpdate(update);
    while (!result.isLegal) {
      isDefaultLegal = false;

      // move illegal item one position forward
      update.splice(
        result.illegalPosition - 1,
        2,
        update[result.illegalPosition],
        update[result.illegalPosition - 1],
      );

      result = testUpdate(update);
    }

    agg[
      isDefaultLegal ? "legalUpdateMiddlePageSum" : "fixedUpdateMiddlePageSum"
    ] += update[Math.floor(update.length / 2)];

    return agg;
  }, { legalUpdateMiddlePageSum: 0, fixedUpdateMiddlePageSum: 0 });
}

if (import.meta.main) {
  console.log(await main());
}
