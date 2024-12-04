import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test("correct safe count for sample", async () => {
  const result = await main("sample");
  assertEquals(result.safeLines, 2);
});

Deno.test("correct dampended safe count for sample", async () => {
  const result = await main("sample");
  assertEquals(result.dampenedSafeLines, 4);
});
