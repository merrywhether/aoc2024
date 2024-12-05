import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test("correct legal update middle page sum for sample", async () => {
  const result = await main("sample");
  assertEquals(result.legalUpdateMiddlePageSum, 143);
});

Deno.test("correct fixed update middle page sum for sample", async () => {
  const result = await main("sample");
  assertEquals(result.fixedUpdateMiddlePageSum, 123);
});
