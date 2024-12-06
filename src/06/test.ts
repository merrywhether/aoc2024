import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test("correct position count for sample", async () => {
  const result = await main("sample");
  assertEquals(result.positionCount, 41);
});

Deno.test("correct loop count for sample", async () => {
  const result = await main("sample");
  assertEquals(result.loopCount, 6);
});
