import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct minimum tokens for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.minimumTokens, 36838);
});

Deno.test(`correct minimum big tokens for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.minimumBigTokens, 83029436920891);
});
