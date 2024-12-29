import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct decimal output for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.decimalOutput, 4);
});

Deno.test(`correct decimal output for sample2`, async () => {
  const result = await main("sample2");
  assertEquals(result.decimalOutput, 2024);
});

// Deno.test(`correct placeholder2 for ${target}`, async () => {
//   const result = await main(target);
//   assertEquals(result.text, "");
// });
