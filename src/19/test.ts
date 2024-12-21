import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct possible design count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.possibleDesigns, 6);
});

Deno.test(`correct possible design combos for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.possibleDesignCombos, 16);
});
