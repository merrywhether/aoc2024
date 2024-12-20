import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct distance for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.distance, 11);
});

Deno.test(`correct similarity for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.similiarity, 31);
});
