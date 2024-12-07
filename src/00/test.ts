import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct placeholder1 for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.text, "");
});

Deno.test(`correct placeholder2 for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.text, "");
});
