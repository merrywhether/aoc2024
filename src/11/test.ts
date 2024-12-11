import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct stone count after 6 blinks for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.stoneCount6, 22);
});

Deno.test(`correct stone count after 25 blinks for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.stoneCount25, 55312);
});
