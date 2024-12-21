// { possibleDesigns: 353, possibleDesignCombos: 880877787214477 }
// Elapsed: 133ms

function testDesign(towels: string[], design: string): number {
  const designCounter = new Array(design.length + 1).fill(0);
  designCounter[0] = 1;
  for (let i = 0; i <= design.length; i++) {
    if (designCounter[i]) {
      for (const towel of towels) {
        if (
          i + towel.length <= design.length &&
          towel === design.slice(i, i + towel.length)
        ) {
          designCounter[i + towel.length] += designCounter[i];
        }
      }
    }
  }

  return designCounter[design.length];
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { patterns, designs } = text.split("\n").reduce((agg, line) => {
    if (line.match(/^[wubrg]+$/)) {
      agg.designs.push(line);
      return agg;
    }

    const towelsMatch = line.match(/^[wubrg, ]+$/);
    if (towelsMatch) {
      agg.patterns = towelsMatch[0].split(", ");
    }

    return agg;
  }, { patterns: [] as string[], designs: [] as string[] });

  return designs.reduce((agg, design) => {
    const combos = testDesign(patterns, design);
    agg.possibleDesigns += combos > 0 ? 1 : 0;
    agg.possibleDesignCombos += combos;
    return agg;
  }, { possibleDesigns: 0, possibleDesignCombos: 0 });
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
