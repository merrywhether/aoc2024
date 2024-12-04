import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test("correct quotient sum for sample", async () => {
  const result = await main("sample");
  assertEquals(result.quotientSum, 161);
});

Deno.test("correct quotient sum for sample with do", async () => {
  const result = await main("sample-do");
  assertEquals(result.doQuotientSum, 48);
});
