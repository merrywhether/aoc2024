import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test("correct xmas count for sample", async () => {
  const result = await main("sample");
  assertEquals(result.wordCount, 18);
});

Deno.test("correct x-mas count for sample", async () => {
  const result = await main("sample");
  assertEquals(result.xCount, 9);
});
