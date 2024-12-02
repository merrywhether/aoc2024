import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test("correct strict safe count for sample", async () => {
  const result = await main("sample");
  assertEquals(result.safe, 2);
});

Deno.test("correct dampended safe count for sample", async () => {
  const result = await main("sample");
  assertEquals(result.dampSafe, 4);
});
