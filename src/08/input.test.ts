import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct antinode count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.antinodeCount, 413);
});

Deno.test(`correct resonant antinode count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.resonantAntinodeCount, 1417);
});
