import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct possible pairs for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.possiblePairs, 3);
});

// Deno.test(`correct placeholder2 for ${target}`, async () => {
//   const result = await main(target);
//   assertEquals(result.text, "");
// });
