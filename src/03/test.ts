import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct quotient sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.quotientSum, 161);
});

Deno.test(`correct do quotient sum for sample with do`, async () => {
  const result = await main("sample-do");
  assertEquals(result.doQuotientSum, 48);
});
