// { distance: 3246517, similiarity: 29379307 }

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

  const frequencies = data.right.sort().reduce((agg, val) => {
    agg[val] ??= 0;
    agg[val] += 1;
    return agg;
  }, [] as number[]);

  return data.left.sort().reduce(
    (agg, val, idx) => {
      agg.distance += Math.abs(data.right[idx] - val);
      agg.similiarity += val * (frequencies[val] ?? 0);
      return agg;
    },
    { distance: 0, similiarity: 0 },
  );
}

if (import.meta.main) {
  console.log(await main("input"));
}
