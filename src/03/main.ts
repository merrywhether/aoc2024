// { doQuotientSum: 76911921, quotientSum: 163931492 }
// Elapsed: 4ms

// fun with eval()! (this signature is found in the input so we use it directly instead of parsing and reconstructing)
// deno-lint-ignore no-unused-vars
function mul(a: number, b: number) {
  return a * b;
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { doQuotientSum, otherQuotientSum } = text.matchAll(
    /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g,
  ).reduce(
    (agg, match) => {
      if (match[0] === "do()") {
        agg.do = true;
      } else if (match[0] === `don't()`) {
        agg.do = false;
      } else if (agg.do) {
        agg.doQuotientSum += eval(match[0]);
      } else {
        agg.otherQuotientSum += eval(match[0]);
      }
      return agg;
    },
    { doQuotientSum: 0, do: true, otherQuotientSum: 0 },
  );

  return {
    doQuotientSum,
    quotientSum: doQuotientSum + otherQuotientSum,
  };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
