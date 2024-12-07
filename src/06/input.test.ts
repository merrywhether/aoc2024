import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct position count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.positionCount, 5312);
});

Deno.test(`correct loop count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.loopCount, 1748);
});
