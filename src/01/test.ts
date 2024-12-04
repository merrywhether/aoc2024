import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test("correct distance for sample", async () => {
  const result = await main("sample");
  assertEquals(result.distance, 11);
});

Deno.test("correct similarity for sample", async () => {
  const result = await main("sample");
  assertEquals(result.similiarity, 31);
});
