import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct possible design count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.possibleDesigns, 353);
});

Deno.test(`correct possible design combos for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.possibleDesignCombos, 880877787214477);
});
