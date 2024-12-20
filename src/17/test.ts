import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct output for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.output, "4,6,3,5,6,3,5,2,1,0");
});

Deno.test(`correct starting A for sample2`, async () => {
  const result = await main("sample2");
  assertEquals(result.startingA, 117440);
});

// Deno.test(`correct placeholder2 for ${target}`, async () => {
//   const result = await main(target);
//   assertEquals(result.text, "");
// });
