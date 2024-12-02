// { dist: 3246517, sim: 29379307 }

export async function main(target: string) {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}/${target}.txt`);

  const data = text.split("\n").reduce((agg, line) => {
    const match = line.match(/^(\d+)\s+(\d+)$/);
    if (match) {
      agg.left.push(Number(match[1]));
      agg.right.push(Number(match[2]));
    }
    return agg;
  }, { left: [] as number[], right: [] as number[] });

  data.left.sort();
  data.right.sort();

  const stats = data.right.reduce((agg, val) => {
    agg[val] ??= 0;
    agg[val] += 1;
    return agg;
  }, [] as number[]);

  return data.left.reduce(
    (agg, val, idx) => {
      agg.dist = agg.dist + Math.abs(data.right[idx] - val);
      agg.sim = agg.sim + val * (stats[val] ?? 0);
      return agg;
    },
    { dist: 0, sim: 0 },
  );
}

if (import.meta.main) {
  console.log(await main("input"));
}
