// { slotChecksum: 6340197768906, chunkChecksum: 6363913128533 }
// Elapsed: 83ms

type Id = number | ".";
type Range = { pos: number; range: number; id: Id };
type DiskStats = {
  disk: Id[];
  used: Range[];
  free: Range[];
};

function addIdToChecksum(checksum: number, val: Id, idx: number): number {
  return val !== "." ? checksum + val * idx : checksum;
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { slots, chunks } = text.split("")
    .reduce((agg, val, idx) => {
      const num = Number(val);

      const [slots, chunks, id] = idx % 2 === 0
        ? [agg.slots.used, agg.chunks.used, idx / 2]
        : [agg.slots.free, agg.chunks.free, "." as const];

      chunks.push({ pos: agg.chunks.disk.length, range: num, id });

      for (let _ = 0; _ < num; _++) {
        slots.push({ pos: agg.slots.disk.length, range: 1, id });
        agg.slots.disk.push(id);
        agg.chunks.disk.push(id);
      }

      return agg;
    }, {
      slots: {
        disk: [],
        used: [],
        free: [],
      } as DiskStats,
      chunks: {
        disk: [],
        used: [],
        free: [],
      } as DiskStats,
    });

  const { disk: slotDefrag } = slots.used.reverse()
    .reduce((agg, used) => {
      const free = agg.free[agg.freeIdx];
      if (free && free.pos < used.pos) {
        agg.disk[free.pos] = used.id;
        agg.disk[used.pos] = ".";
      }
      agg.freeIdx += 1;

      return agg;
    }, { ...slots, freeIdx: 0 });

  const { disk: chunkDefrag } = chunks.used.reverse()
    .reduce((stats, used) => {
      const targetFreeRangeIdx = stats.free.findIndex((free) =>
        free.pos < used.pos && free.range >= used.range
      );
      if (targetFreeRangeIdx !== -1) {
        const free = stats.free[targetFreeRangeIdx];
        for (let i = 0; i < used.range; i++) {
          stats.disk[free.pos + i] = used.id;
          stats.disk[used.pos + i] = ".";
        }
        // allow irrelevant desync for convenience
        // looping over empty is faster than updating array
        free.pos += used.range;
        free.range -= used.range;
      }

      return stats;
    }, chunks);

  return {
    slotChecksum: slotDefrag.reduce(addIdToChecksum, 0),
    chunkChecksum: chunkDefrag.reduce(addIdToChecksum, 0),
  };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
