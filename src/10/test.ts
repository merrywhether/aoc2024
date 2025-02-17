import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct trailhead score sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.trailheadScores, 36);
});

Deno.test(`correct trailhead rating sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.trailheadRatings, 81);
});
