import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct stone count after 25 blinks for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.stoneCount25, 183435);
});

Deno.test(`correct stone count after 75 blinks ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.stoneCount75, 218279375708592);
});
