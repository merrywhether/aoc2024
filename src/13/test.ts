import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct minimum tokens for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.minimumTokens, 480);
});

Deno.test(`correct minimum big tokens for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.minimumBigTokens, 875318608908);
});
