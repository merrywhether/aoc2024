import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test("correct quotient for sample", async () => {
  const result = await main("sample");
  assertEquals(result.mulQuo, 161);
});

Deno.test("correct quotient for sample2", async () => {
  const result = await main("sample2");
  assertEquals(result.doQuo, 48);
});
