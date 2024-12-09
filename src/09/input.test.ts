import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct slot checksum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.slotChecksum, 6340197768906);
});

Deno.test(`correct chunk checksum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.chunkChecksum, 6363913128533);
});
