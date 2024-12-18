import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct xmas count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.wordCount, 18);
});

Deno.test(`correct x-mas count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.xCount, 9);
});
