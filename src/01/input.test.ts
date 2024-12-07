import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct distance for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.distance, 3246517);
});

Deno.test(`correct similarity for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.similiarity, 29379307);
});
