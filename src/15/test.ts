import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct GPS sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.gpsSum, 2028);
});

Deno.test(`correct GPS sum for sample2`, async () => {
  const result = await main("sample2");
  assertEquals(result.gpsSum, 10092);
});

// Deno.test(`correct placeholder2 for ${target}`, async () => {
//   const result = await main(target);
//   assertEquals(result.gpsSum, 0);
// });
