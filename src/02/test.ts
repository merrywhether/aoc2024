import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct safe count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.safeLines, 2);
});

Deno.test(`correct dampended safe count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.dampenedSafeLines, 4);
});
