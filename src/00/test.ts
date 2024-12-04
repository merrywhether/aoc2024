import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

Deno.test("correct placeholder for sample", async () => {
  const result = await main("sample");
  assertEquals(result.text, "");
});
