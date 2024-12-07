import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct xmas count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.wordCount, 2718);
});

Deno.test(`correct x-mas count for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.xCount, 2046);
});
