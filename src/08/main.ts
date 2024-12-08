// { antinodeCount: 413, resonantAntinodeCount: 1417 }
// Elapsed: 2ms

type Position = [x: number, y: number];

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { antennaGroups, map } = text.split("\n").reduce((agg, line, y) => {
    if (line) {
      const row = line.split("");
      row.forEach((char, x) => {
        if (char !== ".") {
          agg.antennaGroups[char] ??= [];
          agg.antennaGroups[char].push([x, y]);
        }
      });
      agg.map.push(row);
    }
    return agg;
  }, {
    antennaGroups: {} as Record<string, Position[]>,
    map: [] as string[][],
  });

  const { antinodes, resonantAntinodes } = Object.values(antennaGroups).reduce(
    (agg, antennas) => {
      if (antennas.length <= 1) {
        return agg;
      }

      while (antennas.length > 1) {
        const baseAntenna = antennas.shift()!;
        agg.resonantAntinodes[baseAntenna[1]].add(baseAntenna[0]);

        antennas.forEach((antenna) => {
          const dX = antenna[0] - baseAntenna[0];
          const dY = antenna[1] - baseAntenna[1];
          let ascendingMultiple = 1;
          while (
            antenna[1] + dY * ascendingMultiple >= 0 &&
            antenna[1] + dY * ascendingMultiple < map.length &&
            antenna[0] + dX * ascendingMultiple >= 0 &&
            antenna[0] + dX * ascendingMultiple < map[0].length
          ) {
            agg.resonantAntinodes[antenna[1] + dY * ascendingMultiple].add(
              antenna[0] + dX * ascendingMultiple,
            );
            if (ascendingMultiple === 1) {
              agg.antinodes[antenna[1] + dY * ascendingMultiple].add(
                antenna[0] + dX * ascendingMultiple,
              );
            }
            ascendingMultiple++;
          }

          let descendingMultiple = 1;
          while (
            baseAntenna[1] - dY * descendingMultiple >= 0 &&
            baseAntenna[1] - dY * descendingMultiple < map.length &&
            baseAntenna[0] - dX * descendingMultiple >= 0 &&
            baseAntenna[0] - dX * descendingMultiple < map[0].length
          ) {
            agg.resonantAntinodes[baseAntenna[1] - dY * descendingMultiple].add(
              baseAntenna[0] - dX * descendingMultiple,
            );
            if (descendingMultiple === 1) {
              agg.antinodes[baseAntenna[1] - dY * descendingMultiple].add(
                baseAntenna[0] - dX * descendingMultiple,
              );
            }
            descendingMultiple++;
          }
        });
      }
      agg.resonantAntinodes[antennas[0][1]].add(antennas[0][0]);

      return agg;
    },
    {
      antinodes: Array.from(map, () => new Set<number>()),
      resonantAntinodes: Array.from(map, () => new Set<number>()),
    },
  );

  return {
    antinodeCount: antinodes.reduce((agg, st) => agg + st.size, 0),
    resonantAntinodeCount: resonantAntinodes.reduce(
      (agg, st) => agg + st.size,
      0,
    ),
  };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
