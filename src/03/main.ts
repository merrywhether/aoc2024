// { mulQuo: 163931492, doQuo: 76911921 }

// fun with eval()!
function mul(a: number, b: number) {
  return a * b;
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const mulMatches = text.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);

  const mulQuo = mulMatches.reduce((agg, match) => {
    return agg + eval(match[0]);
  }, 0);

  const doMatches = text.matchAll(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g);
  const { doQuo } = doMatches.reduce((agg, match) => {
    if (match[0] === "do()") {
      agg.do = true;
    } else if (match[0] === `don't()`) {
      agg.do = false;
    } else if (agg.do) {
      agg.doQuo += eval(match[0]);
    }
    return agg;
  }, { doQuo: 0, do: true });

  return { mulQuo, doQuo };
}

if (import.meta.main) {
  console.log(await main());
}
