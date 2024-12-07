import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct quotient sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.quotientSum, 163931492);
});

Deno.test(`correct do quotient sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.doQuotientSum, 76911921);
});
