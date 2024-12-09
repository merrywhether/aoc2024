import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct slot checksum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.slotChecksum, 1928);
});

Deno.test(`correct chunk checksum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.chunkChecksum, 2858);
});
