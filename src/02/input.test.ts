import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct safe count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.safeLines, 660);
});

Deno.test(`correct dampended safe count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.dampenedSafeLines, 689);
});
